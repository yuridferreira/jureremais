export const siteConfig = {
  name: 'Jurerê Mais',
  tagline: 'Gestão urbana colaborativa para um Jurerê mais seguro, sustentável e organizado.',
  description:
    'O Jurerê Mais é o movimento que une moradores, empresários e instituições para transformar Jurerê Internacional em um lugar mais seguro, sustentável e organizado.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.jureremais.org',
  cmsUrl: process.env.NEXT_PUBLIC_CMS_URL ?? 'https://cms.jureremais.org',
  defaultOgImage: '/images/og/default.jpg',
  locale: 'pt_BR',
  twitterHandle: '@jureremais',
  keywords: [
    'Jurerê Internacional',
    'Jurerê Mais',
    'segurança',
    'urbanismo',
    'sustentabilidade',
    'Florianópolis',
    'gestão urbana',
    'comunidade',
  ],
}
