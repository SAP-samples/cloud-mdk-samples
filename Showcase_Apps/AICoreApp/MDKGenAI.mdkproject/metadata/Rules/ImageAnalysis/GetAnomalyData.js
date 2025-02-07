export default function GetAnomalyData(context) {
  const pageProxy = context.evaluateTargetPathForAPI("#Page:MDKGenAIPage");
  const cd = pageProxy.getClientData();
  if (cd && cd.AnomalyData) {
    for (const anomalyData of cd.AnomalyData) {
      //workaround to avoid binding conflict with earlier page when calling #property:...
      anomalyData.anomalyTitle = anomalyData.title
    }
    return cd.AnomalyData;
  } else {
    return [];
  }
}