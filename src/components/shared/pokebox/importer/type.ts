import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {PokeInBox} from '@/types/userData/pokebox/main';


export type PokeboxImporterDataProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
};

export type PokeboxImporterCommonProps = PokeboxImporterDataProps & {
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
};

export type PokeInBoxForFilter = Omit<PokeInBox, 'name' | 'pokemon'> & {
  name: string,
  search: string[],
  pokemon: PokemonInfo,
};

export type PokeboxImporterFilter = PokemonInputFilter & {
  name: string,
};
