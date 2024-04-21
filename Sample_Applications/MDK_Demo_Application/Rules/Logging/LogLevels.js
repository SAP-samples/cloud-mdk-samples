export default function LogLevels(context) { 
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error'
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug'
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn'
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info'
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace'      
    })
    return levels;
}
