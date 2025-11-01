import ScannerInitialize from "../ScannerManager/ScannerInitialize";

export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _SampleServiceV4 = context.executeAction('/Devtoberfest/Actions/SampleServiceV4/Service/InitializeOffline.action');

    //You can add more service initialize actions here
    ScannerInitialize(context);
    
    return Promise.all([_SampleServiceV4]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/Devtoberfest/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}