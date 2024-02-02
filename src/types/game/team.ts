import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {PokemonProducingRate, ProducingRate} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {Nullable} from '@/utils/type';


// Changing the typing of this requires migrating `TeamAnalysisComp` and any other reference of this type
export type TeamConfig = {
  uuid: string,
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  analysisPeriod: ProductionPeriod,
};

export type TeamMemberData = PokemonConfigPokemonData & {
  name?: string | null,
  alwaysFullPack?: boolean | null,
};

export type TeamMemberProduction = PokemonProducingRate & {
  total: ProducingRate,
  calculatedSettings: CalculatedUserSettings,
  level: Nullable<number>,
};