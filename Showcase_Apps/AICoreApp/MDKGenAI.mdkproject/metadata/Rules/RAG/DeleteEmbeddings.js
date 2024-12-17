export default function DeleteEmbeddings(context) {
  const functionName = 'deleteEmbeddings';
  const serviceName = '/MDKDevApp/Services/CAPVectorEngine.service';
  const parameters = {};
  let oFunction = { Name: functionName, Parameters: parameters };

  return context.callFunction(serviceName, oFunction).then(result => {
    alert(result);
    const section = context.getPageProxy().getControl('SectionedTable').getSection('Section');
    section.redraw();
  }).catch((error) => alert(error.message));
}
