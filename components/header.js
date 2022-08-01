import React from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
import logo from '../assets/logo.png';
import Link from 'next/link';

const HeaderComponent = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a><Image src={logo} alt="Logo" layout="fill" /></a></Link>
                
            </div>
        </div>
    );
}

export default HeaderComponent;