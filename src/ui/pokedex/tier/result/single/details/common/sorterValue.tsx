import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {StrengthIcon} from '@/components/shared/icon/strength';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {PokedexTierListBasis} from '@/ui/pokedex/tier/input/type';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';


type Props = {
  basis: PokedexTierListBasis,
  value: number,
};

export const PokedexTierListSorterValue = ({basis, value}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const text = t(sortTypeToI18nId[basis]);

  if (basis === 'totalEnergy') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <ColoredStrengthIcon alt={text}/>
        <span>{formatFloat(value)}</span>
      </Flex>
    );
  }

  if (basis === 'ingredientEnergy') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <StrengthIcon alt={text}/>
        <span>{formatFloat(value)}</span>
      </Flex>
    );
  }

  if (basis === 'mainSkillDailyCount') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <GenericMainSkillIcon alt={text}/>
        <span>{formatFloat3(value)}x</span>
      </Flex>
    );
  }

  throw new Error(`Unhandled Pokedex tier list sort basis [${basis satisfies never}] for entry detail`);
};
