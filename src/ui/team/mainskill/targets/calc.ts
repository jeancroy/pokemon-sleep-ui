import React from 'react';

import {
  getSkillTriggerAnalysisCalcUnitOfTargets,
  GetSkillTriggerAnalysisCalcUnitOfTargetsOpts,
} from '@/ui/team/mainskill/calc/targets';
import {SkillTriggerAnalysisCalcUnit} from '@/ui/team/mainskill/targets/type';


type UseSkillTriggerAnalysisCalculatedReturn = {
  units: SkillTriggerAnalysisCalcUnit[],
  sort: () => void,
};

export const useSkillTriggerAnalysisCalculated = (
  opts: GetSkillTriggerAnalysisCalcUnitOfTargetsOpts,
): UseSkillTriggerAnalysisCalculatedReturn => {
  const {state, calculatedConfigBundle} = opts;

  const [units, setUnits] = React.useState(getSkillTriggerAnalysisCalcUnitOfTargets(opts));

  // Recalculate when `state` changes
  React.useEffect(
    () => setUnits(getSkillTriggerAnalysisCalcUnitOfTargets(opts)),
    [state, calculatedConfigBundle],
  );

  const sort = React.useCallback(
    () => setUnits((original) => [
      // Recreating an array to trigger rerender
      ...original.sort((a, b) => (
        b.skillTriggerCount.actual - a.skillTriggerCount.actual
      )),
    ]),
    [units, state, calculatedConfigBundle],
  );

  return {units, sort};
};
