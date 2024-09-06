import GetOperationsData from "./GetOperationsData";
import GetOperationDetailMetadata from "./GetOperationDetailMetadata";

export default function Test(context) {
  // add submitted / pending
  try {
    const operationData = GetOperationsData(context);
    const index = context.evaluateTargetPath("#Property:index");

    if (operationData && index < operationData.length && operationData[index]) {
      const pageProxy = context.getPageProxy();
      const pageMetadata = GetOperationDetailMetadata(context, operationData[index]);
      pageProxy.setActionBinding({
        'OperationData': operationData[index]
      });

      return pageProxy.executeAction({
        "Name": "/MDKDevApp/Actions/NavToPage.action",
        "Properties": {
          "PageToOpen": "/MDKDevApp/Pages/Empty.page",
          "PageMetadata": pageMetadata
        }
      });
    } else {
      console.log("index OOB")
    }
  } catch (e) {
    console.log(e)
  }
}