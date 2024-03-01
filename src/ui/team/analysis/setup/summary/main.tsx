import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {ProductionPeriod} from '@/types/game/producing/display';
import {TeamProduction} from '@/types/teamAnalysis';
import {TeamAnalysisFinalEstimate} from '@/ui/team/analysis/setup/summary/finalEstimate';
import {TeamAnalysisSummaryProductionLayout} from '@/ui/team/analysis/setup/summary/layout';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = Pick<TeamAnalysisDataProps, 'snorlaxData'> & {
  stats: TeamProduction,
  period: ProductionPeriod,
};

export const TeamAnalysisSummary = ({snorlaxData, stats, period}: Props) => {
  const {
    berry,
    ingredient,
    skill,
  } = stats.total;

  const t = useTranslations('UI.Pokemon.Info');

  return (
    <Flex className="info-section-bg items-end justify-end gap-3 rounded-lg p-2 md:flex-row">
      <TeamAnalysisFinalEstimate strengthProduction={stats.overall} snorlaxData={snorlaxData}/>
      <Flex className="items-end gap-1 md:w-fit">
        <TeamAnalysisSummaryProductionLayout
          period={period}
          showQuantity={false}
          rate={berry}
          icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}
        />
        <TeamAnalysisSummaryProductionLayout
          period={period}
          showQuantity={false}
          rate={ingredient}
          icon={<GenericIngredientIcon alt={t('Ingredient')} noWrap/>}
        />
        <PokemonProductionSplit
          specialty={null}
          berry={berry.strength}
          ingredient={ingredient?.strength ?? 0}
          skill={skill.strength}
        />
        <Flex direction="row" noFullWidth className="justify-end">
          <TeamAnalysisSummaryProductionLayout period={period} larger showQuantity={false} rate={stats.overall}/>
        </Flex>
      </Flex>
    </Flex>
  );
};
