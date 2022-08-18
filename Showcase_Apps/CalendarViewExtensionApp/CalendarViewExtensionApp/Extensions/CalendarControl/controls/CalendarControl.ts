import { Application as app } from '@nativescript/core';
import { IControl } from 'mdk-core/controls/IControl';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';

export class CalendarControl extends IControl {

  protected _calendarViewAndroid: android.widget.CalendarView;
  protected _calendarViewControlleriOS: FUICalendarViewControllerBridge;
  private _observable: BaseObservable;

  public initialize(props) {
    super.initialize(props);
    const that = this;
    if (app.android) {
      this._calendarViewAndroid = new android.widget.CalendarView(this.androidContext());
      this._calendarViewAndroid.setOnDateChangeListener(new android.widget.CalendarView.OnDateChangeListener({
        onSelectedDayChange: function (view: android.widget.CalendarView, year: number, month: number, dayOfMonth: number) {
          that.setValue(new Date(year + "-" + (month + 1) + "-" + dayOfMonth), true, true);
        }
      }));
    } else if (app.ios) {
      this._calendarViewControlleriOS = FUICalendarViewControllerBridge.new();
      this._calendarViewControlleriOS.onDateSelectCallback = (date: Date) => {
        that.setValue(date, true, true);
      }
    }
  }

  public view(): any {
    if (app.android) {
      return this._calendarViewAndroid;
    }
    if (app.ios) {
      return this._calendarViewControlleriOS.view;
    }
  }

  public viewIsNative() {
    return true;
  }

  public observable() {
    if (!this._observable) {
      this._observable = new BaseObservable(this, this.definition(), this.page());
    }
    return this._observable;
  }

  public setContainer(container: IControl) {
    // do nothing
  }

  public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
    if (value != null && value != undefined && value instanceof Date) {
      //Store the value. The observable will trigger "OnValueChange" to the MDK app
      return this.observable().setValue(value, notify, isTextValue);
    }
    return Promise.resolve();
  }

}