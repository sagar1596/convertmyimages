import { NextSeo } from 'next-seo';

const SeoComponent = ({title, description, canonical, ourl, otitle, odescription, osite_name, thandle, tsite}) => {
  console.log(odescription)
  return (
    <>
      <NextSeo
        title = { title }
        description = { description }
        canonical={ canonical }
        openGraph={{
          url: ourl,
          title: otitle,
          description: odescription,
          site_name: osite_name,
          images: [
            {
              url: 'https://www.convertmyimages.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a64697f3.png&w=3840&q=75',
              width: 1274,
              height: 387,
              alt: 'Logo',
              type: 'image/png',
            }]
        }}
        twitter={{
          handle: thandle,
          site: tsite
        }}
      />
    </>
  );
}

export default SeoComponent;