import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskDataProps} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {UserSettingsBundle} from '@/types/userData/settings/main';


export type RatingServerDataProps = UsePokemonFilterCommonData & CookingUserSettingsRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  mapMeta: FieldMetaMap,
  recipeLevelData: RecipeLevelData[],
  pokemonMaxLevel: number,
  ocrTranslations: OcrTranslationsForPokemonInfo,
  preloaded: UserSettingsBundle,
};

export type RatingDataProps = RatingServerDataProps & PokemonComplexFilterDataProps & PokemonOnDeskDataProps;
