export default function FormCellExtensionSetValue(pageProxy) {

  var control = pageProxy.evaluateTargetPathForAPI("#Control:ExtensionFormCell1");
  control.setValue(50, false);
}
