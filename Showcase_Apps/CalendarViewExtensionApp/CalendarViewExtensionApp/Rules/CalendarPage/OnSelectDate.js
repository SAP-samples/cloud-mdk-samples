import DateUtils from '../Library/DateUtils';

/**
* @param {IClientAPI} clientAPI
*/
export default function OnSelectDate(clientAPI) {
    let oDate = clientAPI.getValue();
    if (oDate) {
        let oSectionProxy = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectTable0");
        let oTargetSpecifier = oSectionProxy.getTargetSpecifier();
        let sFormattedDate = DateUtils.toLocalDateString(oDate);
        clientAPI.getPageProxy().setCaption(clientAPI.formatDate(oDate));
        oTargetSpecifier.setQueryOptions("$filter=date(CreatedAt) eq " + sFormattedDate);
        oSectionProxy.setTargetSpecifier(oTargetSpecifier);
    }
}