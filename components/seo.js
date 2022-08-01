import { NextSeo } from 'next-seo';

const SeoComponent = () => (
  <>
    <NextSeo
      title="Convert My Images"
      description="This is a site used to convert images to png and to a specific required size."
      canonical="http://www.convertmyimages.com"
      openGraph={{
        url: 'http://www.convertmyimages.com',
        title: 'Convert my images',
        description: 'This is a site used to convert images to png and to a specific required size.',
        site_name: 'ConvertMyImages'
      }}
      twitter={{
        handle: '@sagar1596',
        site: 'www.sagarbhat.com'
      }}
    />
  </>
);

export default SeoComponent;