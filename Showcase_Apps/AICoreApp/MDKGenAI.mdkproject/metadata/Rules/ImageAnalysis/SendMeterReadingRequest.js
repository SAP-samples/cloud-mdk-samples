import BinaryToBase64 from '../Utils/BinaryToBase64';

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

export default function SendMeterReadingRequest(context) {
  const prompt = `Analyze the image(s) provided to determine the reading displayed on the meter. It can be anolog meter or a digital one. 
  Identify and extract the reading with its corresponding unit (e.g., kWh for kilowatt-hours, m^3 for cubic meters). The value could be zero. For example: 0 psi.
  Ensure the output clearly specifies both the numerical value and the unit of measurement for accurate automated meter reading.
  `;

  const method = "POST";
  const body = {
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": prompt
          }
        ]
      }
    ],
    temperature: 0.1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    functions: [{ name: "format_response", parameters: schema }],
    function_call: { name: "format_response" },
  };
  const headers = {
    "content-type": "application/json",
    "AI-Resource-Group": "default"
  }
  const service = "/MDKDevApp/Services/AzureOpenAI.service";
  const path = "/chat/completions?api-version=2024-02-01";
  const pageProxy = context.getPageProxy();
  const attachments = pageProxy.evaluateTargetPath("#Control:AttachmentMeterReading/#Value");

  // Preprocess images
  const platform = context.nativescript.platformModule;
  attachments.forEach((attachment) => {
    let base64String = BinaryToBase64(context, attachment.content);
    const imageData = {
      "type": "image_url",
      "image_url": {
        "url": `${IMAGE_URL_PREFIX}${base64String}`
      }
    }
    body.messages[0].content.push(imageData);
  });

  console.log("Sending meter reading request...");
  return context.executeAction({
    "Name": "/MDKDevApp/Actions/SendRequest.action",
    "Properties": {
      "Target": {
        "Path": path,
        "RequestProperties": {
          "Method": method,
          "Headers": headers,
          "Body": JSON.stringify(body)
        },
        "Service": service
      },
      "ActivityIndicatorText": "Sending meter reading request...",
    }
  }).then(response => {
    const results = JSON.parse(response.data.choices[0].message.function_call.arguments)
    const mainPage = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
    const cd = mainPage.getClientData();
    cd.MeterReadingResults = results.detectedReadings;
    console.log("Meter reading results:", results.detectedReadings, "\n");
    console.log("");
    return true;
  });
}