import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
  getPokemonRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {getMealCoverage} from '@/utils/game/cooking';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
];

export const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  level: ({level}) => level,
  dateAdded: ({dateAdded}) => dateAdded ?? 0,
  ingredientEnergy: (opts) => getIngredientTotalRateSorter({key: 'strength', opts}),
  ingredientCount: (opts) => getIngredientTotalRateSorter({key: 'qty', opts}),
  ingredientRate: ({pokemonProducingParams}) => pokemonProducingParams.ingredientSplit,
  berryEnergy: (opts) => getBerryRateSorter({key: 'strength', opts}),
  berryCount: (opts) => getBerryRateSorter({key: 'qty', opts}),
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  transferReward: ({pokemon}) => pokemon.stats.transfer.candy,
  frequencyBase: ({pokemon}) => pokemon.stats.frequency,
  frequency: (opts) => getFrequencyOfStateFromPokemonRate({
    state: 'equivalent',
    rate: getPokemonRateSorter(opts),
  }),
  frequencyOfBerry: (opts) => getBerryRateSorter({key: 'frequency', opts}),
  frequencyOfIngredient: (opts) => getIngredientFirstRateSorter({key: 'frequency', opts}),
  timeToFullPackPrimary: (opts) => (
    getPokemonRateSorter(opts).fullPackStats.bySleep.primary?.duration.vacant ?? Infinity
  ),
  timeToFullPackSecondary: (opts) => (
    getPokemonRateSorter(opts).fullPackStats.bySleep.secondary?.duration.vacant ?? Infinity
  ),
  totalEnergy: (opts) => getTotalStrengthOfPokemonProduction(getPokemonRateSorter(opts)),
  mainSkillLevel: ({seeds, ...opts}) => getMainSkillLevel({
    seedsUsed: seeds.gold,
    ...opts,
  }),
  mainSkillTriggerRate: ({pokemonProducingParams}) => pokemonProducingParams.skillPercent ?? 0,
  mainSkillDailyCount: (opts) => getPokemonRateSorter(opts).skill.qty.equivalent,
  mainSkillDailyStrength: (opts) => getPokemonRateSorter(opts).skill.strength.equivalent,
  mealCoverage: (opts) => {
    const {calculatedCookingConfig} = opts.calculatedConfigBundle;

    return getMealCoverage({
      meals: calculatedCookingConfig.targetMeals,
      ingredientProduction: toIngredientProductionCounterFromPokemonRate({
        pokemonRate: getPokemonRateSorter(opts),
        state: 'equivalent',
      }),
      period: 'daily',
    }).total;
  },
};
