/**
* Describe this function...
* @param {IClientAPI} context
*/
export default function CreateProduct(context) {
	var prodImage = context.evaluateTargetPath("#Control:ProductImage/#Value");
	console.log("prodImage: " + prodImage);
	return context.executeAction({
		"Name": "/ImageHandlingApp/Actions/Products/CreateProduct.action",
		"Properties": {
			"Media": prodImage//[prodImage[0]]
		}
	});
}