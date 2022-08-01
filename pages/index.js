import React, { useRef, useState } from 'react';
import { compressAccurately } from 'image-conversion';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';

const ToPng = () => {
    const old_size = useRef(),
    old_type = useRef(),
    new_size = useRef(),
    new_type = useRef(),
    required_size = useRef(),
    downloadSection = useRef(),
    [convertedFile, setConvertedFile] = useState({});

    

    const _handleConvert = () => {
        
        const reqSize = required_size.current.value;
        const file = document.getElementById('imageupload').files[0];

        if(!reqSize || !file) {
            alert("File or required size not provided");
            return;
        }

        convertFile(reqSize);
    }

    const convertFile = (reqSize) => {
        const file = document.getElementById('imageupload').files[0];
        compressAccurately(file,parseInt(reqSize)).then(res=>{

            setConvertedFile(res);

            old_size.current.innerText = `Size: ${bytesToKbs(file.size)}`;
            old_type.current.innerText = `Type: ${file.type}`;

            new_size.current.innerText = `Size: ${bytesToKbs(res.size)}`;
            new_type.current.innerText = `Type: ${res.type}`;

            downloadSection.current.classList.remove('hidden');
        })
    }

    const _handleDownload = () => {
        saveFile(convertedFile, `converted-file`);
    }

    const saveFile = (blob, filename) => {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 0)
        }
    }

    const bytesToKbs = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     }


    return (

        <div className={styles.container}>

            <span className={ styles.instruction }>
                Upload the image that you wish to convert and size that you want it to be converted to.
                Currently, images are only being converted to png. We are soon introducing other formats.
            </span>

            <label htmlFor="imageupload">Choose File:</label>
            <input id="imageupload" type="file"></input>

            <label htmlFor="size_needed">Size needed:</label>
            <input id="size_needed" type="text" ref={ required_size }></input>

            <button className={styles.convert_btn} onClick={_handleConvert}>Convert</button>

            <div className={styles.downloadFile + ' hidden'} ref= { downloadSection }>
                <div className={styles.old}>
                    <span className={styles.title}>Old</span>
                    <span className="size" ref={ old_size }></span>
                    <span className="type" ref={ old_type }></span>
                </div>
                <div className={styles.new}>
                    <span className={styles.title}>New</span>
                    <span className="size" ref={ new_size }></span>
                    <span className="type" ref={ new_type }></span>

                    <button type="button" className={styles.download_btn} onClick={_handleDownload}>Download</button>
                </div>
            </div>
        </div>
    )
}

ToPng.getLayout = (page) => {
  return (
      <>
        <SeoComponent />
        <HeaderComponent />
        {page}
        <FooterComponent />
      </>
  );
}

export default ToPng;