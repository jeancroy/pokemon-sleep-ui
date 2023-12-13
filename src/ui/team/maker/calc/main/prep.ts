import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates';
import {getTeamMakerRateAtMaxPotential} from '@/ui/team/maker/calc/getMaxPotential';
import {TeamMakerInputCalculated} from '@/ui/team/maker/calc/type';
import {GetTeamMakerCalcPrepOpts, GetTeamMakerResultsOpts} from '@/ui/team/maker/hook/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';
import {toTargetMeals} from '@/utils/user/settings/utils';


export const getTeamMakerCalcPrepOpts = (opts: GetTeamMakerCalcPrepOpts): GetTeamMakerResultsOpts => {
  const {
    input,
    mealMap,
    settings,
  } = opts;
  const calculatedInput: TeamMakerInputCalculated = {
    recipeLevel: input.recipeLevel,
    targetMeals: toTargetMeals({
      mealType: input.mealType,
      target: input.target,
      mealMap,
    }),
  };
  const calculatedSettings = toCalculatedUserSettings({settings});

  const ratesAtMax = getTeamMakerRateAtMaxPotential({
    calculatedInput,
    calculatedSettings,
    ...opts,
  });
  const candidates = getTeamMakerCandidates({ratesAtMax});

  return {
    calculatedInput,
    calculatedSettings,
    candidates,
    ...opts,
  };
};
