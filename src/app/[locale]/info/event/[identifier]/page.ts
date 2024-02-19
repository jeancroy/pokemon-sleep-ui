import {getEventInfoList} from '@/controller/event/info';
import {EventIdentifier} from '@/types/game/event/info';
import {GenerateMetadata, GenerateMetadataParams} from '@/types/next/metadata';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {EventPage} from '@/ui/info/event/page/main';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMeta} from '@/utils/meta';


export const generateStaticParams: GenerateStaticParamsFunc<EventPageParams> = async () => {
  return (await getEventInfoList({includePast: true}))
    .map(({eventIdentifier}) => ({identifier: eventIdentifier}));
};

export type EventPageParams = GenerateMetadataParams & {
  identifier: EventIdentifier,
};

export const generateMetadata: GenerateMetadata<EventPageParams> = async ({params}) => {
  const {identifier, locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'Game.EventDetail'});

  // `N/A` to soft-fail metadata generation
  const i18nKey = identifier.split('-').at(0) ?? 'N/A';

  return generatePageMeta({key: 'Info.Event.Page.Title', values: {name: t(i18nKey)}})({params});
};

export default EventPage;
