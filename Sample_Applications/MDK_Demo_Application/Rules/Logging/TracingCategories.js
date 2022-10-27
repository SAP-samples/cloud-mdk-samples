/**
 * Return the list of tracing categories to be selected when using Trace level logging
 * @param {IClientAPI} context
 */
export default function TracingCategories(context) {
    var categories = [];
    categories.push({
        'DisplayValue': 'Action',
        'ReturnValue': 'mdk.trace.action'
    });
    categories.push({
        'DisplayValue': 'API',
        'ReturnValue': 'mdk.trace.api'
    });
    categories.push({
        'DisplayValue': 'Application',
        'ReturnValue': 'mdk.trace.app'
    });
    categories.push({
        'DisplayValue': 'Binding',
        'ReturnValue': 'mdk.trace.binding'
    });    
    categories.push({
        'DisplayValue': 'Branding',
        'ReturnValue': 'mdk.trace.branding',
    });
    categories.push({
        'DisplayValue': 'Core',
        'ReturnValue': 'mdk.trace.core'
    });
    categories.push({
        'DisplayValue': 'Internationalization (i18n)',
        'ReturnValue': 'mdk.trace.i18n'
    });
    categories.push({
        'DisplayValue': 'App Update',
        'ReturnValue': 'mdk.trace.lcms'
    });
    categories.push({
        'DisplayValue': 'Logging',
        'ReturnValue': 'mdk.trace.logging'
    });
    categories.push({
        'DisplayValue': 'MDK Project',
        'ReturnValue': 'mdk.trace.mdkproject'
    });
    categories.push({
        'DisplayValue': 'OData',
        'ReturnValue': 'mdk.trace.odata'
    });
    categories.push({
        'DisplayValue': 'Onboarding',
        'ReturnValue': 'mdk.trace.onboarding'
    });
    categories.push({
        'DisplayValue': 'Profiling',
        'ReturnValue': 'mdk.trace.profiling'
    });
    categories.push({
        'DisplayValue': 'Push',
        'ReturnValue': 'mdk.trace.push'
    });
    categories.push({
        'DisplayValue': 'Rest Service',
        'ReturnValue': 'mdk.trace.restservice'
    });
    categories.push({
        'DisplayValue': 'Settings',
        'ReturnValue': 'mdk.trace.settings'
    });
    categories.push({
        'DisplayValue': 'Target Path',
        'ReturnValue': 'mdk.trace.targetpath'
    });
    categories.push({
        'DisplayValue': 'UI',
        'ReturnValue': 'mdk.trace.ui'
    });
    categories.sort((a, b) => a.Name - b.Name);
    return categories;    
}