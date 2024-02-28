import {ProductionComparisonPresetProduction} from '@/types/productionComparison';
import {getProductionComparisonTargetStats} from '@/ui/production/calc/target';
import {GetProductionComparisonTargetStatsOpts} from '@/ui/production/calc/type';
import {isNotNullish} from '@/utils/type';


export const getProductionComparisonPresetStats = ({
  pokedexMap,
  currentPreset,
  overrideLevel,
  ...opts
}: GetProductionComparisonTargetStatsOpts): ProductionComparisonPresetProduction => {
  return Object.fromEntries(Object.values(currentPreset.members).map((target) => {
    const pokemon = pokedexMap[target.pokemonId];
    if (!pokemon) {
      return null;
    }

    return [
      target.uuid,
      getProductionComparisonTargetStats({
        ...opts,
        pokemon,
        target,
      }),
    ];
  }).filter(isNotNullish));
};
