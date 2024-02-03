import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {
  CookingUserSettingsRequiredData,
  TranslatedUserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings';


export type PokedexCalcDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokemonList: PokemonInfo[],
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: {
    bundle: UserSettingsBundle,
  },
};

export type PokedexCalcResultEntry = SortedPokemonInfo<null, PokemonInfoWithSortingPayload<null>>;

export type PokedexCalcResult = {
  translatedSettings: TranslatedUserSettings,
  result: PokedexCalcResultEntry[],
  count: {
    selected: number,
    total: number,
  },
};
