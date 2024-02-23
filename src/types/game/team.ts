import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {Production} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
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
  linkedPokeInBoxUuid: string | null,
};

export type TeamMemberProduction = PokemonProduction & {
  total: Production,
  calculatedUserConfig: CalculatedUserConfig,
  level: Nullable<number>,
};
