import {Session} from 'next-auth';

import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {BerryDataMap} from '@/types/game/berry';
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
  session: Session | null,
  pokemonList: PokemonInfo[],
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  preloaded: {
    bundle: UserSettingsBundle,
  },
};

export type PokedexCalcResult = {
  translatedSettings: TranslatedUserSettings,
  result: SortedPokemonInfo<null, PokemonInfoWithSortingPayload<null>>[],
  count: {
    selected: number,
    total: number,
  },
};
