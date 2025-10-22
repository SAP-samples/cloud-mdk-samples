export default async function StopRecording(context) {
  let pageProxy;
  try {
    pageProxy = context.evaluateTargetPathForAPI("#Page:SpeechAnalysisUseCasePage");
  } catch (err) {
    pageProxy = context.evaluateTargetPathForAPI("#Page:OperationDetail");
  }

  // save speech recognition object to stop listening 
  const cd = pageProxy.getClientData();
  if (!cd.SpeechRecognitionObj) {
    console.log("Speech recognition object not found!");
    return;
  }
  try {
    const stopping = await cd.SpeechRecognitionObj.stopListening();
    delete cd.isListening;
    console.log("Stopped listening.");
    return;
  } catch (error) {
    console.log("Something went wrong:", error)
  }
}