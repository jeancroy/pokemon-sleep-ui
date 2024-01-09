import {CookingUserSettings} from '@/types/userData/settings';
import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates';
import {getPokeboxSource} from '@/ui/team/maker/calc/getPokeboxSource';
import {getTeamMakerPokemonLimits} from '@/ui/team/maker/calc/getPokemonLimits';
import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerCalcGenerateCompOpts = (opts: TeamMakerCalcInitOpts): TeamMakerCalcGenerateCompOpts => {
  const {
    input,
    mealMap,
  } = opts;

  const cookingSettings: CookingUserSettings = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
  };

  const pokemonLimits = getTeamMakerPokemonLimits({
    cookingSettings,
    pokeboxSource: getPokeboxSource(opts),
    ...opts,
  });
  const candidates = getTeamMakerCandidates({
    input,
    pokemonLimits,
  });

  return {
    cookingSettings,
    candidates: [...candidates.values()],
    ...opts,
  };
};
