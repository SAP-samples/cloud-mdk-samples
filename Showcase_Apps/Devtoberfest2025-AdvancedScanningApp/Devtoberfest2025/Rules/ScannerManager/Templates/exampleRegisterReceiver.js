/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function exampleRegisterReceiver(context) {
    let application = context.nativescript.applicationModule;
    let intentName = 'my.intent.name.to.receive';


    // Callback method that is invoked when an intent is received
    const intentCallback = (androidContext, intent) => {
        // Get an extra value from the intent
        let extraVal = intent.getStringExtra("my.extra.key.here");

        // Do something based on the intent received
        context.getLogger().log(`Intent Received with Extra Value ${extraVal}`);
    }

    // Register the intent receiver
    try {
        application.android.registerBroadcastReceiver(
            intentName,
            intentCallback
        );
    } catch (e) {
        // IllegalArgumentException
        context.getLogger().log(e.printStaceTrace, 'Error');
        e.printStackTrace();
    }
}