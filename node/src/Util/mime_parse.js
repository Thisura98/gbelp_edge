/**
 * Returns "sound", "image" or null.
 * @param {String} mime The mime type returned by multer's file.mimetype
 */
function findResourceTypeFromMimeType(mime){
    const mimeType = String(mime);
    if (mimeType.startsWith('image'))
        return 'image';
    else if (mimeType.startsWith('audio'))
        return 'sound';
    return null;
}

module.exports = findResourceTypeFromMimeType;