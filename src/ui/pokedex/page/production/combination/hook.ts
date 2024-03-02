import {useCommonServerData} from '@/contexts/data/common/hook';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {
  PokemonProductionCombinationCommonProps,
  PokemonProductionCombinationRateCollection,
  PokemonProductionCombinationRateCollectionItem,
} from '@/ui/pokedex/page/production/combination/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getProductionIndividualParams} from '@/utils/game/producing/params';


type UsePokemonProductionCombinationRateCollectionOpts = PokemonProductionCombinationCommonProps & {
  chain: IngredientChain,
};

export const usePokemonProductionCombinationRateCollection = ({
  chain,
  ...props
}: UsePokemonProductionCombinationRateCollectionOpts): PokemonProductionCombinationRateCollection => {
  const {
    input,
    pokemon,
    calculatedConfigBundle,
  } = props;

  const serverData = useCommonServerData();
  const {mainSkillMap, subSkillMap} = serverData;

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
          individual: getProductionIndividualParams({
            input,
            pokemon,
            subSkillMap,
          }),
          ...calculatedConfigBundle,
          ...props,
          ...serverData,
        }).atStage.final,
      } satisfies PokemonProductionCombinationRateCollectionItem,
    ];
  }));
};
