import {useTranslations} from 'next-intl';

import {SleepdexLookupSortType} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';


export const useSleepdexLookupSortTypeText = (sort: SleepdexLookupSortType) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.SleepStyle');

  if (sort === 'drowsyPowerRequirement') {
    return t2('DrowsyPowerRequirement');
  }

  if (sort === 'spo') {
    return t2('SPO');
  }

  if (sort === 'shards') {
    return t('DreamShards');
  }

  if (sort === 'researchExp') {
    return t('ResearchExp');
  }

  if (sort === 'minSnorlaxRank') {
    return t('SnorlaxRank');
  }

  throw new Error(`Unhandled sleepdex sort type of ${sort satisfies never} for text`);
};
