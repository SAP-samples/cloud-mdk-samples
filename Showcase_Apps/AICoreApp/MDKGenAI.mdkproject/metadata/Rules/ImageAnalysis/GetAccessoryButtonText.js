export default function GetAccessoryButtonText(context) {
  try {
    const accepted = context.evaluateTargetPath("#Property:accepted");

    if (accepted) {
      return "Completed";
    } else {
      return "Pending";
    }

  } catch (err) {
    return "Pending";
  }
}