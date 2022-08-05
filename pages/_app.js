import '../styles/globals.css'
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
  <>
  

  {/* <script 
   async strategy="afterInteractive"
   onError={ (e) => { console.error('Script failed to load', e) }}
   data-checked-head="true"
   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7914014072217717"
     ></script> */}
  <Component {...pageProps} />
  </>
  )
}

export default MyApp;