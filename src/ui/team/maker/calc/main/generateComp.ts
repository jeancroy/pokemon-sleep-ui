import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates/main';
import {getTeamMakerPokeboxSource} from '@/ui/team/maker/calc/getPokeboxSource';
import {getTeamMakerPokemonLimits} from '@/ui/team/maker/calc/getPokemonLimits/main';
import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {toActualPotCapacity} from '@/utils/user/config/cooking/potCapacity';
import {toTargetMeals} from '@/utils/user/config/cooking/targetMeals';


export const getTeamMakerCalcGenerateCompOpts = (opts: TeamMakerCalcInitOpts): TeamMakerCalcGenerateCompOpts => {
  const {
    input,
    bundle,
    mealMap,
  } = opts;
  const {userConfig} = bundle;

  const calculatedCookingConfig: CalculatedCookingConfig = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
    actualPotCapacity: toActualPotCapacity({baseCapacity: input.potCapacity, userConfig}),
  };

  const pokemonLimits = getTeamMakerPokemonLimits({
    calculatedCookingConfig,
    pokeboxSource: getTeamMakerPokeboxSource(opts),
    ...opts,
  });
  const candidates = getTeamMakerCandidates({
    input,
    pokemonLimits,
    calculatedCookingConfig,
  });

  return {
    calculatedCookingConfig,
    candidates: [...candidates.values()],
    ...opts,
  };
};
