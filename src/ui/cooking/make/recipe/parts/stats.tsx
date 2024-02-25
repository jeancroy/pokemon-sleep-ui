import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';
import {formatInt} from '@/utils/number/format/regular';


export const MealMakerRecipeStats = ({info}: MealMakerRecipePartsProps) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <Flex direction="row" className="items-end justify-between">
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <ColoredStrengthIcon dimension="size-4" alt={t('Energy')}/>
        <div>
          {formatInt(info.strengthFinal)}
        </div>
      </Flex>
      <div>
        +{(info.bonus.total * 100 - 100).toFixed(1)}%
      </div>
    </Flex>
  );
};
