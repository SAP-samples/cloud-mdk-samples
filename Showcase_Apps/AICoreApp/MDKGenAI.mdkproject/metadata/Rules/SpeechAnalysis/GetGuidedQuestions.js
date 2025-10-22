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
  const messages = [{
    role: "system",
    content: `You are an assistant and the user is using their voice to fill up forms. Generate a guided question list to assist the user to fill the fields described in the schema.`
  }, {
    role: "user",
    content: `${schema}`
  }];

  const tools = [{
    type: "function",
    function: { name: "format_response", parameters: guidedQuestionsResponseSchema }
  }];

  const toolChoice = {
    type: "function",
    function: { name: "format_response" }
  };

  return context.executeAction({
    Name: "/MDKDevApp/Actions/ChatCompletions.action",
    Properties: {
      Properties: {
        Messages: messages,
        Tools: tools,
        ToolChoice: toolChoice,
        MaxTokens: 256
      }
    }
  }).then(response => {
    const resultsObj = JSON.parse(response.data.choices[0].message.tool_calls[0].function.arguments);
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
