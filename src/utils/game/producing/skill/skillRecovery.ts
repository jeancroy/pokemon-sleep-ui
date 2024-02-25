import {PokemonProductionFirstPass} from '@/types/game/producing/rate/main';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';


type GetPokemonSkillRecoveryFromProductionOpts = {
  rates: PokemonProductionFirstPass[],
};

export const getPokemonSkillRecoveryFromProduction = ({
  rates,
}: GetPokemonSkillRecoveryFromProductionOpts): StaminaSkillTriggerData[][] => {
  const skillRecovery: StaminaSkillTriggerData[][] = rates.map(() => []);

  for (let currentIdx = 0; currentIdx < rates.length; currentIdx++) {
    const rate = rates[currentIdx];
    const {activeSkillEffect} = rate.params;

    if (!activeSkillEffect || activeSkillEffect.type !== 'stamina') {
      continue;
    }

    const dailyCount = rate.skill.qty.equivalent;
    const {target, value} = activeSkillEffect;

    if (target === 'team') {
      for (let i = 0; i < skillRecovery.length; i++) {
        skillRecovery[i].push({
          dailyCount,
          amount: value,
        });
      }
      continue;
    }

    if (target === 'random') {
      for (let i = 0; i < skillRecovery.length; i++) {
        skillRecovery[i].push({
          dailyCount,
          amount: value / rates.length,
        });
      }
      continue;
    }

    if (target === 'self') {
      skillRecovery[currentIdx].push({
        dailyCount,
        amount: value,
      });
      continue;
    }

    throw new Error(
      `Unhandled stamina target [${target satisfies never}] during skill recovery trigger generation`,
    );
  }

  return skillRecovery;
};
