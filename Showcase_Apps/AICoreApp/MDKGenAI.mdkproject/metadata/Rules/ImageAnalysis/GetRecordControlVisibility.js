export default function GetRecordControlVisibility(context) {
  const pageProxy = context.evaluateTargetPathForAPI("#Page:OperationDetail");
  const cd = pageProxy.getClientData();
  if (context.getName() === 'Record') {
    return !cd.isListening;
  } else {
    return !!cd.isListening;
  }
}