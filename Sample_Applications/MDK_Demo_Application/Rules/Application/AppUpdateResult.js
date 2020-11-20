function sleep(ms)
{
    return(new Promise(function(resolve, reject) {        
        setTimeout(function() { resolve(); }, ms);        
    }));    
}

export default function AppUpdateResult(context) {
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function () {
        let result = context.actionResults.AppUpdate.data;
        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return context.getPageProxy().executeAction({
                "Name": "/MDKDemoApp/Actions/GenericToastMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`
                }
            });
        }
    });
}