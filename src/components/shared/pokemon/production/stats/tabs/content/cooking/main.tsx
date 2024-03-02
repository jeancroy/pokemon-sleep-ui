import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {
  PokemonDetailedProductionTabLayout,
} from '@/components/shared/pokemon/production/stats/tabs/content/common/layout';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {formatFloat3} from '@/utils/number/format/regular';


export const PokemonDetailedProductionCooking = ({metadata}: PokemonDetailedProductionProps) => {
  const {override, defaultValue} = metadata.ingredientMultiplier;

  const {ingredientIds} = useCommonServerData();
  const t = useTranslations('UI.Component.PokemonDetailedProduction.Cooking');

  return (
    <PokemonDetailedProductionTabLayout>
      <Flex className="info-section">
        <div className="text-left text-lg">{t('IngredientMultiplier')}</div>
        <IngredientIcons
          ingredients={[ingredientIds.map((id) => ({id, qty: override[id] ?? defaultValue}))]}
          dimension="size-6"
          formatQty={(qty) => `${formatFloat3(qty)}x`}
          classOfText="text-base"
          classOfGap="gap-2"
          getMark={({qty}) => qty > 1 ? 'green' : 'gray'}
          wrapAll
          wrapItem={false}
        />
      </Flex>
    </PokemonDetailedProductionTabLayout>
  );
};
