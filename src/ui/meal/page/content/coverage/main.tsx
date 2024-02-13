import React from 'react';

import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {PremiumOnlyNotice} from '@/components/static/premium/notice';
import {MealContentCoverageList} from '@/ui/meal/page/content/coverage/list';
import {MealContentCoverageCommonProps} from '@/ui/meal/page/content/coverage/type';


export const MealContentCoverage = (props: MealContentCoverageCommonProps) => {
  const {isPremium} = props;

  const t = useTranslations('UI.Common');
  const collapsible = useCollapsibleControl();

  const text = t('MealCoverage');

  return (
    <CollapsibleFull control={collapsible} button={
      <Flex center direction="row" className="gap-1 text-xl">
        <MealCoverageIcon alt={text}/>
        <span>{text}</span>
      </Flex>
    }>
      {isPremium ? <MealContentCoverageList {...props}/> : <PremiumOnlyNotice style="normal"/>}
      <AdsUnit/>
    </CollapsibleFull>
  );
};
