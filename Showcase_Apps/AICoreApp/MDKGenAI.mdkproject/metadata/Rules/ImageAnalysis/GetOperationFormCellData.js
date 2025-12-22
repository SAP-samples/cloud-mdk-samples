export default function GetOperationFormCellData(context) {
  try {
    const binding = context.binding;
    const schema = JSON.parse(binding.OperationData?.schema);
    console.log("schema", schema);
    return schema;
  } catch (e) {
    console.log(e)
  }
}