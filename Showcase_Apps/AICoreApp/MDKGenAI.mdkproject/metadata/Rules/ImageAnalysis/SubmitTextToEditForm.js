export default async function SubmitTextToEditForm(context) {
  const pageProxy = context.getPageProxy();
  const sectionProxy = pageProxy.evaluateTargetPathForAPI("#Section:FormCellSection");
  const controlProxy = sectionProxy.getControl('NoteFormCell');
  const userInput = controlProxy.getValue()

  if (!userInput) {
    controlProxy.setValidationProperty('ValidationViewIsHidden', false)
  } else {
    // todo: submit req and return to prev page
    const binding = context.binding;
    const schema = binding.OperationData?.schema;
    const formCellResults = await sendFormFillRequest(context, userInput, schema);
    // Close the modal and edit the form cells with results
    // Only edit the form cells that has results, no value means no edit

    const previousPage = context.evaluateTargetPathForAPI("#Page:OperationEdit");
    const sectionedTableProxy = previousPage.evaluateTargetPathForAPI("#Control:SectionedTable");
    const formCellSection = sectionedTableProxy.getSection("FormCellSection")
    formCellResults.forEach(result => {
      const name = result.title;
      const controlProxy = formCellSection.getControl(name);
      if (controlProxy && result.value !== "") {
        controlProxy.setValue(result.value);
      }
    })

    context.executeAction({
      "Name": "/MDKDevApp/Actions/ClosePage.action",
    });
  }
}


async function sendFormFillRequest(context, userInput, schema) {
  // Convert userInput into structured data
  const structuredData = await convertSpeechIntoStucturedData(context, userInput, schema);
  return structuredData.formCell;
}

const structuredDataSchema = {
  "type": "object",
  "properties": {
    "formCell": {
      "type": "array",
      "description": "Refers to each item in the schema array. The title property must completely match the one defined in schema",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the property"
          },
          "value": {
            "type": "string",
            "description": "Value of the property"
          }
        },
        "required": ["title", "value"]
      }
    }
  },
  "required": ["formCell"]
};

async function convertSpeechIntoStucturedData(context, userInput, schema) {
  const messages = [{
    role: "system",
    content: `Convert the following speech to structure data as defined in ${schema}. The properties in the schema
        are optional so if the speech does not contain the information on some property, do not include it.`
  }, {
    role: "user",
    content: userInput
  }];

  const tools = [{
    type: "function",
    function: { name: "format_response", parameters: structuredDataSchema }
  }];

  const toolChoice = {
    type: "function",
    function: { name: "format_response" }
  };

  console.log("Converting natural language to structured data...")
  return context.executeAction({
    "Name": "/MDKDevApp/Actions/ChatCompletions.action",
    "Properties": {
      "Properties": {
        "Messages": messages,
        "Tools": tools,
        "ToolChoice": toolChoice,
        "MaxTokens": 512
      },
      "ActivityIndicatorText": "Converting natural language to structured data..."
    }
  }).then(response => {
    const resultsObj = JSON.parse(response.data.choices[0].message.tool_calls[0].function.arguments);
    console.log("Structured data results:", resultsObj);
    console.log("");
    return resultsObj;
  });
}