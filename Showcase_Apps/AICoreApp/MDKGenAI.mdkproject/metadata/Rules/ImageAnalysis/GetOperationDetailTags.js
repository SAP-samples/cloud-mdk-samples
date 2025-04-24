export default function GetOperationDetailTags(context) {
  const operationData = context.evaluateTargetPath("#Property:OperationData");
  if (operationData.accepted) {
    return [{ "Text": "Accepted", "Color": "Green" }];
  } else {
    return [{ "Text": "Pending" }];
  }
}