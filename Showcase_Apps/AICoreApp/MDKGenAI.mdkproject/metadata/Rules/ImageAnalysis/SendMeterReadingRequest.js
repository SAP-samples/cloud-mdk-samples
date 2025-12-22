const IMAGE_URL_PREFIX = "data:image/jpeg;base64,";
const schema = {
  "type": "object",
  "properties": {
    "detectedReadings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "unit": {
            "type": "string",
            "description": "The unit of the value of meter in format 'FullName (Symbol)' . Eg: Killowatts per hour (KWH)",
          },
          "value": {
            "type": "string",
            "description": "The value of the meter. Remove leading zeros",
          }
        },
        "required": ["unit", "value"]
      }
    },

  },
  "required": ["detectedReadings"],
}

export default async function SendMeterReadingRequest(context) {
  const prompt = `Analyze the image(s) provided to determine the reading displayed on the meter. It can be anolog meter or a digital one. 
  Identify and extract the reading with its corresponding unit (e.g., kWh for kilowatt-hours, m^3 for cubic meters). The value could be zero. For example: 0 psi.
  Ensure the output clearly specifies both the numerical value and the unit of measurement for accurate automated meter reading.
  `;

  let messages = [{
    "role": "user",
    "content": [{
      "type": "text",
      "text": prompt
    }]
  }];

  const tools = [{
    type: "function",
    function: { name: "format_response", parameters: schema }
  }];

  const toolChoice = {
    type: "function",
    function: { name: "format_response" }
  }

  const pageProxy = context.getPageProxy();
  const attachments = pageProxy.evaluateTargetPath("#Control:AttachmentMeterReading/#Value");

  // Preprocess images
  for (const attachment of attachments) {
    let base64String = await context.binaryToBase64String(attachment.content);
    const imageData = {
      "type": "image_url",
      "image_url": {
        "url": `${IMAGE_URL_PREFIX}${base64String}`
      }
    }
    messages[0].content.push(imageData);
  };

  console.log("Sending meter reading request...");
  return context.executeAction({
    "Name": "/MDKDevApp/Actions/ChatCompletions.action",
    "Properties": {
      "Properties": {
        "Messages": messages,
        "Tools": tools,
        "ToolChoice": toolChoice,
        "Temperature": 0.1,
        "MaxTokens": 512
      },
      "ActivityIndicatorText": "Sending meter reading request..."
    }
  }).then(response => {
    const results = JSON.parse(response.data.choices[0].message.tool_calls[0].function.arguments)
    const mainPage = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
    const cd = mainPage.getClientData();
    cd.MeterReadingResults = results.detectedReadings;
    console.log("Meter reading results:", results.detectedReadings, "\n");
    console.log("");
    return true;
  });
}