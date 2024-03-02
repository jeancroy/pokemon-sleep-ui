import {teamAnalysisSlotName, TeamProductionBySlot, TeamProductionTotal} from '@/types/website/feature/teamAnalysis';
import {
  GetTeamProductionCommonOpts,
} from '@/ui/team/analysis/calc/type';
import {toSum} from '@/utils/array';
import {getTotalStrengthProductionFromIndirectSkill} from '@/utils/game/producing/reducer/total/indirectSkill';
import {isNotNullish} from '@/utils/type';


type GetTeamProductionTotalOpts = GetTeamProductionCommonOpts & {
  bySlot: TeamProductionBySlot,
};

export const getTeamProductionTotal = ({
  period,
  state,
  bySlot,
}: GetTeamProductionTotalOpts): TeamProductionTotal => {
  const stats = teamAnalysisSlotName
    .map((slotName) => bySlot[slotName])
    .filter(isNotNullish);

  return {
    berry: {
      period,
      strength: toSum(stats.map(({rate}) => rate.berry.strength[state])),
      qty: toSum(stats.map(({rate}) => rate.berry.qty[state])),
    },
    ingredient: {
      period,
      strength: toSum(
        stats
          .flatMap(({rate}) => (
            Object.values(rate.ingredient).map(({strength}) => strength[state])
          ))
          .filter(isNotNullish),
      ),
      qty: toSum(
        stats
          .flatMap(({rate}) => (
            Object.values(rate.ingredient).map(({qty}) => qty[state])
          ))
          .filter(isNotNullish),
      ),
    },
    skill: {
      period,
      strength: toSum(stats.map(({rate}) => (
        rate.skill.strength[state] + getTotalStrengthProductionFromIndirectSkill({skillIndirect: rate.skillIndirect})
      ))),
      qty: toSum(stats.map(({rate}) => rate.skill.qty[state])),
    },
  };
};
