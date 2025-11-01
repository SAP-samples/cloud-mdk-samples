export default function LogLevels(context) { 
    var levels = [];
    levels.push({
        'DisplayValue': `${context.localize('log_level_error')}`,
        'ReturnValue': 'Error'
    });
    levels.push({
        'DisplayValue': `${context.localize('log_level_debug')}`,
        'ReturnValue': 'Debug'
    });
    levels.push({
        'DisplayValue': `${context.localize('log_level_warning')}`,
        'ReturnValue': 'Warn'
    });
    levels.push({
        'DisplayValue': `${context.localize('log_level_info')}`,
        'ReturnValue': 'Info'
    });
    levels.push({
        'DisplayValue': `${context.localize('log_level_trace')}`,
        'ReturnValue': 'Trace'
    })
    return levels;
}
