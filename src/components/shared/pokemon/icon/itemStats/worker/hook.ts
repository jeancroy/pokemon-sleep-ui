import React from 'react';

import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonItemStatsWorkerOpts} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useWorker} from '@/hooks/worker/main';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';


type UsePokemonProducingStatsWorkerOpts = {
  input: PokemonIndividualParams,
  calculatedConfigBundle: CalculatedConfigBundle,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  setLoading?: (loading: boolean) => void,
};

export const usePokemonProducingStats = ({setLoading, ...opts}: UsePokemonProducingStatsWorkerOpts) => {
  const {
    input,
    pokemonIngredientProduction,
    calculatedConfigBundle,
  } = opts;

  const {
    pokedexMap,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mealMap,
    mainSkillMap,
    subSkillMap,
    recipeLevelData,
    eventStrengthMultiplierData,
    cookingRecoveryData,
  } = useCommonServerData();

  const [
    producingStats,
    setProducingStats,
  ] = React.useState<PokemonItemStatsCalcResult[]>([]);

  const {work} = useWorker<PokemonItemStatsWorkerOpts, PokemonItemStatsCalcResult[]>({
    workerName: 'Pokemon Stats Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      if (setLoading) {
        setLoading(false);
      }

      setProducingStats(result);
    },
    onError: () => {
      if (setLoading) {
        setLoading(false);
      }
    },
  });

  const calculate = () => {
    // Explicit to avoid copying unwanted properties
    work({
      pokedexMap,
      pokemonProducingParamsMap,
      pokemonIngredientProduction,
      berryDataMap,
      ingredientMap,
      ingredientChainMap,
      mainSkillMap,
      subSkillMap,
      recipeLevelData,
      mealMap,
      eventStrengthMultiplierData,
      cookingRecoveryData,
      input,
      calculatedConfigBundle,
    });
    if (setLoading) {
      setLoading(true);
    }
  };

  React.useEffect(() => {
    calculate();
  }, [input, calculatedConfigBundle, pokemonIngredientProduction]);

  return producingStats;
};
