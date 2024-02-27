import React from 'react';

import {useWorker} from '@/hooks/worker/main';
import {TeamProduction} from '@/types/teamAnalysis';
import {getTeamProduction} from '@/ui/team/analysis/calc/main';
import {GetTeamProductionOpts} from '@/ui/team/analysis/calc/type';
import {isProduction} from '@/utils/environment';


export const useTeamProduction = ({
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
}: GetTeamProductionOpts) => {
  const [result, setResult] = React.useState<TeamProduction>();

  const {work} = useWorker<GetTeamProductionOpts, TeamProduction>({
    workerName: 'Team Analysis Worker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => {
    // Explicit to avoid passing unwanted properties
    const opts: GetTeamProductionOpts = {
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
      setResult(getTeamProduction(opts));
      return;
    }

    work(opts);
  }, [data, maxEvolutionCount, setup, bundle, currentTeam, calculatedCookingConfig, overrideLevel]);

  return result;
};
