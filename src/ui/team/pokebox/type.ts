import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxDataProps = UsePokemonFilterCommonData & ConfigRequiredData & {
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  pokemonMaxLevel: number,
  preloaded: {
    bundle: ConfigBundle,
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};

export type PokeboxCommonProps = PokeboxDataProps & {
  berryDataMap: BerryDataMap,
  mapMeta: FieldMetaMap,
};
