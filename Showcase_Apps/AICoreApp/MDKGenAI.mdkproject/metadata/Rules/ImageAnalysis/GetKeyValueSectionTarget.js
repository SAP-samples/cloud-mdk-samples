export default function GetKeyValueSectionTarget(context) {
  const operationData = context.evaluateTargetPath("#Property:OperationData");
  if (operationData?.schema) {
    const schema = JSON.parse(operationData?.schema);
    const result = {}

    schema.forEach(cell => {
      let value = cell.value;
      result[cell.title] = value;
    })
    return result;
  }
}