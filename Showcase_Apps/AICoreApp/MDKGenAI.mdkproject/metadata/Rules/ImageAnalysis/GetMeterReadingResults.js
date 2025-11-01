export default function GetMeterReadingResults(context) {
  const pageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
  const cd = pageProxy.getClientData();
  if (cd && cd.MeterReadingResults) {
    return cd.MeterReadingResults[0]; // demo purpose to only get first reading read
  } else {
    return [];
  }
}