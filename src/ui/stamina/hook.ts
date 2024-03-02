import React from 'react';


import {pokemonSubSkillLevel, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {StaminaAnalysisState, UseStaminaAnalysisReturn} from '@/ui/stamina/type';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {getSubSkillBonus} from '@/utils/game/subSkill/effect';
import {cloneMerge} from '@/utils/object/cloneMerge';


type UseStaminaAnalysisOpts = {
  serverConfigBundle: ConfigBundle,
  subSkillMap: SubSkillMap,
};

export const useStaminaAnalysis = ({
  serverConfigBundle,
  subSkillMap,
}: UseStaminaAnalysisOpts): UseStaminaAnalysisReturn => {
  const [state, setState] = React.useState<StaminaAnalysisState>({
    bundle: serverConfigBundle,
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
