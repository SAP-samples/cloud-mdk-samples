import ParseKey from "./ParseKey";

export default function GetOperationDetailMetadata(context, operationData) {
  const page = context.getPageDefinition('/MDKDevApp/Pages/OperationDetail.page');
  const sections = page.Controls[0].Sections;
  const keyValueSection = sections.find(section => section._Name === "OperationDetail");
  const keyValues = keyValueSection.KeyAndValues;

  //const binding = context.binding;
  if (operationData?.schema) {
    const schema = JSON.parse(operationData?.schema);
    schema.forEach(cell => {
      let value = cell.value;
      for (const key in operationData) {
        if (operationData.hasOwnProperty(key) && cell.title === key) {
          value = operationData[key];
        }
      }
      if (cell.title === 'taskTitle' || cell.title === 'shortDescription' || cell.title === 'description' || cell.title === 'priority') {
        //continue;
      } else {
        //$(DV, <Target expression>, <Value for default>)
        keyValues.push({
          "KeyName": ParseKey(cell.title),
          "Value": "$(DV,{" + cell.title + "}, '-')",
        })
      }
    })

    keyValueSection.Target = "/MDKDevApp/Rules/ImageAnalysis/GetKeyValueSectionTarget.js"
  } else {
    console.log("empty Schema")
    console.log(operationData)
  }
  return page;
}