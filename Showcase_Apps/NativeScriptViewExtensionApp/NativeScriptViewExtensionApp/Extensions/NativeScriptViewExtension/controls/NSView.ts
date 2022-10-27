import { GridLayout, Label, PropertyChangeData, Slider } from '@nativescript/core';
import { IControl } from 'mdk-core/controls/IControl';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';

function toNumber(value: any, defaultIfNaN = 0): number {
  if ((typeof value !== 'number' && typeof value !== 'string') || (typeof value === 'string' && value.trim().length === 0)) {
    return defaultIfNaN;
  }
  const n = +value;
  return isNaN(n) ? defaultIfNaN : n;
}

function toNumberGenerator(defaultIfNaN = 0): (value: any) => number {
  return (value: any) => toNumber(value, defaultIfNaN);
}

export class NSViewClass extends IControl {
  private _nsView: GridLayout;
  private _slider: Slider;
  private _sliderValueText: Label;

  private _observable: BaseObservable;

  public view(): any {
    const defaultMinValue = 0;
    const defaultMaxValue = 10000;

    if (!this._nsView) {
      this._nsView = new GridLayout();
      (this._nsView as any).rows = 'auto,auto';
      (this._nsView as any).columns = 'auto,*,auto';
      const headerGrid = new GridLayout();
      const sliderLabel = new Label();
      sliderLabel.className = 'slider-label';
      const sliderValue = new Label();
      this._sliderValueText = sliderValue;
      sliderValue.className = 'slider-value';
      headerGrid.colSpan = 3;
      headerGrid.addChild(sliderLabel);
      headerGrid.addChild(sliderValue);
      headerGrid.className = 'header-wrapper';

      const slider = new Slider();
      this._slider = slider;
      slider.row = 1;
      slider.col = 1;
      slider.className = 'slider';
      slider.on('valueChange', (evt: PropertyChangeData) => {
        this.setValue(evt.value, true, false);
      });
      const sliderMinValueLabel = new Label();
      sliderMinValueLabel.row = 1;
      sliderMinValueLabel.col = 0;
      sliderMinValueLabel.className = 'slider-min-value-label';
      const sliderMaxValueLabel = new Label();
      sliderMaxValueLabel.row = 1;
      sliderMaxValueLabel.col = 2;
      sliderMaxValueLabel.className = 'slider-max-value-label';

      this._nsView.className = 'wrapper';
      this._nsView.addChild(headerGrid);
      this._nsView.addChild(slider);
      this._nsView.addChild(sliderMinValueLabel);
      this._nsView.addChild(sliderMaxValueLabel);
      this._nsView.addCss(`
      .wrapper {
        padding: 20;
      }
      .slider-label {
        horizontal-align: left;
        font-weight: bold;
      }
      .slider-value {
     padding-left: 70;
     
      }
      
      .header-wrapper {
        margin-bottom: 10;
      }
      .slider {
        margin-left: 10;
        margin-right: 10;
        vertical-align: middle;
      }
      .slider-min-value-label, .slider-max-value-label {
        vertical-align: middle;
      }
      
      `);

  

      // set title
      this.resolve(this.definition().data.ExtensionProperties.Title).then((title) => {
        sliderLabel.text = `${title ?? ''}`;
      });

      // set min value
      this.resolve(this.definition().data.ExtensionProperties.MinValue)
        .then(toNumberGenerator(defaultMinValue))
        .then((minValue) => {
          slider.minValue = minValue;
          sliderMinValueLabel.text = `${minValue}`;
        });

      // set max value
      this.resolve(this.definition().data.ExtensionProperties.MaxValue)
        .then(toNumberGenerator(defaultMaxValue))
        .then((maxValue) => {
          slider.maxValue = maxValue;
          sliderMaxValueLabel.text = `${maxValue}`;
        });

      // set start value
      this.resolve(this.definition().data.Value).then((startValue) => {
        this.setValue(startValue, false, false);
      });
    }
    return this._nsView;
  }

  public viewIsNative() {
    return false;
  }

  public observable() {
    if (!this._observable) {
      const onValueChange = this.definition().data.ExtensionProperties?.OnValueChange;
      if (onValueChange) {
        this.definition().data.OnValueChange = onValueChange;
      }
      this._observable = new BaseObservable(this, this.definition(), this.page());
    }
    return this._observable;
  }

  public setContainer(container: IControl) {
    // do nothing
  }

  public async setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
    let finalNumber = toNumber(value, NaN);
    if (isNaN(finalNumber)) {
      throw new Error('Error: Value is not a number');
    }
    finalNumber = Math.max(this._slider.minValue, Math.min(this._slider.maxValue, finalNumber));
    this._setSliderValue(finalNumber);
    this._setSliderValueText(finalNumber);
    return this.observable().setValue(finalNumber, notify, isTextValue);
  }

  private resolve(v: any): Promise<any> {
    return this.valueResolver().resolveValue(v, this.context);
  }

  private _setSliderValue(value: number) {
    this._slider.value = value;
  }
  private _setSliderValueText(value: number) {
    const roundValue = Math.round(value);
    this._sliderValueText.text = `(${roundValue})`;
  }
}
