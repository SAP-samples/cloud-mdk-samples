import SendMeterReadingRequest from './SendMeterReadingRequest';
import SendAnomalyDetectionRequest from './SendAnomalyDetectionRequest';

export default async function SaveResults(context) {
  // close page first
  context.executeAction({
    "Name": "/MDKDevApp/Actions/ClosePage.action",
  });

  try {
    await SendMeterReadingRequest(context);
  } catch (err) {
    console.log(err);
  }

  try {
    await SendAnomalyDetectionRequest(context);
  } catch (err) {
    console.log(err);
  }

  try {
    //sanity check
    context.dismissActivityIndicator();
    const pageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
    const cd = pageProxy.getClientData();
    if (!cd) { console.log("Empty"); return; }
    if (!cd.AnomalyData) {
      cd.AnomalyData = [];
    }
    if (!cd.OperationsData) {
      cd.OperationsData = [];
    }
    const anomalyResults = cd.AnomalyResults;
    let tasks = [];
    let anomalies = [];
    let spinnerID;

    // identify the additional parameters (use RAG)
    // Get the previously fetched equipment name
    const equipmentName = cd.EquipmentNameResults

    // Get the equipment schema
    console.log("Fetching equipment schema...")
    spinnerID = context.showActivityIndicator('Fetching equipment details...');
    const equipmentSchema = await getEquipmentSchema(context, equipmentName);
    console.log("Equipment schema:", equipmentSchema);
    console.log("");
    context.dismissActivityIndicator();

    // Generate form cells
    console.log("Preparing form cells...")
    spinnerID = context.showActivityIndicator('Preparing forms...');
    const formCellSchema = await generateFormCells(context, equipmentSchema);
    console.log("Form cells schema:", formCellSchema);
    console.log(`Form cells prepared!`);
    context.dismissActivityIndicator();

    spinnerID = context.showActivityIndicator('Finalising...');
    anomalyResults?.forEach(result => {
      if (Array.isArray(result.tasks)) {
        // Add form cell schema to results
        const schema = [...formCellSchema.commonSchema, ...formCellSchema.specificSchema]
        // result.tasks[0].schema = 
        result.tasks.forEach(task => {
          task.schema = JSON.stringify(schema);
        })
        tasks = [...tasks, ...result.tasks];
      }
      anomalies = [...anomalies, { title: result.title, description: result.anomalyDescription }];
    })
    cd.AnomalyData = [...cd.AnomalyData, ...anomalies];
    cd.OperationsData = [...cd.OperationsData, ...tasks];

    // Clear anomaly results
    cd.AnomalyResults = [];

    await pageProxy.redraw();
    console.log("Redrawed");
    console.log("");
    context.dismissActivityIndicator();
  } catch (err) {
    console.log(err)
  }
}

const formCellSchema = {
  "type": "object",
  "properties": {
    "commonSchema": {
      "type": "array",
      "description": "Refers to each item in the common schema array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the property. Must be in camel case and match exactly as defined in schema"
          },
          "value": {
            "type": "string",
            "description": "Value of the property. Must be an empty string if it takes in a string/number. Must be false if it takes in a boolean. Otherwise, it must be an empty string"
          },
          "type": {
            "type": "string",
            "description": "If the schema object is a value of string or number, it will be 'Control.Type.FormCell.SimpleProperty'. If it is a boolean it will be 'Control.Type.FormCell.Switch'. Otherwise, it is a 'Control.Type.FormCell.SegmentedControl'"
          }
        },
        "required": ["title", "value", "type"]
      }
    },
    "specificSchema": {
      "type": "array",
      "description": "Refers to each item in the specific schema array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the property. Must be in camel case and match exactly as defined in schema"
          },
          "value": {
            "type": "string",
            "description": "Value of the property. Must be an empty string if it takes in a string/number. Must be false if it takes in a boolean. Otherwise, it must be an empty string"
          },
          "type": {
            "type": "string",
            "description": "If the schema object is a value of string or number, it will be 'Control.Type.FormCell.SimpleProperty'. If it is a boolean it will be 'Control.Type.FormCell.Switch'. Otherwise, it is a 'Control.Type.FormCell.SegmentedControl'"
          }
        },
        "required": ["title", "value", "type"]
      }
    }
  },
  "required": ["commonSchema", "specificSchema"]
};

async function generateFormCells(context, schema) {

  const messages = [{
    role: "user",
    content: `Generate form filling cells based on the schema provided as mentioned. ${schema}`
  }];

  const tools = [{
    type: "function",
    function: { name: "format_response", parameters: formCellSchema }
  }];

  const toolChoice = {
    type: "function",
    function: { name: "format_response" }
  }

  return context.executeAction({
    "Name": "/MDKDevApp/Actions/ChatCompletions.action",
    "Properties": {
      "Properties": {
        "Messages": messages,
        "Tools": tools,
        "ToolChoice": toolChoice,
        "MaxTokens": 256
      },
      "ActivityIndicatorText": "Sending anomaly detection request..."
    }
  }).then(response => {
    const resultsObj = JSON.parse(response.data.choices[0].message.tool_calls[0].function.arguments);
    return resultsObj;
  });
}


async function getEquipmentSchema(context, equipmentName) {
  const functionName = 'getRagResponse';
  const serviceName = '/MDKDevApp/Services/CAPVectorEngine.service';
  const parameters = {
    "value": `In JSON, Get the Common schema and the specific schema of the equipment ${equipmentName}. The common schema cannot be empty. The title of each property must be in camel cases. In camel case, you start a name with a small letter. If the name has multiple words, the later words will start with a capital letter`
  };
  let oFunction = { Name: functionName, Parameters: parameters };
  try {
    const response = await context.callFunction(serviceName, oFunction);
    const responseObj = JSON.parse(response);
    return responseObj.completion.content;
  } catch (error) {
    console.log("Error:", error.message);
  }
  return Promise.resolve("");
}