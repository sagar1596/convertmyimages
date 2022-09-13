import React from 'react';

const bytesToKbs = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function kbToBytes(kilobytes) {
    var Bytes = 0;
    // Calculates Bytes
    // 1 KB = 1024 bytes
    Bytes = kilobytes * 1024;
    return Bytes;
}

const DownloadFileInfo = ({file, showDownloadBtn, doubleCheck, downloadSingle}) => (
    <div>
        <span className='title'>Name: { file.name }</span>
        <span className="size" >Size: {doubleCheck 
            ? bytesToKbs(kbToBytes(file.size.replace(' kB', '')))
            : bytesToKbs(file.size)
            }</span>
        <span className="type">Type: { file.type }</span>

        {
            showDownloadBtn 
                ? (<span className="ind_download_btn"  onClick={() => downloadSingle(file.blobId)}></span>)
                : undefined
        }
    </div>
);

export default DownloadFileInfo;