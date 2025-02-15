import VoiceInput from "./VoiceInput";

export default async function StartRecording(context) {
  // get user_input from MDK Client runtime, nativescript plug-in https://market.nativescript.org/plugins/nativescript-speech-recognition/
  let userInput;
  try {
    userInput = await VoiceInput(context);
  } catch (err) {
    console.log(err)
  }
  console.log("Success")
  return;
}