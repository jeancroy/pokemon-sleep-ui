import {v4} from 'uuid';

import {GetSkillTriggerAnalysisCalcUnitCommonOpts} from '@/ui/team/mainskill/calc/type';
import {getSkillTriggerAnalysisCalcUnit} from '@/ui/team/mainskill/calc/unit';
import {SkillTriggerAnalysisCalcUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisState} from '@/ui/team/mainskill/type';
import {isNotNullish} from '@/utils/type';


export type GetSkillTriggerAnalysisCalcUnitOfTargetsOpts = GetSkillTriggerAnalysisCalcUnitCommonOpts & {
  state: SkillTriggerAnalysisState,
};

export const getSkillTriggerAnalysisCalcUnitOfTargets = ({
  state,
  ...opts
}: GetSkillTriggerAnalysisCalcUnitOfTargetsOpts): SkillTriggerAnalysisCalcUnit[] => {
  const baseUnit = state.base;
  if (!baseUnit) {
    return [];
  }

  const base = getSkillTriggerAnalysisCalcUnit({
    ...opts,
    id: v4(),
    unit: baseUnit,
    base: null,
  });

  return Object.entries(state.targets)
    .map(([id, unit]) => {
      if (!base) {
        return null;
      }

      return getSkillTriggerAnalysisCalcUnit({
        id,
        unit,
        base: {
          skillTriggerCount: base.skillTriggerCount.actual,
        },
        ...opts,
      });
    })
    .filter(isNotNullish);
};
