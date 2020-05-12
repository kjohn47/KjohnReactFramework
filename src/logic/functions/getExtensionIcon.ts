export enum IconCode {
    Img,
    Txt,
    Doc,
    Xls,
    Ppt,
    Pdf,
    Audio,
    Video,
    Archive,
    Important,
    Binary,
    Code,
    Unknown
}

export const getIconCodeFromExtension = (extension: string): IconCode => {
    const extensionLower = extension.toLowerCase();
    switch(extensionLower)
    {
        //image type
        case 'png' :
        case 'jpg':
        case 'jpeg':
        case 'bmp': 
        case 'gif': 
        case 'tiff':
        case 'tif': 
        case 'svg': 
        case 'webp':
        case 'ico':
        case 'cr2':
        case 'ai':
        case 'psd':
        case 'xcf':
        {
            return IconCode.Img
        }

        //document type
        case 'txt':
        case 'ics':
        case 'rtf':
        {
            return IconCode.Txt
        }

        case 'xml':
        case 'css':
        case 'htm':
        case 'html':
        case 'js':
        case 'sh':
        case 'csh':
        case 'json':
        case 'php':
        case 'xhtml':
        case 'swf':
        case 'jsx':
        case 'tsx':
        case 'ts':
        case 'ino':
        case 'c':
        case 'cpp':
        case 'cs':
        case 'vb':
        case 'bat':
        case 'py':
        case 'asp':
        case 'aspx':
        case 'asmx':
        case 'ashx':
        case 'java':
        case 'pl':
        case 'rb':
        case 'cgi':
        case 'xslt':
        case 'asm':
        case 'sql':
        case 'sb2':
        case 'lua':
        {
            return IconCode.Code
        }

        case 'doc':
        case 'docx':
        case 'odt':
        {
            return IconCode.Doc
        }

        case 'xls':
        case 'xlsx':
        case 'ods':
        case 'csv':
        {
            return IconCode.Xls
        }

        case 'ppt':
        case 'pptx':
        case 'odp':
        {
            return IconCode.Ppt
        }

        case 'pdf': {
            return IconCode.Pdf
        }

        //archieve Type
        case 'zip':
        case 'bz':
        case 'tar.bz':
        case 'bz2':
        case 'tar.bz2':
        case 'tar':
        case 'rar':
        case 'gz':
        case 'tar.gz':
        case '7z':
        case 'cab':
        case 'dmg':
        {
            return IconCode.Archive;
        }

        //Audio type
        case 'aac':
        case 'mid':
        case 'midi':
        case 'mp3':
        case 'oga':
        case 'opus':
        case 'wav':
        case 'weba':
        case 'wma':
        case 'm4a':
        {
            return IconCode.Audio; 
        }

        //video type
        case 'avi':
        case 'mpeg':
        case 'mp4':
        case 'mkv':
        case 'ogv':
        case 'webm':
        case '3gp':
        case '3g2':
        case 'wmv':
        case 'mov':
        {
            return IconCode.Video;
        }

        //binary type
        case 'exe':
        case 'bin':
        case 'dll':
        case 'rom':
        case 'cap':
        case 'app':
        case 'run':
        case 'com':
        case 'out':
        case 'iso':
        case 'img':
        case 'apk':
        case 'elf':
        case 'a':
        case 'jar':
        {
            return IconCode.Binary;
        }

        case 'pem':
        case 'crt':
        case 'cer':
        case 'p12':
        case 'pfx':
        {
            return IconCode.Important
        }

        default: {
            return IconCode.Unknown;
        }
    }
}