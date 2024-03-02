import {TeamMemberProductionSorterGetter, TeamMemberProductionSortingBasis} from '@/types/game/team/production';
import {getTotalPokemonIngredientProduction} from '@/utils/game/producing/reducer/total/common';


export const teamMemberProductionSortingBasisInAsc: TeamMemberProductionSortingBasis[] = [
  'frequency',
  'timeToFullPackPrimary',
  'timeToFullPackSecondary',
];

export const teamMemberProductionSorterGetter: {
  [basis in TeamMemberProductionSortingBasis]: TeamMemberProductionSorterGetter
} = {
  totalStrength: ({total}) => total.strength,
  berryStrength: ({rate}) => rate.berry.strength.equivalent,
  ingredientStrength: ({rate}) => getTotalPokemonIngredientProduction({
    rate,
    target: 'strength',
    state: 'equivalent',
  }),
  mainSkillTriggerCount: ({rate}) => rate.skill.qty.equivalent,
  mainSkillTriggerRate: ({rate}) => rate.intermediate.skillTrigger.ratePercent,
  frequency: ({rate}) => rate.intermediate.frequency,
  timeToFullPackPrimary: ({rate}) => rate.fullPackStats.bySleep.primary?.duration.vacant ?? Infinity,
  timeToFullPackSecondary: ({rate}) => rate.fullPackStats.bySleep.secondary?.duration.vacant ?? Infinity,
};
