import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';
import b64toBlob from 'b64-to-blob';
import fileDownload from 'js-file-download';
// import SquareadComponent from '../components/squareAd';
import FileBase64 from 'react-file-base64';

const Home = () => {
    const old_size = useRef(),
    old_type = useRef(),
    new_size = useRef(),
    new_type = useRef(),
    fileName = useRef(),
    downloadSection = useRef(),
    quality = useRef(),
    [uIFormat, setUIFormat] = useState(""),
    [convertedFile, setConvertedFile] = useState({}),
    [files, setFiles] = useState([]);
    
    useEffect(() => {
        const setDownloadArea = () => {
            if(convertedFile && convertedFile.hasOwnProperty('size')) {
                new_size.current.innerText = `Size: ${bytesToKbs(convertedFile.size)}`;
                new_type.current.innerText = `Type: ${convertedFile.type}`;
    
                downloadSection.current.classList.remove('hidden');
            }
        }
        setDownloadArea();
    }, [convertedFile]);

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

    const getFiles = (files) => {
        setFiles(files);

        fileName.current.innerText = files[0] ? 
        `File Name: ${files[0].name}` :
        '';
    
        setUIFormat(files[0] ? 
            files[0].type :
        'image/png');

        old_size.current.innerText = `Size: ${bytesToKbs(kbToBytes(parseInt(files[0].size.replace(' kB', '')) ))}`;
        old_type.current.innerText = `Type: ${files[0].type}`;
      }
      

    const _handleUpload = (a) => {
        const file = files[0];

        fileName.current.innerText = file ? 
            `File Name: ${file.name}` :
            '';
        
        setUIFormat(file ? 
            file.type :
        'image/png');

        
        old_size.current.innerText = `Size: ${bytesToKbs(kbToBytes(file.size))}`;
        old_type.current.innerText = `Type: ${file.type}`;
    }

    const _handleConvert = async (format) => {
        const file = files[0];

        if(!file) {
            alert("File not provided");
            return;
        }

        const body = {};
        body.file = file.base64;

        body.tf =  format || "image/png";

        const response = await fetch('/api/convert', {
            method: "POST",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("data", data);
        const blob = b64toBlob(data.b64Data, data.contentType);

        const [ fileName ] = file.name.split('.');
        

        setConvertedFile({
            blob: blob,
            name: `${fileName}-converted.${data.extension}`,
            size: blob.size,
            type: blob.type
        });
    }

    const _handleDownload = () => {
        fileDownload(convertedFile.blob, convertedFile.name);
    }

    return (

        <div className={styles.container}>

            <label className={styles.label_style} htmlFor="imageupload">Choose File To Convert</label>
            <input className={styles.upload_style} id="imageupload" type="file" onChange={_handleUpload}></input>

            <FileBase64
                multiple={ true }
                onDone={ getFiles } />

            <div className={styles.fileName_constainer}>
                <span ref={fileName} className={styles.fileName}></span>
            </div>

            <div className={styles.btns_container}>
                <button className={styles.convert_btn} data-format="image/png" onClick={() => _handleConvert("image/png")} data-hidden={uIFormat === 'image/png' ? 'hidden' : ''}>Convert To PNG</button>
                <button className={styles.convert_btn} data-format="image/jpeg" onClick={() => _handleConvert("image/jpeg")} data-hidden={(uIFormat === 'image/jpg' || uIFormat === 'image/jpeg') ? 'hidden' : ''}>Convert To JPEG</button>
                {/* <button className={styles.convert_btn} data-format="image/bmp" onClick={() => _handleConvert("image/bmp")} data-hidden={uIFormat === 'image/bmp' ? 'hidden' : ''}>Convert To BMP</button> */}
            </div>

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

                    <button type="button" className={styles.download_btn} onClick={_handleDownload} >Download</button>
                </div>
            </div>
        </div>
    )
}

Home.getLayout = (page) => {
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

export default Home;