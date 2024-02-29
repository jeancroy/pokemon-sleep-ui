import React from 'react';

import {useWorker} from '@/hooks/worker/main';
import {ProductionComparisonPresetProduction} from '@/types/productionComparison';
import {getProductionComparisonPresetStats} from '@/ui/production/calc/main';
import {GetProductionComparisonTargetStatsOpts} from '@/ui/production/calc/type';
import {isProduction} from '@/utils/environment';
import {Nullable} from '@/utils/type';


export const useProductionComparisonPresetStats = ({
  pokedexMap,
  berryDataMap,
  ingredientMap,
  pokemonProducingParamsMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  recipeLevelData,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  bundle,
  calculatedCookingConfig,
  currentPreset,
  overrideLevel,
}: GetProductionComparisonTargetStatsOpts): Nullable<ProductionComparisonPresetProduction> => {
  const [result, setResult] = React.useState<ProductionComparisonPresetProduction>();

  const {work} = useWorker<GetProductionComparisonTargetStatsOpts, ProductionComparisonPresetProduction>({
    workerName: 'Production Comparison Worker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => {
    // Explicit to avoid passing unwanted properties
    const opts: GetProductionComparisonTargetStatsOpts = {
      pokedexMap,
      berryDataMap,
      ingredientMap,
      pokemonProducingParamsMap,
      mainSkillMap,
      subSkillMap,
      mealMap,
      recipeLevelData,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      bundle,
      calculatedCookingConfig,
      currentPreset,
      overrideLevel,
    };

    // Calculate using UI thread under dev environment for easier debug
    if (!isProduction()) {
      setResult(getProductionComparisonPresetStats(opts));
      return;
    }

    work(opts);
  }, [bundle, calculatedCookingConfig, currentPreset, overrideLevel]);

  return result;
};
