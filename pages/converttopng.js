import React, { useRef, useState } from 'react';
import { compressAccurately, compress, filetoDataURL } from 'image-conversion';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';
import b64toBlob from 'b64-to-blob';
import fileDownload from 'js-file-download';


const ToPNG = () => {
    const old_size = useRef(),
    old_type = useRef(),
    new_size = useRef(),
    new_type = useRef(),
    required_size = useRef(),
    downloadSection = useRef(),
    quality = useRef(),
    [convertedFile, setConvertedFile] = useState({}),
    [compressType, setCompressType] = useState("size");

    

    const _handleConvert = async () => {
        
        const fileToConvert = document.getElementById('imageupload').files[0];

        if(!fileToConvert) {
            alert("File not provided");
            return;
        }

        _sendFileToConvert(fileToConvert);

        
        
    }

    const _sendFileToConvert = async (file) => {
        const body = new FormData();
        body.append("file", file);

        const options = {};
        
        body.append("tf", "image/png");
        body.append("size", required_size.current.value);
        body.append("quality", quality.current.value);

        const response = await fetch('/api/topng', {
            method: "POST",
            body
        });
        const data = await response.json();
        // console.log(data);
        const blob = b64toBlob(data.b64Data, data.contentType);
        // console.log(blob);
        const [ fileName ] = file.name.split('.');
        fileDownload(blob, `${fileName}-resized.${data.extension}`);
        
    }

    const convertFile = (type, reqSize) => {
        const file = document.getElementById('imageupload').files[0];
        if(type === 1) {
            compressAccurately(file,{
                size: parseInt(reqSize),
                type: "image/png"
            }).then(res=>{

                setConvertedFile(res);

                old_size.current.innerText = `Size: ${bytesToKbs(file.size)}`;
                old_type.current.innerText = `Type: ${file.type}`;

                new_size.current.innerText = `Size: ${bytesToKbs(res.size)}`;
                new_type.current.innerText = `Type: ${res.type}`;

                downloadSection.current.classList.remove('hidden');
            })
        } else {
            const qualityValue = reqSize || 1;
            compress(file,{
                quality: qualityValue,
                type: "image/png"
            }).then(res=>{

                setConvertedFile(res);

                old_size.current.innerText = `Size: ${bytesToKbs(file.size)}`;
                old_type.current.innerText = `Type: ${file.type}`;

                new_size.current.innerText = `Size: ${bytesToKbs(res.size)}`;
                new_type.current.innerText = `Type: ${res.type}`;

                downloadSection.current.classList.remove('hidden');
            })
        }
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

     const _handleRadioChange = (val) => {
        setCompressType(val.currentTarget.value);
     }


    return (

        <div className={styles.container}>

            <span className={ styles.instruction }>
                Upload the image that you wish to convert to PNG format.
            </span>

            <label className={styles.label_style} htmlFor="imageupload">Choose File:</label>
            <input id="imageupload" type="file"></input>

            <form id="data-form" className = {styles.compress_type_container}>
                <label htmlFor="size">Size: </label>
                <input title="Required Size" className={styles.input_text} type="text" name="size" defaultValue="200" ref={ required_size } />
                <label htmlFor="quality">Quality: </label>
                <input title="Required Quality" className={styles.input_text} name="quality" type="number" min="10" max='100' step='10' defaultValue='100' ref={ quality } />
                
            </form>

            

            <button className={styles.convert_btn} onClick={_handleConvert}>Convert To PNG</button>

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

ToPNG.getLayout = (page) => {
  return (
      <>
        <SeoComponent 
        title="Convert My Images : To PNG"
        description="This is a site used to convert images to PNG format to a required size"
        canonical="http://www.convertmyimages.com/converttopng"
        ourl= 'http://www.convertmyimages.com'
        otitle= 'Convert my images'
        odescription= 'This is a site used to convert images to PNG format to a required size'
        osite_name= 'ConvertMyImages'
        thandle= '@sagar1596'
        tsite= 'www.sagarbhat.com'
        />
        <HeaderComponent />
        {page}
        <FooterComponent />
      </>
  );
}

export default ToPNG;