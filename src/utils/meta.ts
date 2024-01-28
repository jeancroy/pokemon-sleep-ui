import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {
  GenerateMetadata,
  GeneratePageMetaValues,
} from '@/types/next/metadata';
import {generateSiteMetadata} from '@/utils/metadata';


export type GeneratePageMetaOpts = {
  key: I18nMessageKeysOfNamespace<'UI.Metadata'>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({
  key,
  values,
}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const {
    name,
    nameTemplate,
    description,
    metadataBase,
    keywords,
    languages,
  } = await generateSiteMetadata({key, values, locale});

  return {
    metadataBase,
    alternates: {
      canonical: '/',
      languages,
    },
    applicationName: name,
    title: name,
    description,
    authors: [
      {
        name: 'RaenonX',
        url: 'https://github.com/RaenonX',
      },
      {
        name: 'John Mitchell-Grant',
        url: 'https://github.com/johnmgrant',
      },
    ],
    creator: 'RaenonX',
    appleWebApp: {
      capable: true,
      title: name,
      statusBarStyle: 'black',
      startupImage: '/images/theme/absol-smug-750x1334.png',
    },
    twitter: {
      card: 'summary',
      title: {
        default: name,
        template: nameTemplate,
      },
      description,
    },
    generator: 'Next.js',
    manifest: '/manifest.webmanifest',
    keywords,
    icons: {
      icon: [
        {
          url: '/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          url: '/icons/icon-150x150.png',
          sizes: '150x150',
          type: 'image/png',
        },
        {
          url: '/icons/icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
        {
          url: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      shortcut: '/favicon.ico',
      apple: [
        {
          url: '/icons/icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    formatDetection: {
      url: true,
      date: true,
      email: true,
      address: false,
      telephone: false,
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#aa97d7',
      'msapplication-tap-highlight': 'no',
      'msapplication-TileImage': '/icons/icon-150x150.png',
    },
  };
};

type generatePageMetaFromStringOpts = {
  t: (key: I18nMessageKeysOfNamespace<'UI.Metadata'>) => string,
  title: string,
};

export const generatePageMetaFromString = ({
  t,
  title,
}: generatePageMetaFromStringOpts) => {
  return {
    title: `${title} | ${t('Site.Name')}`,
    description: t('Site.Description'),
  };
};
