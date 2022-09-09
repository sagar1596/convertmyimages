import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[])

  return getLayout(
  <>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp;