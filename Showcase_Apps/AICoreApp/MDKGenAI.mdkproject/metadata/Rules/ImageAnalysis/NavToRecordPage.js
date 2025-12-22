export default function NavToRecordPage(context) {
  try {
    const pageProxy = context.getPageProxy();
    return pageProxy.executeAction({
      "Name": "/MDKDevApp/Actions/NavToPage.action",
      "Properties": {
        "PageToOpen": "/MDKDevApp/Pages/OperationRecord.page",
        "ModalPage": true
      }
    });
  } catch (e) {
    console.log(e)
  }
}