import React from 'react';

import {useCommonServerData} from '@/contexts/data/common/hook';
import {useWorker} from '@/hooks/worker/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {AnalysisStats, GetAnalysisStatsPreCalcOpts, GetAnalysisStatsWorkerOpts} from '@/ui/analysis/page/calc/type';


type UseCalculationWorkerOpts = GetAnalysisStatsPreCalcOpts & {
  pokemonToAnalyze: PokemonInfo[],
  setStats: (stats: AnalysisStats) => void,
  setLoading: (loading: boolean) => void,
  calculateDeps: React.DependencyList,
};

export const useCalculationWorker = ({
  pokemon,
  sleepStyleMap,
  calculatedConfigBundle,
  level,
  subSkill,
  nature,
  ingredients,
  snorlaxFavorite,
  pokemonToAnalyze,
  setStats,
  setLoading,
  calculateDeps,
}: UseCalculationWorkerOpts) => {
  const {
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    cookingRecoveryData,
    eventStrengthMultiplierData,
    recipeLevelData,
    pokemonMaxLevel,
  } = useCommonServerData();

  const {work} = useWorker<GetAnalysisStatsWorkerOpts, AnalysisStats>({
    workerName: 'Analysis Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setStats(result);
    },
    onError: () => setLoading(false),
  });

  const requestStats = () => {
    work({
      pokemon,
      pokemonProducingParamsMap,
      berryDataMap,
      ingredientMap,
      ingredientChainMap,
      mainSkillMap,
      subSkillMap,
      sleepStyleMap,
      mealMap,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      recipeLevelData,
      pokemonMaxLevel,
      calculatedConfigBundle,
      level,
      subSkill,
      nature,
      ingredients,
      pokemonList: pokemonToAnalyze,
      snorlaxFavorite,
    });
    setLoading(true);
  };

  React.useEffect(() => {
    requestStats();
  }, calculateDeps);
};
