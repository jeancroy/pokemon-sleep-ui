import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProductionIndividualParams} from '@/types/game/producing/rate/params';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export const pokedexSortExclusion = [
  'dateAdded',
  'level',
  'mainSkillLevel',
] as const;

export type PokedexSortExclusion = typeof pokedexSortExclusion[number];

export const pokemonSortType = [
  'id',
  ...pokedexSortExclusion,
  'berryEnergy',
  'berryCount',
  'ingredientEnergy',
  'ingredientCount',
  'ingredientRate',
  'totalEnergy',
  'friendshipPoint',
  'transferReward',
  'frequencyBase',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'timeToFullPackPrimary',
  'timeToFullPackSecondary',
  'mainSkillTriggerRate',
  'mainSkillDailyCount',
  'mainSkillDailyStrength',
  'mealCoverage',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonSortingRequiredData = ConfigRequiredData & {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  individual: ProductionIndividualParams,
  ingredients: IngredientProduction[],
  dateAdded: number | null,
  calculatedConfigBundle: CalculatedConfigBundle,
};

export type PokemonInfoWithSortingPayload<TExtra> = PokemonSortingRequiredData & {
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = PokemonSortingRequiredData & {
  ingredientMap: IngredientMap,
  berryData: BerryData,
  skillData: MainSkillData,
  recipeLevelData: RecipeLevelData[],
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
