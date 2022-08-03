import { NextSeo } from 'next-seo';

const SeoComponent = ({title, description, canonical, ourl, otitle, odescription, osite_name, thandle, tsite}) => {
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
          noindex: false,
          nofollow: false,
          images: [
            {
              url: 'https://www.convertmyimages.com/logo.png',
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