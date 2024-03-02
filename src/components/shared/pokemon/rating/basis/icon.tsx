import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {ratingBasisNameI18nId} from '@/const/game/rating/i18n';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


type Props = {
  basis: RatingBasis,
};

export const RatingBasisIcon = ({basis}: Props) => {
  const t = useTranslations('UI.Rating.Basis');

  const basisName = t(ratingBasisNameI18nId[basis]);

  if (basis === 'totalStrength') {
    return <ColoredStrengthIcon alt={basisName} dimension="size-7"/>;
  }

  if (basis === 'ingredientProduction') {
    return (
      <Flex direction="row" noFullWidth>
        <GenericIngredientIcon alt={basisName} dimension="size-7"/>
        <ColoredStrengthIcon alt={basisName} dimension="size-7"/>
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
