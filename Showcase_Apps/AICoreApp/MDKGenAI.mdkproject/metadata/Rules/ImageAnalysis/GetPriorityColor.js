export default function GetPriorityColor(context) {
  try {
    const priority = context.evaluateTargetPath("#Property:OperationData/priority").toLowerCase();
    return {
      ['high']: 'HighPriorityRed',
      ['medium']: 'MediumPriorityOrange',
    }[priority] || 'GrayText';
  } catch (err) {
    console.log(err)
  }
}