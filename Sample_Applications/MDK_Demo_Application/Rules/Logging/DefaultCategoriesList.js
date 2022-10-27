/**
 * Return the list of default categories to enable when tracing is turned on
 * @param {IClientAPI} context
 */
export default function DefaultCategoriesList(context) {
    let traceCategories = [
        'mdk.trace.action',
        'mdk.trace.api',   
        'mdk.trace.app',
        'mdk.trace.binding',
        'mdk.trace.i18n',
        'mdk.trace.odata',
        'mdk.trace.profiling',
        'mdk.trace.targetpath',
        'mdk.trace.ui'
    ];
    return traceCategories;
}
