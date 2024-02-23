import React from 'react';

import {useWorker} from '@/hooks/worker/main';
import {getTeamProducingStats} from '@/ui/team/analysis/calc/main';
import {GetTeamProductionStatsOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {isProduction} from '@/utils/environment';


export const useTeamProducingStats = ({
  ingredientMap,
  ingredientChainMap,
  mealMap,
  cookingRecoveryData,
  pokedexMap,
  pokemonList,
  pokemonProducingParamsMap,
  berryDataMap,
  mainSkillMap,
  snorlaxData,
  mapMeta,
  recipeLevelData,
  eventStrengthMultiplierData,
  subSkillMap,
  pokemonMaxLevel,
  preloaded,
  data,
  maxEvolutionCount,
  setup,
  bundle,
  currentTeam,
  calculatedCookingConfig,
  overrideLevel,
}: GetTeamProductionStatsOpts) => {
  const [result, setResult] = React.useState<TeamProducingStats>();

  const {work} = useWorker<GetTeamProductionStatsOpts, TeamProducingStats>({
    workerName: 'Team Analysis Worker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => {
    // Explicit to avoid passing unwanted properties
    const opts: GetTeamProductionStatsOpts = {
      ingredientMap,
      ingredientChainMap,
      mealMap,
      cookingRecoveryData,
      pokedexMap,
      pokemonList,
      pokemonProducingParamsMap,
      berryDataMap,
      mainSkillMap,
      snorlaxData,
      mapMeta,
      recipeLevelData,
      eventStrengthMultiplierData,
      subSkillMap,
      pokemonMaxLevel,
      preloaded,
      data,
      maxEvolutionCount,
      setup,
      bundle,
      currentTeam,
      calculatedCookingConfig,
      overrideLevel,
    };

    // Calculate using UI thread under dev environment for easier debug
    if (!isProduction()) {
      setResult(getTeamProducingStats(opts));
      return;
    }

    work(opts);
  }, [data, maxEvolutionCount, setup, bundle, currentTeam, calculatedCookingConfig, overrideLevel]);

  return result;
};
