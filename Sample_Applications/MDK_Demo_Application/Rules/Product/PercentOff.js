export default function PercentOff(context) {
    let discounts = [0.05,0.10,0.15,0.25];
    let randomDiscount = Math.round(Math.random() * (3));
    let itemDiscount = discounts[randomDiscount];
    // Only give discounts if price is > 0
    if (context.binding.Price && context.binding.Price > 0) {
        // Store promotion item discount
        let cd = context.getPageProxy().getClientData();
        //let promoItems = cd.promoItems;
        if (!cd.promoItems) {
            cd.promoItems = {};
        }
        if (cd.promoItems && !cd.promoItems.hasOwnProperty(context.binding.ProductId)) {
            cd.promoItems[context.binding.ProductId] = itemDiscount;
        } else {
            itemDiscount = cd.promoItems[context.binding.ProductId];
        }
        // Defined the Percent Off String
        let discountStr = `+${context.formatPercentage(itemDiscount,null,{minimumIntegerDigits:1,minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:true})} Off`;
        return discountStr;
    } else {
        return null;
    }
}