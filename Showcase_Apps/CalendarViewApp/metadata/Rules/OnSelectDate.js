import DateUtils from './Library/DateUtils';

export default function OnSelectDate(context) {
    if (context.getValue()) {
        let oSectionProxy = context.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectTable0");
        let oTargetSpecifier = oSectionProxy.getTargetSpecifier();
        let sDate = DateUtils.toLocalDateString(context.getValue());
        oTargetSpecifier.setQueryOptions("$filter=date(CreatedAt) eq " + sDate);
        oSectionProxy.setTargetSpecifier(oTargetSpecifier);
    }
}