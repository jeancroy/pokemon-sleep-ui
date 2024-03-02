import {Session} from 'next-auth';

import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {MealTypeId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {PotInfo} from '@/types/game/potInfo';
import {SleepMapId} from '@/types/game/sleepStyle';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type CommonServerDataCollection = ConfigRequiredData & UsePokemonFilterCommonData & {
  serverSession: Session | null,
  serverConfigBundle: ConfigBundle,
  pokedexMap: PokedexMap,
  berryDataMap: BerryDataMap,
  ingredientIds: IngredientId[],
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  fieldMetaMap: FieldMetaMap,
  potInfoList: PotInfo[],
  recipeLevelData: RecipeLevelData[],
  mapIds: SleepMapId[],
  mealTypes: MealTypeId[],
  maxMapBonusPercent: number,
  pokemonMaxLevel: number,
};
