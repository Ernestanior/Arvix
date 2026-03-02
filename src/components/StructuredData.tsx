export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ARVIX',
    url: 'https://arvixai.com',
    logo: 'https://arvixai.com/logo.png',
    description: '专注网站开发、APP开发和小程序开发的科技公司',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '新加坡',
      addressRegion: ' ',
      addressCountry: 'Singapore',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-138-0000-0000',
      contactType: '客户服务',
      email: 'ern@xyvnai.com',
    },
    sameAs: [
      'https://github.com/xyvn',
      'https://twitter.com/xyvn',
      'https://linkedin.com/company/xyvn',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ARVIX',
    url: 'https://arvixai.com',
    description: '打造卓越数字体验',
    publisher: {
      '@type': 'Organization',
      name: 'ARVIX',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '网站开发与APP开发',
    provider: {
      '@type': 'Organization',
      name: 'ARVIX',
    },
    areaServed: 'CN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '数字服务',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '网站开发',
            description: '高性能、响应式网站开发服务',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'APP开发',
            description: 'iOS和Android原生应用开发',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '小程序开发',
            description: '微信小程序和其他平台小程序开发服务',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
