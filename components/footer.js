import React from 'react';
import styles from '../styles/Footer.module.css';

const FooterComponent = () => {
    return (
        <div className={styles.footer}>
            <span className={styles.footerCopy}>Copyright © 2022 NEOSOFT</span>
        </div>
    );
}

export default FooterComponent;