import React from 'react';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';

const ToJPEG = () => {

    return (
        <div className={styles.container}>

        </div>
    )
}

ToJPEG.getLayout = (page) => {
  return (
      <>
        <SeoComponent 
            title="Convert My Images : To JPEG"
            description="This is a site used to convert images to JPEG format to a required size"
            canonical="http://www.convertmyimages.com/converttojpg"
            ourl= 'http://www.convertmyimages.com'
            otitle= 'Convert my images'
            odescription= 'This is a site used to convert images to JPEG format to a required size'
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

export default ToJPEG;