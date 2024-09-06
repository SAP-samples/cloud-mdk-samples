function UpdateProgress(context, message, shouldUpdateNote, clientData) {
  if (shouldUpdateNote) {
    try {
      console.log("Updating note")
      const pageProxy = context.getPageProxy();
      const sectionProxy = pageProxy.evaluateTargetPathForAPI("#Section:FormCellSection");
      const controlProxy = sectionProxy.getControl('NoteFormCell');
      //clientData.existingMsg = '';
      if (clientData?.recordingRestarted) {
        let existingMsg = controlProxy.getValue();
        // if message is empty, means the user has start the recording over, need to keep the old msg
        if (existingMsg && existingMsg[existingMsg.length - 1] !== ' ') {
          existingMsg = existingMsg + ' ';
        } else {
          existingMsg = ''
        }
        clientData.recordingRestarted = false;
        // store the existing msg for re-use
        clientData.existingMsg = existingMsg;
      }
      controlProxy.setValue((clientData.existingMsg ?? '') + message);
      //controlProxy.setEditable(false);
    } catch (err) {
      console.log(err);
    }
  } else {
    return context.executeAction({
      Name: "/MDKDevApp/Actions/ToastMessage.action",
      Properties: {
        Message: message
      }
    });
  }
}

function DismissProgress(context, shouldUpdateNote) {
  if (shouldUpdateNote) {
    try {
      const pageProxy = context.getPageProxy();
      const sectionProxy = pageProxy.evaluateTargetPathForAPI("#Section:FormCellSection");
      const controlProxy = sectionProxy.getControl('NoteFormCell');
      controlProxy.setEditable(true);
    } catch (err) {
      console.log(err);
    }
  } else {
    return context.executeAction({
      Name: "/MDKDevApp/Actions/ToastMessage.action",
      Properties: {
        Duration: 1
      }
    });
  }
}

function sleep(ms) {
  return (new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, ms);
  }));
}

export default async function VoiceInput(context) {
  let userInput = "";

  if (context.nativescript.platformModule.isIOS || context.nativescript.platformModule.isAndroid) {
    // require the plugin
    let SpeechRecognition = require("nativescript-speech-recognition").SpeechRecognition;

    // instantiate the plugin
    let speechRecognition = new SpeechRecognition();
    let pageProxy;
    let shouldUpdateNote = false;
    try {
      pageProxy = context.evaluateTargetPathForAPI("#Page:SpeechAnalysisUseCasePage");
    } catch (err) {
      pageProxy = context.evaluateTargetPathForAPI("#Page:OperationDetail");
      shouldUpdateNote = true;
    }

    // save speech recognition object to stop listening 
    const cd = pageProxy.getClientData();
    cd.SpeechRecognitionObj = speechRecognition;

    try {
      const available = await speechRecognition.available();
      if (available) {
        cd.isListening = true;
        cd.recordingRestarted = true;
        context.getParent().redraw();
        const transcription = await speechRecognition.startListening(
          {
            // optional, uses the device locale by default
            // locale: "zh-CN",
            // set to true to get results back continuously
            returnPartialResults: true,
            // this callback will be invoked repeatedly during recognition
            onResult: (transcription) => {
              UpdateProgress(context, transcription.text, shouldUpdateNote, cd);
              userInput = transcription.text; // assign the result 
              // console.log(`User finished?: ${transcription.finished}`);
              if (transcription.finished) {
                DismissProgress(context, shouldUpdateNote);
                return userInput;
              }
            },
            onError: (error) => {
              // because of the way iOS and Android differ, this is either:
              // - iOS: A 'string', describing the issue. 
              // - Android: A 'number', referencing an 'ERROR_*' constant from https://developer.android.com/reference/android/speech/SpeechRecognizer.
              //            If that code is either 6 or 7 you may want to restart listening.
            }
          }
        );

        const pageProxy = context.getPageProxy();
        const sectionProxy = pageProxy.evaluateTargetPathForAPI("#Section:FormCellSection");
        const controlProxy = sectionProxy.getControl('NoteFormCell');
        controlProxy.setEditable(false);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    //for POC wait for 10 seconds to finish speech recognition
    await sleep(10000).then(() => {
      return Promise.resolve();
    });
    console.log('The voice input has finished!');
    // DismissProgress(clientAPI);
    return userInput;
  } else {
    // voice input not support on web, use default input for now
    return userInput;
  }
}