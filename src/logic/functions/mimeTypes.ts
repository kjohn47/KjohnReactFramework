import { IDictionary } from "./misc";

export const getMimeTypeFromExtension = ( extension: string ): string => {
    let mime = MimeTypeExtension[extension.toLowerCase()];
    if( mime )
    {
        return mime;
    }
    return "application/octet-stream";
}

export const MimeTypeExtension: IDictionary<string> = {
    //Image Types
    'png': "image/png",
    'jpg': "image/jpeg",
    'jpeg': "image/jpeg",
    'bmp': "image/bmp",
    'gif': "image/gif",
    'tiff': "image/tiff",
    'tif': "image/tiff",
    'svg': "image/svg+xml",
    'webp': "image/webp",
    'ico': "image/vnd.microsoft.icon",
    //Document Types Text
    'txt': "text/plain",
    'xml': "text/xml",
    'csv': "text/csv",
    'css': "text/css",
    'htm': "text/html",
    'html': "text/html",
    'ics': "text/calendar",
    'js': "text/javascript",
    //Document Types App
    'rtf': "application/rtf",
    'pdf': "application/pdf",
    'doc': "application/msword",
    'docx': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    'xls': "application/vnd.ms-excel",
    'xlsx': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    'ppt': "application/vnd.ms-powerpoint",
    'pptx': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    'sh': "application/x-sh",
    'csh': "application/x-csh",
    'json': "application/json",
    'odp': "application/vnd.oasis.opendocument.presentation",
    'odt': "application/vnd.oasis.opendocument.text",
    'ods': "application/vnd.oasis.opendocument.spreadsheet",
    'php': "application/x-httpd-php",
    'vsd': "application/vnd.visio",
    'xhtml': "application/xhtml+xml",
    'swf': "application/x-shockwave-flash",
    //Archieve Types
    'zip': "application/zip",
    'bz': "application/x-bzip",
    'tar.bz': "application/x-bzip",
    'bz2': "application/x-bzip2",
    'tar.bz2': "application/x-bzip2",
    'tar': "application/x-tar",
    'rar': "application/vnd.rar",
    'gz': "application/gzip",
    'tar.gz': "application/gzip",
    'jar': "application/java-archive",
    '7z': "application/x-7z-compressed",
    //Audio Types
    'aac': "audio/aac",
    'mid': "audio/midi",
    'midi': "audio/midi",
    'mp3': "audio/mpeg",
    'oga': "audio/ogg",
    'opus': "audio/opus",
    'wav': "audio/wav",
    'weba': "audio/weba",
    //Video Types
    'avi': "video/x-msvideo",
    'mpeg': "video/mpeg",
    'mp4': "video/mp4",
    'mkv': "video/x-matroska",
    'ogv': "video/ogg",
    'ts': "video/mp2t",
    'webm': "video/webm",
    '3gp': "video/3gpp",
    '3g2': "video/3gpp2",
}