import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {GenericMainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/generic';
import {ratingBasisNameI18nId} from '@/const/game/rating';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


type Props = {
  basis: RatingBasis,
};

export const RatingBasisIcon = ({basis}: Props) => {
  const t = useTranslations('UI.Rating.Basis');

  const basisName = t(ratingBasisNameI18nId[basis]);

  if (basis === 'totalStrength') {
    return <ColoredEnergyIcon alt={basisName} dimension="size-7"/>;
  }

  if (basis === 'ingredientProduction') {
    return (
      <Flex direction="row" noFullWidth>
        <GenericIngredientIcon alt={basisName} dimension="size-7"/>
        <ColoredEnergyIcon alt={basisName} dimension="size-7"/>
      </Flex>
    );
  }

  if (basis === 'mealCoverage') {
    return <MealCoverageIcon alt={basisName} dimension="size-7"/>;
  }

  if (basis === 'mainSkillTriggerCount') {
    return <GenericMainSkillIcon alt={basisName} dimension="size-7"/>;
  }

  throw new Error(`Unhandled rating icon of basis [${basis satisfies never}]`);
};
