export default function ProductCount(context) {
	return context.count('/MDKDemoApp/Services/Sample.service', 'Products', ``).then((count) => {
        let count_label = context.localizeText('see_all_count', [count]);
        return count_label;
    });
}