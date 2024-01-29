import React from 'react';

import {useWorker} from '@/hooks/worker/main';
import {GetTeamProducingStatsOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';


export const useTeamProducingStats = ({
  ingredientMap,
  ingredientChainMap,
  mealMap,
  cookingRecoveryData,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  mainSkillMap,
  snorlaxData,
  mapMeta,
  subSkillMap,
  pokemonMaxLevel,
  preloaded,
  data,
  maxEvolutionCount,
  setup,
  bundle,
  currentTeam,
  cookingSettings,
  overrideLevel,
}: GetTeamProducingStatsOpts) => {
  const [result, setResult] = React.useState<TeamProducingStats>();

  const {work} = useWorker<GetTeamProducingStatsOpts, TeamProducingStats>({
    workerName: 'Team Analysis Worker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => {
    // Explicit to avoid passing unwanted properties
    work({
      ingredientMap,
      ingredientChainMap,
      mealMap,
      cookingRecoveryData,
      pokedexMap,
      pokemonProducingParamsMap,
      berryDataMap,
      mainSkillMap,
      snorlaxData,
      mapMeta,
      subSkillMap,
      pokemonMaxLevel,
      preloaded,
      data,
      maxEvolutionCount,
      setup,
      bundle,
      currentTeam,
      cookingSettings,
      overrideLevel,
    });
  }, [data, maxEvolutionCount, setup, bundle, currentTeam, cookingSettings, overrideLevel]);

  return result;
};
