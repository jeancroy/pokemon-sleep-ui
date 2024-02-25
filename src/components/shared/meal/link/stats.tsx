import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {formatMealStrengthInfo} from '@/utils/game/meal/format';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  strengthInfo: MealStrengthInfo,
};

export const MealLinkStats = ({strengthInfo}: Props) => {
  const t = useTranslations('UI.Common');

  return (
    <Flex>
      <Flex direction="row" className="gap-0.5">
        <ChevronUpIcon className="size-3.5"/>
        <span>+{formatInt(strengthInfo.recipeBonusPercent)}%</span>
        <span>(+{formatInt(strengthInfo.bonus.total * 100 - 100)}%)</span>
      </Flex>
      <Flex direction="row" noFullWidth className="items-center gap-0.5 whitespace-nowrap">
        <ColoredStrengthIcon dimension="size-3.5" alt={t('Strength')}/>
        <span>
          {formatMealStrengthInfo({info: strengthInfo})}
        </span>
        {
          strengthInfo.level &&
          <>
            <span>@</span>
            <span>Lv.{strengthInfo.level}</span>
          </>
        }
      </Flex>
    </Flex>
  );
};
