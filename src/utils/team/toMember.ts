import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {ToTeamAnalysisMemberNullableData} from '@/utils/team/type';
import {Nullable} from '@/utils/type';


export const toTeamAnalysisMember = ({
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
  evolutionCount,
  seeds,
}: PokeInBox): TeamAnalysisMember => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
    evolutionCount,
    seeds,
  };
};

type ToTeamAnalysisMemberNullableOpts = ToTeamAnalysisMemberNullableData & {
  pokeInBox: Nullable<PokeInBox>,
};

export const toTeamAnalysisMemberNullable = ({
  pokedexMap,
  ingredientChainMap,
  pokeInBox,
}: ToTeamAnalysisMemberNullableOpts): TeamAnalysisMember | null => {
  if (!pokeInBox) {
    return null;
  }

  const pokemon = pokedexMap[pokeInBox.pokemon];

  if (!pokemon) {
    return null;
  }

  const migratedPokeInBox = migrate({
    original: generateNewPokeInBox({pokemon, ingredientChainMap}),
    override: pokeInBox,
    migrators: pokeInBoxMigrators,
    migrateParams: {},
  });

  return toTeamAnalysisMember(migratedPokeInBox);
};
