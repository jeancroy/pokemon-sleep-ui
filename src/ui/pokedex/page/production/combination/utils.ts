import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {
  PokemonProductionCombinationCommonProps,
  PokemonProductionCombinationRateCollection,
  PokemonProductionCombinationRateCollectionItem,
} from '@/ui/pokedex/page/production/combination/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getProductionIndividualParams} from '@/utils/game/producing/params';


type GetPokemonProductionCombinationRateCollectionOpts = PokemonProductionCombinationCommonProps & {
  chain: IngredientChain,
};

export const getPokemonProductionCombinationRateCollection = ({
  chain,
  ...props
}: GetPokemonProductionCombinationRateCollectionOpts): PokemonProductionCombinationRateCollection => {
  const {
    input,
    pokemon,
    calculatedConfigBundle,
    mainSkillMap,
    subSkillMap,
  } = props;

  const skillData = mainSkillMap[pokemon.skill];
  const {level} = input;

  return Object.fromEntries([...generatePossibleIngredientProductions({level, chain})].map((ingredients) => {
    const key = ingredients.map(({id}) => id).join('-');

    return [
      key,
      {
        key,
        ingredients,
        rate: getPokemonProductionSingle({
          ingredients,
          skillData,
          ...getProductionIndividualParams({
            input,
            pokemon,
            subSkillMap,
          }),
          ...calculatedConfigBundle,
          ...props,
        }).atStage.final,
      } satisfies PokemonProductionCombinationRateCollectionItem,
    ];
  }));
};
