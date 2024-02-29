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
  berryStrength: ({berry}) => berry.strength.equivalent,
  ingredientStrength: (rate) => getTotalPokemonIngredientProduction({
    rate,
    target: 'strength',
    state: 'equivalent',
  }),
  mainSkillTriggerCount: ({skill}) => skill.qty.equivalent,
  mainSkillTriggerRate: ({intermediate}) => intermediate.skillTrigger.ratePercent,
  frequency: ({intermediate}) => intermediate.frequency,
  timeToFullPackPrimary: ({fullPackStats}) => fullPackStats.bySleep.primary?.duration.vacant ?? Infinity,
  timeToFullPackSecondary: ({fullPackStats}) => fullPackStats.bySleep.secondary?.duration.vacant ?? Infinity,
};
