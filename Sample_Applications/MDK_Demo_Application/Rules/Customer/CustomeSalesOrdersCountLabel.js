export default function CustomerSalesOrdersCountLabel(context) {
	return context.count('/MDKDemoApp/Services/Sample.service', `${context.binding["@odata.readLink"]}/SalesOrders`, ``).then((count) => {
        let count_label = context.localizeText('see_all_count', [count]);
        return count_label;
    });
}