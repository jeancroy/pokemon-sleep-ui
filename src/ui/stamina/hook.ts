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
    config: preloaded.bundle.userConfig.stamina,
    subSkill: {},
    nature: null,
  });

  return {
    state,
    setConfig: (config) => setState((original) => ({
      ...original,
      config,
    })),
    setSkillTrigger: (recovery) => setState((original) => cloneMerge(
      original,
      {config: {skillRecovery: {recovery}}},
    )),
    setNature: (nature) => setState(({config, ...original}) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: original.subSkill,
        subSkillMap,
      });

      return {
        ...original,
        config: {
          ...config,
          recoveryRate: toRecoveryRate({
            natureId: nature,
            subSkillBonuses: [subSkillBonus],
          }),
        },
        nature,
      };
    }),
    setSubSkill: (subSkill) => setState(({config, ...original}) => {
      const subSkillBonus = getSubSkillBonus({
        level: Math.max(...pokemonSubSkillLevel),
        pokemonSubSkill: subSkill,
        subSkillMap,
      });

      return {
        ...original,
        config: {
          ...config,
          recoveryRate: toRecoveryRate({
            natureId: original.nature,
            subSkillBonuses: [subSkillBonus],
          }),
        },
        subSkill,
      };
    }),
  };
};
