export default function GetOperationsData(context) {
  const pageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
  const cd = pageProxy.getClientData();
  if (cd && cd.OperationsData) {
    for (const [index, value] of cd.OperationsData.entries()) {
      value.index = index;

      let priority = value.priority;
      value.priority = priority && priority[0].toUpperCase() + priority.slice(1);
    }
    return cd.OperationsData;
  } else {
    return [];
  }
}