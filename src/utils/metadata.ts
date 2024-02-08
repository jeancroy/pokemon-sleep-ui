import {defaultLocale} from '@/const/website';
import {locales, Locale} from '@/types/next/locale';
import {SiteMetadata} from '@/types/next/manifest';
import {getI18nTranslator} from '@/utils/i18n';
import {GeneratePageMetaOpts} from '@/utils/meta';


type GenerateSiteMetadataOpts = {
  key?: GeneratePageMetaOpts['key'],
  values?: GeneratePageMetaOpts['values'],
  locale?: Locale,
};

export const generateSiteMetadata = ({
  key = 'Home.Title',
  values,
  locale = defaultLocale,
}: GenerateSiteMetadataOpts): Promise<SiteMetadata> => getI18nTranslator({
  locale, namespace: 'UI.Metadata',
}).then((t) => ({
  name: `${t(key, values)} | ${t('Site.Name')}`,
  nameTemplate: '%s - PWA',
  metadataBase: process.env.NEXTAUTH_URL ?
    new URL(process.env.NEXTAUTH_URL) :
    undefined,
  shortName: 'PKS by RaenonX',
  description: t('Site.Description'),
  keywords: [
    'Pokémon',
    t('Site.Keywords.Pokemon'),
    t('Site.Keywords.PokemonSleep'),
    t('Site.Keywords.PokemonSleepGuide'),
  ],
  shortcuts: [
    {
      name: t('Home.Title'),
      url: '/home',
    },
    {
      name: t('Rating.Title'),
      url: '/rating',
    },
    {
      name: t('Team.Index.Title'),
      url: '/team',
    },
    {
      name: t('Pokedex.Main.Index.Title'),
      url: '/pokedex',
    },
    {
      name: t('About.Title'),
      url: '/about',
    },
  ],
  languages: locales.reduce((obj, _locale) => ({
    ...obj,
    [_locale]: `/${_locale}`,
  }), {}) as SiteMetadata['languages'],
}));
