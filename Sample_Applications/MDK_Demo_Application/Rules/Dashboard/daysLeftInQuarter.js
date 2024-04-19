export function daysLeftInQuarter(context) {
  var d = new Date();
  var qEnd = new Date(d);
  qEnd.setMonth(qEnd.getMonth() + 3 - qEnd.getMonth() % 3, 0);
  var qNum = Math.floor((qEnd - d) / 8.64e7);
  let tagColor = qNum <= 30 ? "tagStyleRed": "tagStyleGreen";
  let label = context.localizeText('days_left_tag',[qNum]);
  let tagObj = {
    "Text": label,
    "Style": tagColor
  };
  return tagObj;
}