import DateUtils from "../Library/DateUtils";

export default function QueryOptions(context) {
    return "$filter=date(CreatedAt) eq " + DateUtils.getCurrentDate();
}