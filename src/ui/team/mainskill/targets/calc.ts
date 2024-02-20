import React from 'react';

import {getSkillTriggerValueOfTargets, GetSkillTriggerValueOfTargetsOpts} from '@/ui/team/mainskill/calc/targets';
import {SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';


type UseSkillTriggerAnalysisCalculatedReturn = {
  units: SkillTriggerAnalysisCalculatedUnit[],
  sort: () => void,
};

export const useSkillTriggerAnalysisCalculated = (
  opts: GetSkillTriggerValueOfTargetsOpts,
): UseSkillTriggerAnalysisCalculatedReturn => {
  const {state, calculatedConfigBundle} = opts;

  const [units, setUnits] = React.useState(getSkillTriggerValueOfTargets(opts));

  // Recalculate when `state` changes
  React.useEffect(
    () => setUnits(getSkillTriggerValueOfTargets(opts)),
    [state, calculatedConfigBundle],
  );

  const sort = React.useCallback(
    () => setUnits((original) => [
      // Recreating an array to trigger rerender
      ...original.sort((a, b) => (
        b.skillTriggerValue.actual - a.skillTriggerValue.actual
      )),
    ]),
    [units, state, calculatedConfigBundle],
  );

  return {units, sort};
};
