import { daysLeftInQuarter } from './daysLeftInQuarter';
import { getCurrentQuarter } from './getCurrentQuarter';

/**
 * Describe this function...
 * @param {IClientAPI} context
 */
export default function GetDashboardTags(context) {
    let tags = [];
    tags.push(daysLeftInQuarter(context));
    tags.push(getCurrentQuarter(context));
    return tags;
}
