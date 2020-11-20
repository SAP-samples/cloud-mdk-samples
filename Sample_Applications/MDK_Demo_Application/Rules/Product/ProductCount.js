export default function ProductCount(context) {
	return context.count('/MDKDemoApp/Services/Sample.service', 'Products', ``).then((count) => {
        return count;
    });
}