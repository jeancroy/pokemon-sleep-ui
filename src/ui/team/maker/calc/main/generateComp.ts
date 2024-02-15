import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates/main';
import {getTeamMakerPokeboxSource} from '@/ui/team/maker/calc/getPokeboxSource';
import {getTeamMakerPokemonLimits} from '@/ui/team/maker/calc/getPokemonLimits/main';
import {TeamMakerCalcGenerateCompOpts, TeamMakerCalcInitOpts} from '@/ui/team/maker/type/calc';
import {toActualPotCapacity} from '@/utils/user/settings/cooking/potCapacity';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerCalcGenerateCompOpts = (opts: TeamMakerCalcInitOpts): TeamMakerCalcGenerateCompOpts => {
  const {
    input,
    bundle,
    mealMap,
  } = opts;
  const {settings} = bundle;

  const cookingSettings: CookingUserSettings = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
    actualPotCapacity: toActualPotCapacity({baseCapacity: input.potCapacity, settings}),
  };

  const pokemonLimits = getTeamMakerPokemonLimits({
    cookingSettings,
    pokeboxSource: getTeamMakerPokeboxSource(opts),
    ...opts,
  });
  const candidates = getTeamMakerCandidates({
    input,
    pokemonLimits,
    cookingSettings,
  });

  return {
    cookingSettings,
    candidates: [...candidates.values()],
    ...opts,
  };
};
