export default function OnWillUpdate(clientAPI) {
	let dialogs = clientAPI.nativescript.uiDialogsModule;
	return dialogs.confirm("Update now?").then((result) => {
		console.log("Update now? " + result);
		if (result === true) {
			return clientAPI.executeAction('/ProductListApp/Actions/Service/CloseOffline.action').then(
				(success) => Promise.resolve(success),
				(failure) => Promise.reject('Offline Odata Close Failed ' + failure));
		} else {
			return Promise.reject('User Deferred');
		}
	});
}