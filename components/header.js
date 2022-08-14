import React, {useState, useRef} from 'react';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
import logo from '../public/logo.png';
import Link from 'next/link';

const HeaderComponent = () => {
    const [active, setActive] = useState('1'),
    linkContainer = useRef();

    const handleClick = (e) => {
        linkContainer.current.querySelectorAll('a').forEach(e => e.classList.remove('active'));
        e.currentTarget.classList.add('active');
        setActive(e.currentTarget.getAttribute('data-id'));
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a onClick={() => setActive('1')}><Image src={logo} alt="Logo" layout="fill" /></a></Link>
            </div>
            {/* <div ref={linkContainer} className={styles.links}>
                <Link href="/compress"><a className={active === '1' ? styles.active : styles.basic}  data-id="1" onClick={handleClick}>Compress</a></Link>
                <Link href="/converttojpg"><a className={active === '2' ? styles.active  : styles.basic} onClick={handleClick} data-id="2">To jpg</a></Link>
                <Link href="/converttopng"><a className={active === '3' ? styles.active  : styles.basic} onClick={handleClick} data-id="3">To png</a></Link>
            </div> */}
        </div>
    );
}

export default HeaderComponent;