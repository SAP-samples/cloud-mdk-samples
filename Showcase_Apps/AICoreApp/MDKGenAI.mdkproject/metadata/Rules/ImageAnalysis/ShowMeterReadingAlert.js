export default function ShowMeterReadingAlert(context) {
  const value = context.evaluateTargetPath("#Property:value");
  const unit = context.evaluateTargetPath("#Property:unit");

  console.log("Meter reading value: ", value);
  console.log("Meter reading unit: ", unit);

  return context.executeAction({
    Name: "/MDKDevApp/Actions/Message.action",
    Properties: {
      Message: msg,
      Title: /*"Meter Reading Details"*/title,
    }
  });
}