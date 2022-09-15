import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <script async strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7914014072217717"
     crossOrigin="anonymous" data-checked-head="true"></script>
    </Head>
      <body>
        <Main />
        <NextScript />
        <div className='mask'></div>
        <div className='loader_elem'></div>
      </body>
    </Html>
  )
}