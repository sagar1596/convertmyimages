import React, { useRef, useState } from 'react';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';
import b64toBlob from 'b64-to-blob';
import fileDownload from 'js-file-download';


const ToPNG = () => {
    return (

        <div className={styles.container}>

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