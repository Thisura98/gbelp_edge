/**
 * Returns "sound", "image" or null.
 * @param {String} mime The mime type returned by multer's file.mimetype
 */
export function findResourceTypeFromMimeType(mimeType: string){
    if (mimeType.startsWith('image'))
        return 'image';
    else if (mimeType.startsWith('audio'))
        return 'sound';
    return null;
}