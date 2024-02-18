import {IngredientId} from '@/types/game/ingredient';
import {IngredientChain} from '@/types/game/pokemon/ingredient';
import {toUnique} from '@/utils/array';
import {getEffectiveIngredientLevels} from '@/utils/game/ingredient/level';


type GetPossibleIngredientsFromChainOpts = {
  level: number | null,
  chain: IngredientChain,
};

export const getPossibleIngredientsFromChain = ({
  level,
  chain,
}: GetPossibleIngredientsFromChainOpts): IngredientId[] => (
  toUnique(
    getEffectiveIngredientLevels(level)
      .flatMap((level) => chain.ingredients[level].map(({id}) => id)),
  )
);
