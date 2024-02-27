import {TeamMemberData} from '@/types/game/team/member';
import {PokeInBox} from '@/types/userData/pokebox';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {ToTeamMemberNullableData} from '@/utils/team/type';
import {Nullable} from '@/utils/type';


export const toTeamMemberFromPokeInBox = ({
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

type ToTeamMemberFromPokeInBoxNullableOpts = ToTeamMemberNullableData & {
  pokeInBox: Nullable<PokeInBox>,
};

export const toTeamMemberFromPokeInBoxNullable = ({
  pokedexMap,
  ingredientChainMap,
  pokeInBox,
}: ToTeamMemberFromPokeInBoxNullableOpts): TeamMemberData | null => {
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

  return toTeamMemberFromPokeInBox(migratedPokeInBox);
};
