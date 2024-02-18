// Adapted from https://github.com/SleepAPI/SleepAPI/blob/develop/backend/src/services/set-cover/set-cover.ts
import {IngredientCounter} from '@/types/game/ingredient';
import {
  TeamMakerFullMealCoverCompMember,
  TeamMakerFullMealCoverProductionMap,
  TeamMakerFullMealCoverRemainder,
} from '@/ui/team/maker/calc/getFullMealCoverComps/type';
import {getTotalIngredientCount, subtractIngredientCount} from '@/utils/game/ingredient/counter';


type GetTeamMakerFullMealCoverCompsOpts<TPayload> = {
  memberCount: number,
  ingredientsRequired: IngredientCounter,
  dataMap: TeamMakerFullMealCoverProductionMap<TPayload>,
};

export const getTeamMakerFullMealCoverComps = <TPayload>({
  memberCount,
  ingredientsRequired,
  dataMap,
}: GetTeamMakerFullMealCoverCompsOpts<TPayload>): TeamMakerFullMealCoverCompMember<TPayload>[][] => {
  const requiredIngredientsId = Object.keys(ingredientsRequired);

  if (!memberCount || !requiredIngredientsId.length) {
    return [];
  }

  let currentMemberCount = memberCount;

  const remainders = (dataMap[parseInt(requiredIngredientsId[0])] ?? [])
    .map((data): TeamMakerFullMealCoverRemainder<TPayload> => {
      const remainder = subtractIngredientCount(
        ingredientsRequired,
        data.ingredientProduction,
      );

      return {
        totalRemaining: getTotalIngredientCount(remainder),
        remainder,
        data,
      };
    })
    .sort((a, b) => a.totalRemaining - b.totalRemaining);

  let teams: TeamMakerFullMealCoverCompMember<TPayload>[][] = [];
  for (const {totalRemaining, remainder, data} of remainders) {
    if (!totalRemaining) {
      if (currentMemberCount > 1) {
        teams = [[data]];
        currentMemberCount = 1;
      } else if (currentMemberCount === 1) {
        teams = [...teams, [data]];
      }
      continue;
    }

    if (currentMemberCount <= 1) {
      continue;
    }

    const subTeams = getTeamMakerFullMealCoverComps({
      ingredientsRequired: remainder,
      memberCount: currentMemberCount - 1,
      dataMap,
    });

    if (!subTeams.length) {
      continue;
    }
    const subTeamLeastMemberCount = subTeams[0].length;

    if (subTeamLeastMemberCount + 1 < currentMemberCount) {
      teams = subTeams.map((team) => [...team, data]).sort();
      currentMemberCount = subTeamLeastMemberCount + 1;
    } else if (subTeamLeastMemberCount + 1 === currentMemberCount) {
      teams = [...teams, ...subTeams.map((team) => [...team, data])].sort();
    }
  }

  return teams;
};
