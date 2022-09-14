import React from 'react';
import styles from '../styles/Footer.module.css';

const FooterComponent = () => {
    return (
        <footer className={styles.footer}>
            <span className={styles.footerCopy}>Copyright © 2022 NEOSOFT</span>
        </footer>
    );
}

export default FooterComponent;