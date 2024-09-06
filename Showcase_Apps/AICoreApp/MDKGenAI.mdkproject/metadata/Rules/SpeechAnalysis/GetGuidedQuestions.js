export default async function GetGuidedQuestions(context) {
  const binding = context.binding;
  const schema = binding.OperationData?.schema;

  // Generate guided questions (GPT)

  console.log("Generating guided questions...");
  const spinnerID = context.showActivityIndicator('Generating guided questions...');
  const guidedQuestions = await generateGuidedQuestions(context, schema);
  context.dismissActivityIndicator(spinnerID);
  console.log("Guided questions:", guidedQuestions);
  console.log("");
  const guidedQuestionsString = formatQuestions(guidedQuestions.questions)
  return guidedQuestionsString;
}

const guidedQuestionsResponseSchema = {
  "type": "object",
  "properties": {
    "questions": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "The question to guide the user"
      }
    }
  },
  "required": ["questions"]
};

async function generateGuidedQuestions(context, schema) {
  const method = "POST";
  const path = "/chat/completions?api-version=2024-02-01";
  const body = {
    messages: [
      {
        role: "system",
        content: `You are an assistant and the user is using their voice to fill up forms. Generate a guided question list to assist the user to fill the fields described in the schema.`
      },
      {
        role: "user",
        content: `${schema}`
      }
    ],
    max_tokens: 256,
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    functions: [{ name: "format_response", parameters: guidedQuestionsResponseSchema }],
    function_call: { name: "format_response" },
  };
  const headers = {
    "content-type": "application/json",
    "AI-Resource-Group": "default"
  };
  const service = "/MDKDevApp/Services/AzureOpenAI.service";
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
      }
    }
  }).then(response => {
    const resultsObj = JSON.parse(response.data.choices[0].message.function_call.arguments);
    return resultsObj;
  });
}

function formatQuestions(questions) {
  let result = "1. **General Questions**\n";

  questions.forEach((question) => {
    result += `- ${question}\n`;
  });
  return result.trim();
}
