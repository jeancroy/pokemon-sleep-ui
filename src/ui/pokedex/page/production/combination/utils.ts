import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {
  PokemonProductionCombinationCommonProps,
  PokemonProductionCombinationRateCollection,
  PokemonProductionCombinationRateCollectionItem,
} from '@/ui/pokedex/page/production/combination/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateIndividualParams} from '@/utils/game/producing/params';


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
    translatedSettings,
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
        rate: getPokemonProducingRateSingle({
          ingredients,
          skillData,
          ...getProducingRateIndividualParams({
            input,
            pokemon,
            subSkillMap,
          }),
          ...translatedSettings,
          ...props,
        }).atStage.final,
      } satisfies PokemonProductionCombinationRateCollectionItem,
    ];
  }));
};
