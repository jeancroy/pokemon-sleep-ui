import {defaultLocale} from '@/const/website';
import {Manifest} from '@/types/next/manifest';
import {generateSiteMetadata} from '@/utils/metadata';


export const generateSiteManifest = async (): Promise<Manifest> => {
  const {
    name,
    shortName,
    metadataBase,
    description,
    shortcuts,
  } = await generateSiteMetadata({
    locale: defaultLocale,
  });

  return {
    start_url: metadataBase?.origin ?? undefined,
    id: 'pks.raenonx.cc',
    name,
    short_name: shortName,
    description,
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#2a97d7',
    scope: '/',
    categories: ['productivity', 'utilities'],
    shortcuts,
    display_override: ['window-controls-overlay', 'standalone', 'browser'],
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-150x150.png',
        sizes: '150x150',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-150x150.png',
        sizes: '150x150',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/images/theme/absol-smug-750x1334.png',
        sizes: '750x1334',
        type: 'image/png',
      },
      {
        src: '/images/theme/absol-smug-1280x800.png',
        sizes: '1280x800',
        type: 'image/png',
      },
    ],
  };
};
