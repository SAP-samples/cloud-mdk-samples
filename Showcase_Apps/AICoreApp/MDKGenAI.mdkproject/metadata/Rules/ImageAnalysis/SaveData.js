export default async function SaveData(context) {
  try {
    const ancestorPageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
    const cd = ancestorPageProxy.getClientData();

    const pageProxy = context.getPageProxy();
    const controls = pageProxy.getControl('SectionedTable').getSection('FormCellSection').getControls();
    const schemaObjects = JSON.parse(context.binding.OperationData.schema);
    for (const control of controls) {
      for (const schemaObject of schemaObjects) {
        if (schemaObject.title === control.getName()) {
          schemaObject.value = control.getValue();
        }
      }
    }

    context.binding.OperationData.schema = JSON.stringify(schemaObjects);

    await pageProxy.executeAction({
      "Name": "/MDKDevApp/Actions/ClosePage.action"
    })

    const parentPageProxy = context.evaluateTargetPathForAPI("#Page:OperationDetail");
    await parentPageProxy.redraw();

    return context.executeAction({
      Name: "/MDKDevApp/Actions/ToastMessage.action",
      Properties: {
        Message: "Changes Saved",
        Duration: 2
      }
    });
  } catch (e) {
    console.log(e)
  }
}