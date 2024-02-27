import {defaultSeedUsage} from '@/const/game/seed';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {TeamMemberData} from '@/types/game/team/member';
import {PokeInBox} from '@/types/userData/pokebox';
import {generateNewPokeInBox} from '@/ui/team/pokebox/utils';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution/count';
import {generateDefaultIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';
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

type ToTeamMemberDataFromVanillaOpts = {
  pokemon: PokemonInfo,
  chain: IngredientChain,
};

export const toTeamMemberDataFromVanilla = ({
  pokemon,
  chain,
}: ToTeamMemberDataFromVanillaOpts): TeamMemberData => {
  return {
    pokemonId: pokemon.id,
    level: 1,
    nature: null,
    subSkill: {},
    ingredients: generateDefaultIngredientProductionAtLevels(chain),
    evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
    seeds: defaultSeedUsage,
    linkedPokeInBoxUuid: null,
  };
};
