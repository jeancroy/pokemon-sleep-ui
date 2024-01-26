import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {MainSkillTriggerValueIcon} from '@/components/shared/pokemon/mainSkill/icon/trigger';
import {ratingBasisI18nId} from '@/const/game/rating';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


type Props = {
  basis: RatingBasis,
};

export const RatingBasisIcon = ({basis}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex');

  const basisName = t(ratingBasisI18nId[basis]);

  if (basis === 'totalProduction') {
    return <ColoredEnergyIcon alt={basisName} dimension="size-7"/>;
  }

  if (basis === 'ingredientCount') {
    return <GenericIngredientIcon alt={basisName} dimension="size-7"/>;
  }

  if (basis === 'ingredientProduction') {
    return (
      <Flex direction="row" noFullWidth>
        <GenericIngredientIcon alt={basisName} dimension="size-7"/>
        <ColoredEnergyIcon alt={basisName} dimension="size-7"/>
      </Flex>
    );
  }

  if (basis === 'skillTriggerValue') {
    return <MainSkillTriggerValueIcon alt={basisName} dimension="size-7"/>;
  }

  throw new Error(`Unhandled rating icon of basis - ${basis satisfies never}`);
};
