export default function FormCellExtensionOnValueChange(context) {
  var value = context.getValue();
  var currentValue = context.evaluateTargetPath('#Page:Main/#Control:FCCurrentValue');
  currentValue.setValue(Math.round(value));
}
