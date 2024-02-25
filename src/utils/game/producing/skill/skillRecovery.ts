import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {StaminaSkillTriggerData, StaminaSkillTriggerOverride} from '@/types/game/stamina/skill';


type GetPokemonSkillRecoveryFromProductionOpts = {
  rates: PokemonProductionInitial[],
  calcBehavior: ProductionCalcBehavior,
};

export const getPokemonSkillRecoveryFromProduction = ({
  rates,
  calcBehavior,
}: GetPokemonSkillRecoveryFromProductionOpts): StaminaSkillTriggerOverride[] => {
  const {asSingle} = calcBehavior;
  const skillTriggerOverrides: StaminaSkillTriggerOverride[] = rates.map(() => ({
    type: asSingle ? 'attach' : 'override',
    triggers: [],
  }));

  for (let currentIdx = 0; currentIdx < rates.length; currentIdx++) {
    const rate = rates[currentIdx];
    const {activeSkillEffect} = rate.params;

    if (!activeSkillEffect || activeSkillEffect.type !== 'stamina') {
      continue;
    }

    const dailyCount = rate.skill.qty.equivalent;
    const {target, value} = activeSkillEffect;

    if (target === 'team') {
      const recovery: StaminaSkillTriggerData = {dailyCount, amount: value};

      if (asSingle) {
        skillTriggerOverrides[currentIdx].triggers.push(recovery);
      } else {
        for (let i = 0; i < skillTriggerOverrides.length; i++) {
          skillTriggerOverrides[i].triggers.push(recovery);
        }
      }

      continue;
    }

    if (target === 'random') {
      const recovery: StaminaSkillTriggerData = {dailyCount, amount: value / rates.length};

      if (asSingle) {
        skillTriggerOverrides[currentIdx].triggers.push(recovery);
      } else {
        for (let i = 0; i < skillTriggerOverrides.length; i++) {
          skillTriggerOverrides[i].triggers.push(recovery);
        }
      }

      continue;
    }

    if (target === 'self') {
      skillTriggerOverrides[currentIdx].triggers.push({
        dailyCount,
        amount: value,
      });
      continue;
    }

    throw new Error(
      `Unhandled stamina target [${target satisfies never}] during skill recovery trigger generation`,
    );
  }

  return skillTriggerOverrides;
};
