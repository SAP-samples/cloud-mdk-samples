export default function ShowAnomalyAlert(context) {
  const title = context.evaluateTargetPath("#Property:anomalyTitle");
  const msg = context.evaluateTargetPath("#Property:description");

  return context.executeAction({
    Name: "/MDKDevApp/Actions/Message.action",
    Properties: {
      Message: msg,
      Title: /*"Anomaly Details"*/title,
    }
  });
}