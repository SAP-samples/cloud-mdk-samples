export default async function AcceptOperation(context) {
  const operationData = context.evaluateTargetPath("#Property:OperationData");
  operationData.accepted = true;
  context.getPageProxy().redraw();
  const parentPageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
  parentPageProxy.redraw();
  return context.executeAction({
    Name: "/MDKDevApp/Actions/ToastMessage.action",
    Properties: {
      Message: "Operation Accepted",
      "Duration": 2
    }
  });
}