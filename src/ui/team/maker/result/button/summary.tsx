import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {MealCoverageSummary} from '@/components/shared/meal/coverage/summary';
import {TeamMakerBasisValue} from '@/ui/team/maker/type/common';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';
import {formatFloat} from '@/utils/number/format/regular';


type Props = {
  basis: TeamMakerBasis,
  basisValue: TeamMakerBasisValue,
};

export const TeamMakerResultSummary = ({basis, basisValue}: Props) => {
  const t = useTranslations('UI.Common');

  if (basis === 'strength') {
    return (
      <Flex noFullWidth direction="row" className="items-center">
        <ColoredStrengthIcon dimension="size-6" alt={t('Strength')}/>
        <span>{formatFloat(basisValue.strength)}</span>
      </Flex>
    );
  }

  if (basis === 'mealCoverage') {
    return (
      <MealCoverageSummary coverage={basisValue.mealCoverage}/>
    );
  }

  console.error(`Unhandled team maker basis [${basis satisfies never}]`);
};
