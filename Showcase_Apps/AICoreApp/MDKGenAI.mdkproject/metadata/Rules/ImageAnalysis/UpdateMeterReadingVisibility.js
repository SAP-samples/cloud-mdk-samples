export default function UpdateMeterReadingVisibility(context) {
  const newValue = context.getValue();
  const sectionedTableProxy = context.getParent().getParent();
  sectionedTableProxy.getSection('MeterReadingSection').setVisible(newValue && newValue.length !== 0);
}