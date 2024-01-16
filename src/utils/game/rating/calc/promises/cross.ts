import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingCombination, RatingDataPoint} from '@/types/game/pokemon/rating/result';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {RatingWorkerDataPointCalcReturn} from '@/utils/game/rating/calc/promises/type';
import {GetRatingResultOfCategoryPromisesOpts} from '@/utils/game/rating/calc/type';
import {getRatingValueOfPossibility} from '@/utils/game/rating/possibility';
import {isNotNullish} from '@/utils/type';


type CalculateRatingResultOfCrossSpeciesOpts = RatingWorkerOpts & GetRatingResultOfCategoryPromisesOpts;

export const calculateRatingResultOfCrossSpecies = ({
  currentCombination,
  // Intentional unused property destruction for avoiding incorrect prop usage
  pokemon: currentPokemon,
  ingredients: _,
  ...opts
}: CalculateRatingResultOfCrossSpeciesOpts): RatingWorkerDataPointCalcReturn => {
  const {
    level,
    basis,
    ingredientChainMap,
    pokemonList,
    berryDataMap,
    mainSkillMap,
  } = opts;
  const {nature, subSkill} = currentCombination;

  return [
    new Promise<RatingDataPoint[]>((resolve) => (
      resolve(pokemonList.flatMap((pokemon) => {
        const {ingredientChain, berry, skill} = pokemon;

        if (basis === 'skillTriggerValue' && pokemon.skill !== currentPokemon.skill) {
          return null;
        }

        const chain = ingredientChainMap[ingredientChain];

        const berryData = berryDataMap[berry.id];
        const skillData = mainSkillMap[skill];

        return [...generatePossibleIngredientProductions({
          level,
          chain,
        })].map((ingredients): RatingDataPoint => {
          const combination: RatingCombination = {
            pokemonId: pokemon.id,
            nature,
            subSkill,
            ingredients,
          };

          return {
            value: getRatingValueOfPossibility({
              ...opts,
              combination,
              berryData,
              skillData,
              pokemon,
            }),
            combination,
          };
        });
      }).filter(isNotNullish))
    )),
  ];
};
