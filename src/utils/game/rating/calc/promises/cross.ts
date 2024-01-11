import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingCombination, RatingDataPoint} from '@/types/game/pokemon/rating/result';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {RatingWorkerDataPointCalcReturn} from '@/utils/game/rating/calc/promises/type';
import {GetRatingResultOfCategoryPromisesOpts} from '@/utils/game/rating/calc/type';
import {getRatingValueOfPossibility} from '@/utils/game/rating/possibility';


type CalculateRatingResultOfCrossSpeciesOpts = RatingWorkerOpts & GetRatingResultOfCategoryPromisesOpts;

export const calculateRatingResultOfCrossSpecies = ({
  currentCombination,
  // Intentional unused property destruction for avoiding incorrect prop usage
  pokemon: _,
  ingredients: __,
  ...opts
}: CalculateRatingResultOfCrossSpeciesOpts): RatingWorkerDataPointCalcReturn => {
  const {
    level,
    ingredientChainMap,
    pokemonList,
    berryDataMap,
    mainSkillMap,
  } = opts;

  return [
    new Promise<RatingDataPoint[]>((resolve) => (
      resolve(pokemonList.flatMap((pokemon) => {
        const {ingredientChain, berry, skill} = pokemon;

        const chain = ingredientChainMap[ingredientChain];

        const berryData = berryDataMap[berry.id];
        const skillData = mainSkillMap[skill];

        return [...generatePossibleIngredientProductions({
          level,
          chain,
        })].map((ingredients) => {
          const combination: RatingCombination = {
            ...currentCombination,
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
      }))
    )),
  ];
};
