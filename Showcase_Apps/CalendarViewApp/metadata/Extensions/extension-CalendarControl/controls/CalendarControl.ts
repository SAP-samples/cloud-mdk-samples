import * as app from 'tns-core-modules/application';
import { IControl } from 'mdk-core/controls/IControl';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';

export class CalendarControl extends IControl {

  protected _calendarView: android.widget.CalendarView;
  private _observable: BaseObservable;

  public initialize(props) {
    super.initialize(props);
    if (app.android) {
      var that = this;
      this._calendarView = new android.widget.CalendarView(this.androidContext());
      this._calendarView.setOnDateChangeListener(new android.widget.CalendarView.OnDateChangeListener({
        onSelectedDayChange: function (view: android.widget.CalendarView, year: number, month: number, dayOfMonth: number) {
          let oDate = new Date(year + "-" + (month + 1) + "-" + dayOfMonth);
          that.setValue(oDate, true, true);
        }
      }));
    }
  }

  public view(): any {
    if (app.android) {
      return this._calendarView;
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