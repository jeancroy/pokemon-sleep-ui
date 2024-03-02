import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {FriendshipLevelOfGoldLock} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {CommonServerDataCollection} from '@/types/website/data/common';


export type RatingOnDeskState = PokemonOnDeskState & {
  snorlaxFavorite: SnorlaxFavorite,
  basis: RatingBasis,
  friendshipLevel: FriendshipLevelOfGoldLock,
};

export type RatingSetupData = Omit<RatingOnDeskState, 'origin'> & {
  bundle: ConfigBundle,
};

export type RatingRequest = {
  setup: RatingSetupData,
  timestamp: number,
};

export type RatingOpts = ConfigRequiredData & Pick<
  CommonServerDataCollection,
  keyof UsePokemonFilterCommonData |
  'berryDataMap' |
  'mainSkillMap' |
  'subSkillMap' |
  'recipeLevelData'
> & {
  level: number,
  pokemon: PokemonInfo | undefined,
  pokemonList: PokemonInfo[],
  pokemonProducingParams: PokemonProducingParams,
  useNestedWorker: boolean,
};

export type RatingWorkerOpts = RatingSetupData & Omit<RatingOpts, 'pokemon'>;
