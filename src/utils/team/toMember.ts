import {TeamMemberData} from '@/types/game/team';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {ToTeamAnalysisMemberNullableData} from '@/utils/team/type';
import {Nullable} from '@/utils/type';


export const toTeamMember = ({
  uuid,
  name,
  level,
  pokemon,
  nature,
  subSkill,
  ingredients,
  evolutionCount,
  seeds,
}: PokeInBox): TeamMemberData => {
  return {
    name,
    level,
    pokemonId: pokemon,
    nature,
    subSkill,
    ingredients,
    evolutionCount,
    seeds,
    linkedPokeInBoxUuid: uuid,
  };
};

type ToTeamAnalysisMemberNullableOpts = ToTeamAnalysisMemberNullableData & {
  pokeInBox: Nullable<PokeInBox>,
};

export const toTeamMemberNullable = ({
  pokedexMap,
  ingredientChainMap,
  pokeInBox,
}: ToTeamAnalysisMemberNullableOpts): TeamMemberData | null => {
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

  return toTeamMember(migratedPokeInBox);
};
