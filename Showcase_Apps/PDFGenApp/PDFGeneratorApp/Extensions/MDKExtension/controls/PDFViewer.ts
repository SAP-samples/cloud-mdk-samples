import { BaseControl } from 'mdk-core/controls/BaseControl';
import { FlexboxLayout } from '@nativescript/core'
import { PDFView } from "nativescript-pdf-view";

export class PDFViewerClass extends BaseControl {
  private _rootLayout: any;
  
  public initialize(props) {
    super.initialize(props);

    this.createView();
  }

  private createView() {
		if (!this._rootLayout) {
      let layout = new FlexboxLayout(); //
      layout.flexDirection = "column";
      // There might be a better way to force the layout to fill the screen but this works for now
      layout.width = 9999;
      layout.height = 9999;
      
      let pdfViewer = new PDFView();

      var extProps = this.definition().data.ExtensionProperties;
      if (extProps){
        // Get the ExtensionProperties.Source which should contain the base64 string of the PDF content
        // We'll need to resolve it first because it could be a binding syntax e.g. {#Page:xyz/#ClientData/Something}
        this.valueResolver().resolveValue(extProps.Source, this.context, true).then(function(resolvedSource){
          pdfViewer.src = "data:application/pdf;base64," + resolvedSource;
        }.bind(this));
      }
      pdfViewer.flexGrow = 1;
      layout.addChild(pdfViewer);
      this._rootLayout = layout;
		}
		return this._rootLayout;
  }

  public view() {
		return this._rootLayout;
	}

  // Override
  protected createObservable() {
    return super.createObservable();
  }

  public viewIsNative() {
    return false;
  }
}
