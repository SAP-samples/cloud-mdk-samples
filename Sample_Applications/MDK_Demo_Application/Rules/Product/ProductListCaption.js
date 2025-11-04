export default function ProductCatalogCaption(context) {
	let pageProxy = context.getPageProxy();
	var currentFilter = null;

	if (pageProxy.getControls().length > 0) {
		let filter = null;
		if (pageProxy.getControls()[0].getSections()[0]._context.element.observable()._currentFilter) {
			currentFilter = pageProxy.getControls()[0].getSections()[0]._context.element.observable()._currentFilter;
			console.log(currentFilter);
			filter = `$filter=${encodeURIComponent(currentFilter)}`;
			console.log(filter);
		}
		let products_caption = context.localizeText('product_list_caption');
		
		return context.count('/MDKDemoApp/Services/Sample.service', 'Products', ``).then((totalCount) => {
			return context.count('/MDKDemoApp/Services/Sample.service', 'Products', filter).then((count) => {
				let caption = null;
				if (count != totalCount) {
					caption = `${products_caption} (${count}/${totalCount})`;
				} else {
					caption = `${products_caption} (${count})`;
				}
				pageProxy.setCaption(caption);
				return caption;
			});
		});
	} else {
		return context.count('/MDKDemoApp/Services/Sample.service', 'Products', ``).then((count) => {
			let caption = `${products_caption} (${count})`;
			pageProxy.setCaption(caption);			
			return caption;
		});
	}
}