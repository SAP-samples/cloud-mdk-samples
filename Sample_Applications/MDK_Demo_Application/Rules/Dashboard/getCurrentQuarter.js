export function getCurrentQuarter(context) {
  var d = new Date();
  var q = [1,2,3,4];
  var qNum = q[Math.floor(d.getMonth() / 3)];
  let tagObj = {
    "Text": `Q${qNum}`,
    "Style": "tagStyleTeal"
  }
  return tagObj;
}