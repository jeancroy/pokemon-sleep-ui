import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
  getPokemonRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';
import {getTotalEnergyOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'friendshipPoint',
];

export const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  level: ({level}) => level,
  dateAdded: ({dateAdded}) => dateAdded ?? 0,
  ingredientEnergy: (opts) => getIngredientTotalRateSorter({key: 'energy', opts}),
  ingredientCount: (opts) => getIngredientTotalRateSorter({key: 'quantity', opts}),
  ingredientRate: ({pokemonProducingParams}) => pokemonProducingParams.ingredientSplit,
  berryEnergy: (opts) => getBerryRateSorter({key: 'energy', opts}),
  berryCount: (opts) => getBerryRateSorter({key: 'quantity', opts}),
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
    getPokemonRateSorter(opts).fullPackStats.secondsToFull.primary ?? Infinity
  ),
  timeToFullPackSecondary: (opts) => (
    getPokemonRateSorter(opts).fullPackStats.secondsToFull.secondary ?? Infinity
  ),
  totalEnergy: (opts) => getTotalEnergyOfPokemonProducingRate(getPokemonRateSorter(opts),
  ),
  mainSkillLevel: ({seeds, ...opts}) => getMainSkillLevel({
    seedsUsed: seeds.gold,
    ...opts,
  }),
  mainSkillValue: ({pokemonProducingParams}) => pokemonProducingParams.skillValue,
  mainSkillTriggerValue: (opts) => {
    const {pokemonProducingParams} = opts;

    return getSkillTriggerValue({
      ...opts,
      rate: getPokemonRateSorter(opts),
      skillValue: pokemonProducingParams.skillValue,
    });
  },
  mainSkillTriggerRate: ({pokemonProducingParams}) => pokemonProducingParams.skillPercent ?? 0,
  mainSkillDailyCount: (opts) => getPokemonRateSorter(opts).skill.quantity.equivalent,
  mainSkillDailyStrength: (opts) => getPokemonRateSorter(opts).skill.energy.equivalent,
};
