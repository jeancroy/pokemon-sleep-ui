import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {Dimension} from '@/types/style';
import {TeamMakerBasis} from '@/ui/team/maker/type/input';


type Props = {
  basis: TeamMakerBasis,
  isActive: boolean,
};

export const TeamMakerBasisOption = ({basis, isActive}: Props) => {
  const t = useTranslations('UI.Common');

  const dimension: Dimension = 'size-6';

  if (basis === 'strength') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <ColoredStrengthIcon alt={t('Strength')} dimension={dimension}/>
        <div>{t('Strength')}</div>
      </Flex>
    );
  }

  if (basis === 'mealCoverage') {
    return (
      <Flex direction="row" className="items-center gap-1">
        <MealCoverageIcon alt={t('MealCoverage')} dimension={dimension} isActive={isActive}/>
        <div>{t('MealCoverage')}</div>
      </Flex>
    );
  }

  throw new Error(`Unhandled team maker basis of ${basis satisfies never}`);
};
