import React, { useRef, useState } from 'react';
import { compressAccurately, compress } from 'image-conversion';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';

const Compress = () => {
    const old_size = useRef(),
    old_type = useRef(),
    new_size = useRef(),
    new_type = useRef(),
    required_size = useRef(),
    downloadSection = useRef(),
    quality = useRef(),
    [convertedFile, setConvertedFile] = useState({}),
    [compressType, setCompressType] = useState("size");

    

    const _handleConvert = () => {
        
        const file = document.getElementById('imageupload').files[0];

        if(!file) {
            alert("File not provided");
            return;
        }

        switch(compressType) {
            case "size":
                const reqSize = required_size.current.value;
                convertFile(1, reqSize);
                break;
            case "quality":
                const reqQuality = quality.current.value;
                convertFile(2, reqQuality);
                break;
        }
        
    }

    const convertFile = (type, reqSize) => {
        const file = document.getElementById('imageupload').files[0];
        if(type === 1) {
            compressAccurately(file,{
                size: parseInt(reqSize)
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
                quality: qualityValue
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
         if(val.currentTarget.value) {
            setCompressType(val.currentTarget.value);
         }
     }


    return (

        <div className={styles.container}>

            <span className={ styles.instruction }>
                Upload the image that you wish to compress and size/quality that you want it to be compressed to.
            </span>

            <label className={styles.label_style} htmlFor="imageupload">Choose File:</label>
            <input id="imageupload" type="file"></input>

            <div className = {styles.compress_type_container}>
                <input type="radio" className={styles.input_radio} title="Compress to Size" checked={compressType === 'size'} placeholder="Compress to Size" name="compress_type" value="size" onChange={_handleRadioChange} />
                <span className={styles.radio_label}>Size</span>
                <input type="radio" className={styles.input_radio} title="Compress to Quality" placeholder="Compress to Quality" name="compress_type" value="quality" onChange={_handleRadioChange} />
                <span className={styles.radio_label}>Quality</span>

                {
                    compressType === 'size' ? 
                            ( 
                            <>
                            <input id="size_needed" className={styles.input_text} type="text" defaultValue="200" ref={ required_size }></input></> )
                        : 
                            (<>
                            <input id="quality" className={styles.input_text} type="number" min="0" max='1' step='0.1' defaultValue='1.0' ref={ quality }></input></>)
                }
            </div>

            

            <button className={styles.convert_btn} onClick={_handleConvert}>Compress</button>

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

Compress.getLayout = (page) => {
  return (
      <>
        <SeoComponent
            title="Convert My Images : Compress"
            description="This is a site used to compress images to required size."
            canonical="http://www.convertmyimages.com/compress"
            ourl= 'http://www.convertmyimages.com'
            otitle= 'Convert my images'
            odescription= 'This is a site used to compress images to required size.'
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

export default Compress;