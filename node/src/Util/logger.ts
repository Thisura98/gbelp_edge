/**
 * Logs an error message to the console
 * @param {string} message The log message
 * @param {string|null} tag An optional tag prefix
 */
export function logc(message: string, tag: string | null){
    const msg = String(message);
    if (tag == null)
        console.log("LOG:", msg);
    else
        console.log("LOG:", `${tag}:`, msg);
}


