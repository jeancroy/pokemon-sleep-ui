import {PokemonConfigPokemonData} from '@/components/shared/pokemon/predefined/config/type';
import {SkillTriggerAnalysisState, SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {GenerateSkillTriggerAnalysisUnitOpts} from '@/ui/team/mainskill/utils';


type SkillTriggerAnalysisTargetStateSetBaseOpts = {
  unit: SkillTriggerAnalysisUnit,
  clearTarget: boolean,
};

export type UseSkillTriggerAnalysisTargetStateReturn = {
  state: SkillTriggerAnalysisState,
  setBase: ({unit, clearTarget}: SkillTriggerAnalysisTargetStateSetBaseOpts) => void,
  createUnit: (opts: GenerateSkillTriggerAnalysisUnitOpts) => void,
  createUnitDirect: (unit: SkillTriggerAnalysisUnit) => void,
  updateUnit: (id: string, update: Partial<PokemonConfigPokemonData>) => void,
  deleteUnit: (id: string) => void,
  copyUnit: (id: string) => void,
};
