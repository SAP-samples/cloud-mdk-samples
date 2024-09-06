export default function GetAcceptToolbarVisibility(context) {
  const operationData = context.evaluateTargetPath("#Property:OperationData");
  return !operationData.accepted;
}