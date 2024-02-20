import {SkillTriggerAnalysisDataProps, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';


export type SkillTriggerAnalysisCommonProps = SkillTriggerAnalysisDataProps;

export type SkillTriggerAnalysisCalcResult<TData> = {
  skillTriggerCount: TData,
};

export type SkillTriggerAnalysisCalcUnit = SkillTriggerAnalysisUnit & SkillTriggerAnalysisCalcResult<{
  actual: number,
  diffPercentToBase: number,
}> & {
  id: string,
};
