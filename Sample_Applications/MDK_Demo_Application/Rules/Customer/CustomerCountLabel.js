export default function CustomerCount(context) {
	return context.count('/MDKDemoApp/Services/Sample.service', 'Customers', ``).then((count) => {
        let count_label = context.localizeText('see_all_count', [count]);
        return count_label;
    });
}