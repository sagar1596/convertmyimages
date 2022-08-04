import React, { useEffect } from 'react';
import styles from '../styles/Squaread.module.css';

const SquareadComponent = () => {
    const loadAds = () => {
        try {
          if (typeof window !== "undefined") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.log("adsense error", error.message);
        }
      };
    
      useEffect(() => {
        loadAds();
      }, []);
    return (
        <div className={styles.square_ad_container}>
            
            <ins className="adsbygoogle"
                style={{ display:'block' }}
                data-ad-client="ca-pub-7914014072217717"
                data-ad-slot="7384355092"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}

export default SquareadComponent;