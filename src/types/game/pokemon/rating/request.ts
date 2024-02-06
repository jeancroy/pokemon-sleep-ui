import {PokemonOnDeskState} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {FriendshipLevelOfGoldLock, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type RatingOnDeskState = PokemonOnDeskState & {
  snorlaxFavorite: SnorlaxFavorite,
  basis: RatingBasis,
  friendshipLevel: FriendshipLevelOfGoldLock,
};

export type RatingSetupData = Omit<RatingOnDeskState, 'origin'> & {
  bundle: UserSettingsBundle,
};

export type RatingRequest = {
  setup: RatingSetupData,
  timestamp: number,
};

export type RatingOpts = UserSettingsRequiredData & {
  level: number,
  pokemon: PokemonInfo | undefined,
  pokemonList: PokemonInfo[],
  pokemonProducingParams: PokemonProducingParams,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  useNestedWorker: boolean,
};

export type RatingWorkerOpts = RatingSetupData & Omit<RatingOpts, 'pokemon'>;
