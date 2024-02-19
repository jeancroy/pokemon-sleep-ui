import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {ProducingRateImplicitParams, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking/calculated';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export const pokedexSortExclusion = [
  'dateAdded',
  'level',
  'mainSkillLevel',
] as const;

export type PokedexSortExclusion = typeof pokedexSortExclusion[number];

export const pokemonSortTypeOfSkillValue = [
  'mainSkillValue',
  'mainSkillTriggerValue',
] as const;

export type PokemonSortTypeOfSkillValue = typeof pokemonSortTypeOfSkillValue[number];

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
  ...pokemonSortTypeOfSkillValue,
  'mainSkillTriggerRate',
  'mainSkillDailyCount',
  'mainSkillDailyStrength',
  'mealCoverage',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonSortingRequiredData = ProducingRateImplicitParams & UserSettingsRequiredData & {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  level: number,
  ingredients: IngredientProduction[],
  dateAdded: number | null,
  bundle: UserSettingsBundle,
  calculatedCookingSettings: CalculatedCookingSettings,
};

export type PokemonInfoWithSortingPayload<TExtra> = PokemonSortingRequiredData & ProducingRateSingleParams & {
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = PokemonSortingRequiredData & ProducingRateSingleParams & {
  ingredientMap: IngredientMap,
  berryData: BerryData,
  skillData: MainSkillData | undefined,
  recipeLevelData: RecipeLevelData[],
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;
