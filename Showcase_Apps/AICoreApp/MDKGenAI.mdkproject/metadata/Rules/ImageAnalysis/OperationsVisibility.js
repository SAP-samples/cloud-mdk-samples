export default function OperationsVisibiity(context) {
  const pageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
  const cd = pageProxy.getClientData();
  return !!(cd && cd.OperationsData);
}