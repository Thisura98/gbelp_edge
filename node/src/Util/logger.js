/**
 * Logs an error message to the console
 * @param {string} message The log message
 * @param {string|null} tag An optional tag prefix
 */
function logc(message, tag){
    const msg = String(message);
    if (tag == null)
        console.log("LOG:", msg);
    else
        console.log("LOG:", `${tag}:`, msg);
}


module.exports.logc = logc;