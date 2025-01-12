import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {TeamMakerFullMealCoverCandidateData} from '@/ui/team/maker/calc/getCandidates/initial/type';
import {GetTeamMakerCandidatesOpts} from '@/ui/team/maker/calc/getCandidates/type';
import {getTeamMakerFullMealCoverComps} from '@/ui/team/maker/calc/getFullMealCoverComps/main';
import {getTeamMakerFullMealCoverProductionMap} from '@/ui/team/maker/calc/getFullMealCoverComps/utils';
import {getMealIngredientInfoFromTargetMeals} from '@/utils/game/meal/ingredient';


export const getTeamMakerFullMealCoverCandidates = ({
  input,
  pokemonLimits,
  calculatedCookingConfig,
}: GetTeamMakerCandidatesOpts): TeamMakerFullMealCoverCandidateData[] => {
  const {targetMeals} = calculatedCookingConfig;

  const dataMap = getTeamMakerFullMealCoverProductionMap({
    pokemonLimits,
    getBasisValue: ({best}) => best,
  });

  const ret: TeamMakerFullMealCoverCandidateData[] = [];

  for (let memberCount = 1; memberCount <= input.memberCount; memberCount++) {
    ret.push({
      memberCount,
      candidates: new Map(
        getTeamMakerFullMealCoverComps({
          memberCount,
          ingredientsRequired: getMealIngredientInfoFromTargetMeals({
            targetMeals,
            days: productionMultiplierByPeriod[teamMakerProductionPeriod],
          }).ingredientsRequired,
          dataMap,
        })
          .flatMap((team) => team.map(({payload}) => [
            payload.payload.refData.pokeInBox.uuid,
            payload,
          ])),
      ),
    });
  }

  return ret;
};
