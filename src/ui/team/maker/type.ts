import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {PokeInBox} from '@/types/userData/pokebox';
import {CommonServerDataCollection} from '@/types/website/data/common';


export type TeamMakerServerDataProps = {
  snorlaxData: SnorlaxDataOfMap[],
  pokemonMaxLevel: number,
};

export type TeamMakerDataProps = TeamMakerServerDataProps & {
  pokeboxList: PokeInBox[],
};

export type TeamMakerCalcDataProps = TeamMakerDataProps & Pick<
  CommonServerDataCollection,
  keyof ConfigRequiredData |
  keyof UsePokemonFilterCommonData |
  'pokedexMap' |
  'pokemonProducingParamsMap' |
  'berryDataMap' |
  'mainSkillMap' |
  'subSkillMap' |
  'recipeLevelData'
> & {
  maxRecipeLevel: number,
};
