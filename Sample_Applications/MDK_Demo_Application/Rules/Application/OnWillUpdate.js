export default function OnWillUpdate(context) {   
    // return context.executeAction("/MDKDemoApp/Actions/Application/OnWillUpdate.action").then(
	// 	(success) => Promise.resolve(success),
	// 	(failure) => Promise.reject('User Deferred')
    // );

    return context.executeAction("/MDKDemoApp/Actions/Application/OnWillUpdate.action").then((result) => {
        if (result.data) {
            return Promise.resolve(result);
        } else {
            return Promise.reject('User Deferred');
        }
    });
}