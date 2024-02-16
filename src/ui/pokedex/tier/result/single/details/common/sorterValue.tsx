import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {PokedexTierListBasis} from '@/ui/pokedex/tier/input/type';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';


type Props = {
  basis: PokedexTierListBasis,
  value: number,
};

export const PokedexTierListSorterValue = ({basis, value}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  if (basis === 'totalEnergy') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <ColoredEnergyIcon alt={t('Sort.TotalEnergy')}/>
        <span>{formatFloat(value)}</span>
      </Flex>
    );
  }

  if (basis === 'ingredientEnergy') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <EnergyIcon alt={t('Sort.IngredientEnergy')}/>
        <span>{formatFloat(value)}</span>
      </Flex>
    );
  }

  if (basis === 'mainSkillTriggerRate') {
    return (
      <Flex direction="row" center noFullWidth className="gap-0.5">
        <MainSkillTriggerValueIcon alt={t('Stats.MainSkillTriggerRate')}/>
        <span>{formatFloat3(value)}%</span>
      </Flex>
    );
  }

  throw new Error(`Unhandled Pokedex tier list sort basis [${basis satisfies never}] for entry detail`);
};
