import React from 'react';
import styles from '../styles/Convert.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SeoComponent from '../components/seo';
// import SquareadComponent from '../components/squareAd';

const Compress = () => {

    



    return (

        <div className={styles.container}>

            
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