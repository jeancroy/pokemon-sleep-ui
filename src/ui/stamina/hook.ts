import React from 'react';


import {pokemonSubSkillLevel} from '@/types/game/pokemon/subSkill';
import {StaminaAnalysisDataProps, StaminaAnalysisState, UseStaminaAnalysisReturn} from '@/ui/stamina/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useStaminaAnalysis = ({
  preloaded,
  subSkillMap,
}: StaminaAnalysisDataProps): UseStaminaAnalysisReturn => {
  const [state, setState] = React.useState<StaminaAnalysisState>({
    bundle: preloaded.bundle,
    subSkill: {},
    nature: null,
  });

  return {
    state,
    setConfig: (stamina) => setState((original) => cloneMerge(
      original,
      {bundle: {userConfig: {stamina}}},
    )),
    setSkillTrigger: (recovery) => setState((original) => cloneMerge(
      original,
      {bundle: {userConfig: {stamina: {skillRecovery: {recovery}}}}},
    )),
    setNature: (nature) => setState((original) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: original.subSkill,
        subSkillMap,
      });
      const recoveryRate = toRecoveryRate({
        natureId: nature,
        subSkillBonuses: [subSkillBonus],
      });

      return {
        ...original,
        ...cloneMerge(
          original,
          {bundle: {userConfig: {stamina: {recoveryRate}}}},
        ),
        // Cannot use `cloneMerge()` as it has to be overwriting
        nature,
      };
    }),
    setSubSkill: (subSkill) => setState((original) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: subSkill,
        subSkillMap,
      });
      const recoveryRate = toRecoveryRate({
        natureId: original.nature,
        subSkillBonuses: [subSkillBonus],
      });

      return {
        ...original,
        ...cloneMerge(
          original,
          {bundle: {userConfig: {stamina: {recoveryRate}}}},
        ),
        // Cannot use `cloneMerge()` as it has to be overwriting
        subSkill,
      };
    }),
  };
};
