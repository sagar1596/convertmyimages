import React, { useRef, useState, useEffect } from 'react';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';
import b64toBlob from 'b64-to-blob';
import fileDownload from 'js-file-download';
import JsZip from 'jszip';
import FileSaver from 'file-saver';
// import SquareadComponent from '../components/squareAd';
import FileBase64 from '../helpers/react-file-base64';
import Collapsible from 'react-collapsible';
import DownloadFileInfo from '../components/downloadFileInfo';
import SupportedOperations from '../components/supportedOperations';

const Home = () => {
    const fileName = useRef(),
    downloadSection = useRef(),
    grey = useRef(),
    width = useRef(),
    height = useRef(),
    quality = useRef(),
    scaleFactor = useRef(),
    scaleWidth = useRef(),
    scaleHeight = useRef(),
    flip_h = useRef(),
    flip_v = useRef(),
    rotate = useRef(),
    [uIFormat, setUIFormat] = useState(""),
    [convertedFiles, setConvertedFiles] = useState([]),
    [files, setFiles] = useState([]),
    JsZipIns = new JsZip() ;
    
    useEffect(() => {
        const setDownloadArea = () => {
            if(convertedFiles.length > 0) {
                downloadSection.current.classList.remove('hidden');
                const bodyElem = document.querySelector('body');
                bodyElem.classList.remove('loading');
            }
        }
        setDownloadArea();
    }, [convertedFiles]);

    useEffect(() => {
        if(files.length > 0) {
            const file = files[0];
            let fileNames = "";
            let fileTypeArr = [];
            files.forEach(file => {
                fileNames += file ? 
                `File Name: ${file.name} \n` :
                '';
                fileTypeArr.push(file.type);
            });
            fileName.current.innerText = fileNames;
        
            const fileType = fileTypeArr.every( (val, i, arr) => val === arr[0] ) ? fileTypeArr[0] : "Mixed";
            setUIFormat(fileType);
            downloadSection.current.classList.add('hidden');
        }
    }, [files]);

    const getFiles = (files) => {
        setFiles(files);
    }

    const onDeleteClick = (e) => {
        setFiles([]);
        setUIFormat("");
    }

    const _handleConvert = async (format) => {

        const bodyElem = document.querySelector('body');

        bodyElem.classList.add('loading');
        const file = files;

        if(!file) {
            bodyElem.classList.remove('loading');
            alert("File not provided");
            return;
        }

        const body = {};
        body.files = files.map(file => ({ base64: file.base64, fileName: file.name}));

        body.tf =  format || "image/png";
        body.quality = quality.current.value || 100;
        body.gs = grey.current.checked;
        const fixedSize = {};
        if(width && width.current.value !== '' && parseInt(width.current.value) > 0) {
            fixedSize.width = parseInt(width.current.value);
        }
        if(height && height.current.value !== '' && parseInt(height.current.value) > 0) {
            fixedSize.height = parseInt(height.current.value);
        }
        if(fixedSize.width || fixedSize.height) {
            body.fixedSize = fixedSize;
        }

        const scaleInfo = {};
        if(scaleFactor && scaleFactor.current.value !== '' && parseInt(scaleFactor.current.value) > 0) {
            scaleInfo.scaleFactor = parseInt(scaleFactor.current.value);
        }
        if(scaleWidth && scaleWidth.current.value !== '' && parseInt(scaleWidth.current.value) > 0) {
            scaleInfo.width = parseInt(scaleWidth.current.value);
        }
        if(scaleHeight && scaleHeight.current.value !== '' && parseInt(scaleHeight.current.value) > 0) {
            scaleInfo.height = parseInt(scaleHeight.current.value);
        }

        if(scaleInfo) {
            body.scaleInfo = scaleInfo;
        }

        const flip = {};
        flip.horizontal = flip_h.current.checked;
        flip.vertical = flip_v.current.checked;
        if(flip && (flip.hasOwnProperty('horizontal') || flip.hasOwnProperty('vertical'))) {
            body.flip = flip;
        }

        if(rotate && rotate.current.value !== '' && parseInt(rotate.current.value) > 0) {
            body.rotateAngle = parseInt(rotate.current.value);
        }

        const response = await fetch('/api/convert', {
            method: "POST",
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        setConvertedFiles(data.filesData.map((eachFile, idx) => {
            const blob = b64toBlob(eachFile.file, data.contentType),
            [ fileName ] = eachFile.fileName.split('.');
            return {
                blob: blob,
                blobId: idx,
                name: `${fileName}-converted.${data.extension}`,
                size: blob.size,
                type: blob.type
            }
        }));
    }

    const _handleDownload = async () => {
        convertedFiles.forEach(eachFile => {
            JsZipIns.file(eachFile.name, eachFile.blob);
        });

        const content = await JsZipIns.generateAsync({type: "blob"});
        const currDate = new Date().getTime();
        const fileName = `converted-${currDate}.zip`;
        await FileSaver.saveAs(content, fileName);
    }

    const _downloadSingle = (currentItem) => {
        const currentFile = convertedFiles.find(i => i.blobId === currentItem);
        fileDownload(currentFile.blob, currentFile.name);
    }

    return (

        <div className='container'>
            <SupportedOperations />
            <label className='label_style' htmlFor="imageupload">Choose File To Convert</label>
             <FileBase64
                id="imageupload"
                class="hidden"
                multiple={ true }
                onDone={ getFiles.bind(this) } />

            <div className='fileName_constainer' data-hidden={files.length > 0 ? '' : 'hidden'}>
                <span ref={fileName} className='fileName'></span>
                <span className='delete_btn' onClick={onDeleteClick}></span>
            </div>


            <Collapsible trigger="Resize or Crop">

                    <div className='additional_settings' itemScope itemType="https://schema.org/Settings">
                        <div className='option_container'>
                            <label htmlFor='quality'>Quality</label>
                            <input itemProp="quality" title='Quality' placeholder="1-100" type='number' min='0' max='100' step='1' ref={quality} />
                        </div>

                        <div className='option_container'>
                            <label htmlFor='grey'>Greyscale</label>
                            <input itemProp="greyscale" title='Greyscale' placeholder='Greyscale' type='checkbox' value="false" name="gray" ref={grey} />
                        </div>

                        <div className='option_container'>
                            <label htmlFor='width'>Fixed Size</label>
                            <input itemProp='width' title='Width' placeholder='Width' type='number' name='width' step='1' ref={width} />
                            <input itemProp='height' title='Height' placeholder='Height' type='number' name='height' step='1' ref={height} />
                        </div>

                        <div className='option_container'>
                            <label htmlFor='scale'>Scale</label>
                            <input itemProp='scale' title='Scale' placeholder='0-1' name='scale' type='number' min='0' max='1' step='0.1' ref={scaleFactor} />
                            <div className='scaleSizeContainer'>
                                <label className='scaleSize' htmlFor='scaleWidth'>Scale Size</label>
                                <input itemProp='scaleWidth' title='Width' placeholder='Width' type='number' name='scaleWidth' step='1' ref={scaleWidth} />
                                <input itemProp='scaleHeight' title='Height' placeholder='Height' type='number' name='scaleHeight' step='1' ref={scaleHeight} />
                            </div>
                        </div>
                    </div>
            </Collapsible>

            <Collapsible trigger="Flip or Rotate" itemScope itemType="https://schema.org/Settings">
                <div className='additional_settings'>
                    <div className='option_container'>
                        <label htmlFor='flip_h'>Flip Horizontal</label>
                        <input itemProp='flipHorizontal' title='Flip Horizontal' placeholder='Flip Horizontal' type='checkbox' value="false" name="flip_h" ref={flip_h} />
                    </div>
                    <div className='option_container'>
                        <label htmlFor='flip_v'>Flip Vertical</label>
                        <input itemProp='flipVertical' title='Flip Vertical' placeholder='Flip Vertical' type='checkbox' value="false" name="flip_v" ref={flip_v} />
                    </div>
                    <div className='option_container'>
                        <label htmlFor='rotate'>Rotate Angle</label>
                        <input itemProp='rotateAngle' title='Rotate Angle' placeholder='deg' type='number' min="0" max="360" step="1" name="rotate" ref={rotate} />
                    </div>
                </div>
            </Collapsible>

            <div className='btns_container' itemScope itemType="https://schema.org/Actions">
                <button className='convert_btn' 
                    itemProp='topng'
                    data-format="image/png" 
                    data-disabled={files.length > 0 ? '' : 'disabled'}
                    onClick={() => _handleConvert("image/png")} 
                    >{uIFormat === 'image/png' ? 'Save PNG' : 'Convert To PNG'}</button>
                <button className='convert_btn' 
                    itemProp='tojpeg'
                    data-format="image/jpeg" 
                    data-disabled={files.length > 0 ? '' : 'disabled'}
                    onClick={() => _handleConvert("image/jpeg")} 
                    >{uIFormat === 'image/jpeg' ? 'Save JPEG' : 'Convert To JPEG'}</button>
                <button className='convert_btn' 
                    itemProp='tobmp'
                    data-format="image/bmp" 
                    data-disabled={files.length > 0 ? '' : 'disabled'}
                    onClick={() => _handleConvert("image/bmp")} 
                    >{uIFormat === 'image/bmp' ? 'Save BMP' : 'Convert To BMP'}</button>
            </div>

            <div className='downloadFile hidden row mx-1' ref= { downloadSection }>
            <div className='old col-12 col-md-6'>
                <span className='header_download'>Old</span>
                {
                    files.map((file, idx) => (
                        <DownloadFileInfo
                            key={idx}
                            file={file}
                            showDownloadBtn={false}
                            doubleCheck={true}
                        />
                        
                    ))
                }
            </div>
            <div className='new col-12 col-md-6'>
                <span className='header_download'>New</span>
            {
                convertedFiles.map((file, idx) => (
                    <DownloadFileInfo
                            key={idx}
                            file={file}
                            showDownloadBtn={true}
                            doubleCheck={false}
                            downloadSingle={_downloadSingle}
                        />
                ))
            }
            </div>
            <button type="button" className='download_btn' onClick={_handleDownload} >Download All</button>
            
            </div>
        </div> 
    )
}

Home.getLayout = (page) => {
  return (
      <>
        <SeoComponent
            title="Convert My Images"
            description="This is a site used to resize, crop and rotate images to required sizes and formats."
            canonical="https://www.convertmyimages.com"
            ourl= 'https://www.convertmyimages.com'
            otitle= 'Convert my images'
            odescription= 'This is a site used to resize, crop and rotate images to required sizes and formats.'
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