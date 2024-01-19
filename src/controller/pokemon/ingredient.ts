import {
  getIngredientChainMap,
  getIngredientChainMapOfIngredient,
  getIngredientChainMapOfLevel,
} from '@/controller/ingredientChain';
import {getPokemonList, getPokemonByBerry, getPokemonByIngredientChain} from '@/controller/pokemon/info';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonIngredientProduction, PokemonIngredientProductionMap} from '@/types/game/pokemon';
import {IngredientLevel, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {isNotNullish} from '@/utils/type';


export const getPokemonIngredientProductionByIngredient = async (
  ingredientId: IngredientId,
): Promise<PokemonIngredientProduction[]> => {
  const [ingredientChainMap, pokemonArray] = await Promise.all([
    getIngredientChainMapOfIngredient(ingredientId),
    getPokemonList(),
  ]);

  return pokemonArray
    .map(({id, ingredientChain}) => {
      const chain = ingredientChainMap[ingredientChain];

      if (!chain) {
        return null;
      }

      return {pokemonId: id, ingredientChainId: ingredientChain};
    })
    .filter(isNotNullish);
};


export const getPokemonIngredientProductionByIngredientIds = async (
  ingredientIds: IngredientId[],
): Promise<PokemonIngredientProductionMap> => {
  const ret: PokemonIngredientProductionMap = {
    1: {},
    30: {},
    60: {},
  };

  if (!ingredientIds.length) {
    return ret;
  }

  const insertDataOfLevel = async (level: IngredientLevel) => {
    const chainMap = await getIngredientChainMapOfLevel(level, ingredientIds);
    const pokemon = await getPokemonByIngredientChain(Object.values(chainMap).map(({chainId}) => chainId));

    for (const {id: pokemonId, ingredientChain} of pokemon) {
      const {ingredients} = chainMap[ingredientChain];

      for (const {id: ingredientId} of ingredients[level]) {
        if (!(ingredientId in ret[level])) {
          ret[level][ingredientId] = [];
        }

        ret[level][ingredientId]?.push({pokemonId, ingredientChainId: ingredientChain});
      }
    }
  };

  await Promise.all(ingredientLevels.map((level) => insertDataOfLevel(level)));

  return ret;
};

export const getPokemonIngredientProductionByBerry = async (
  berryId: BerryId,
): Promise<PokemonIngredientProduction[]> => {
  const [ingredientChainMap, pokemonArray] = await Promise.all([
    getIngredientChainMap(),
    getPokemonByBerry(berryId),
  ]);

  return pokemonArray
    .map(({id, ingredientChain}) => {
      const chain = ingredientChainMap[ingredientChain];

      if (!chain) {
        return null;
      }

      return {pokemonId: id, ingredientChainId: ingredientChain};
    })
    .filter(isNotNullish);
};
