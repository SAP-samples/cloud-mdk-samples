// Define the knowledge base as a single string
const knowledgeBase = `
Unique Name: SAPElectricityMeter
Equipment Type: Electricity meter
Description:  A device used to measure the amount of electrical energy consumed by a residence, business, or electrically powered device. It records the amount of electricity used in kilowatt-hours (kWh) and is typically installed by utility companies to monitor and bill for electricity usage.

Unique Name: SAPPump
Equipment Type: Water pump
Description: A device used to move water from one place to another. It is commonly powered by electricity, manual operation, gasoline, or solar power. Water pumps are essential in various applications such as residential water supply, agricultural irrigation, industrial processes, and municipal water systems. Key components of a water pump typically include an inlet, outlet, impeller, motor or engine, and pump housing.

Common Schema
[
  {"Title": "taskTitle", "Description": "Operation Title", "Type": "Text"},
  {"Title": "shortDescription", "Description": "Operation short description", "Type": "Text"},
  {"Title": "description", "Description": "Detailed operation description", "Type": "Text"},
  {"Title": "priority", "Description": "priority (high, medium, low)", "Type": "Text"},
]

Specific Schema for SAPPump:
[
  {"Title": "yearOfInstallation", "Description": "Year of installation", "Type": "Text"},
  {"Title": "length", "Description": "Length of the water pump in meters", "Type": "Text"}
]
`;

// Function to split the knowledge base into chunks
function splitKnowledgeBase(knowledgeBase) {
  // Split the knowledge base into sections based on double newlines
  const chunks = knowledgeBase.trim().split(/\n\n/).map(chunk => {
    return { chunk: chunk.trim() };
  });
  return chunks;
}

export default async function PopulateEmbeddings(context) {
  // Populate RAG Data
  const functionName = 'storeEmbeddings';
  const serviceName = '/MDKDevApp/Services/CAPVectorEngine.service';

  const chunks = splitKnowledgeBase(knowledgeBase);
  context.showActivityIndicator("Populating embeddings...");
  for (const chunk of chunks) {
    const parameters = {
      "value": chunk.chunk,
      "chunkSize": "1000" // adjustable
    };
    let oFunction = { Name: functionName, Parameters: parameters };
    try {
      await context.callFunction(serviceName, oFunction);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
  context.dismissActivityIndicator();
  console.log("Embeddings populated!");
  const section = context.getPageProxy().getControl('SectionedTable').getSection('Section');
  section.redraw();
  return;
}