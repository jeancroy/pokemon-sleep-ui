import {Production} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {Nullable} from '@/utils/type';


export type TeamMemberProduction = PokemonProduction & {
  total: Production,
  calculatedUserConfig: CalculatedUserConfig,
  level: Nullable<number>,
};
