export default function ShowSalesOrder_Item_Product(context) {
    let binding = context.getPageProxy().getActionBinding();
    let pageProxy = context.getPageProxy();
    pageProxy.setActionBinding(binding.ProductDetails);
    return pageProxy.executeAction('/MDKDemoApp/Actions/Product/NavToProduct_Detail.action');
}