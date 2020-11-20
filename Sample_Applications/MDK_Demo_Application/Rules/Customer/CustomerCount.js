export default function CustomerCount(context) {
	return context.count('/MDKDemoApp/Services/Sample.service', 'Customers', ``).then((count) => {
        return count;
    });
}