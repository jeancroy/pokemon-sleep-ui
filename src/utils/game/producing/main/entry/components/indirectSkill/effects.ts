import {PokemonProductionFirstPass} from '@/types/game/producing/rate/main';
import {PokemonIndirectSkillEffects} from '@/types/game/producing/rate/skill';
import {toSum} from '@/utils/array';


type GetPokemonIndirectSkillEffectsOpts = {
  firstPassRates: PokemonProductionFirstPass[],
};

export const getPokemonIndirectSkillEffects = ({
  firstPassRates,
}: GetPokemonIndirectSkillEffectsOpts): PokemonIndirectSkillEffects => {
  const skillCount = firstPassRates.map((rate) => {
    const {params, skill} = rate;
    const {activeSkillEffect} = params;

    return {activeSkillEffect, count: skill.qty.equivalent};
  });

  return {
    totalExtraHelps: toSum(skillCount.map(({activeSkillEffect, count}) => {
      if (activeSkillEffect?.type !== 'help') {
        return 0;
      }

      return activeSkillEffect.count * count;
    })),
  };
};
