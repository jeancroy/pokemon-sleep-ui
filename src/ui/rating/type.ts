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
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type RatingServerDataProps = UsePokemonFilterCommonData & ConfigRequiredData & {
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
  preloaded: ConfigBundle,
};

export type RatingDataProps = RatingServerDataProps & PokemonComplexFilterDataProps & PokemonOnDeskDataProps;
