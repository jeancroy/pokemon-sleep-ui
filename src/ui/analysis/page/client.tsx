'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {useCalculationWorker} from '@/ui/analysis/page/calc/hook';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {useAnalysisFilter} from '@/ui/analysis/page/hook';
import {AnalysisPageInput} from '@/ui/analysis/page/input/main';
import {AnalysisMeta} from '@/ui/analysis/page/meta';
import {AnalysisStatsUI} from '@/ui/analysis/page/stats/main';
import {AnalysisPageServerDataProps} from '@/ui/analysis/page/type';
import {getEffectiveIngredientLevels} from '@/utils/game/ingredient/level';
import {getPokedexWithField} from '@/utils/game/pokemon/sleepStyle';


export const AnalysisPageClient = (props: AnalysisPageServerDataProps) => {
  const {
    pokemonList,
    pokemon,
    sleepStyleMap,
  } = props;
  const serverData = useCommonServerData();
  const {serverConfigBundle} = serverData;

  const [stats, setStats] = React.useState<AnalysisStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const {filter, setFilter, isIncluded} = useAnalysisFilter({
    data: getPokedexWithField({pokemonList, sleepStyleMap}),
    currentPokemon: pokemon,
    ...serverData,
  });
  const ingredients = React.useMemo(() => getEffectiveIngredientLevels(filter.level)
    .map((level) => filter.ingredients[level]), [filter]);

  const {data: session} = useSession();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session?.user.preloaded,
    },
    override: {snorlaxFavorite: filter.snorlaxFavorite},
  });

  useCalculationWorker({
    pokemonToAnalyze: pokemonList.filter(({id}) => isIncluded[id]),
    setStats,
    setLoading,
    calculateDeps: [filter, calculatedConfigBundle],
    ...props,
    ...filter,
    ...serverData,
    calculatedConfigBundle,
    ingredients,
  });

  return (
    <Flex className="gap-1.5">
      <AnalysisMeta {...props} {...serverData}/>
      <AdsUnit hideIfNotBlocked/>
      <AnalysisPageInput
        filter={filter}
        setFilter={setFilter}
        session={session}
        {...props}
        {...serverData}
      />
      <AnalysisStatsUI stats={stats} loading={loading} level={filter.level} {...props}/>
    </Flex>
  );
};
