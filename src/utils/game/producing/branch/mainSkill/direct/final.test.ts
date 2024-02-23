import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getTestFinalProductionOfDropCommonOpts} from '@/tests/production/rate';
import {getMainSkillProduction} from '@/utils/game/producing/branch/mainSkill/direct/base';
import {getMainSkillProductionFinal} from '@/utils/game/producing/branch/mainSkill/direct/final';
import {cloneMerge} from '@/utils/object/cloneMerge';


describe('Pokemon Production (Skill) / Final', () => {
  const bonus = testBonus['1'];
  const commonOpts = getTestFinalProductionOfDropCommonOpts(bonus);
  const {calculatedUserConfig} = commonOpts;

  const awakeDuration = commonOpts.sleepSessionInfo.duration.awake;

  it('is correct if expected skill count during sleep is > 1', () => {
    const rate = getMainSkillProductionFinal({
      base: getMainSkillProduction({
        pokemon: testPokemonData.ampharos,
        baseFrequency: 3168,
        calculatedUserConfig: calculatedUserConfig,
        skillTrigger: {
          ratePercent: 10,
        },
        activeSkillEffect: {
          type: 'strength',
          level: 2,
          value: 1251,
        },
      }),
      ...cloneMerge(commonOpts, {skillTrigger: {ratePercent: 10}}),
    });

    // Skill freq = 19800
    const awakeFreq = 3168 / (bonus.stamina.multiplier.awake ?? 0);

    // Math.ceil(1251 * 1.05 * 1.2) where
    // - 1251 is the skill strength
    // - 1.05 is map multiplier from `testBonus['1']`
    // - 1.2 is overall multiplier from `testBonus['1']`
    const skillStrength = 1577;

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 10));
    expect(rate.awake.strength).toBeCloseTo(awakeDuration / (awakeFreq * 10) * skillStrength);
    expect(rate.sleep1Vacant.id).toBe(2);
    expect(rate.sleep1Vacant.frequency).toBeCloseTo(25200);
    expect(rate.sleep1Vacant.qty).toBeCloseTo(1 - 0.9 ** 20);
    expect(rate.sleep1Vacant.strength).toBeCloseTo((1 - 0.9 ** 20) * skillStrength);
    expect(rate.sleep1Filled.id).toBe(2);
    expect(rate.sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep1Filled.qty).toBeCloseTo(0);
    expect(rate.sleep1Filled.strength).toBeCloseTo(0);
    expect(rate.sleep2Vacant.id).toBe(2);
    expect(rate.sleep2Vacant.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Vacant.qty).toBeCloseTo(0);
    expect(rate.sleep2Vacant.strength).toBeCloseTo(0);
    expect(rate.sleep2Filled.id).toBe(2);
    expect(rate.sleep2Filled.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Filled.qty).toBeCloseTo(0);
    expect(rate.sleep2Filled.strength).toBeCloseTo(0);
  });

  it('is correct if expected skill count during sleep is < 1', () => {
    const rate = getMainSkillProductionFinal({
      base: getMainSkillProduction({
        pokemon: testPokemonData.ampharos,
        baseFrequency: 6336,
        calculatedUserConfig: calculatedUserConfig,
        skillTrigger: {
          ratePercent: 10,
        },
        activeSkillEffect: {
          type: 'strength',
          level: 2,
          value: 1251,
        },
      }),
      ...cloneMerge(
        commonOpts,
        {
          fullPackStats: {
            bySleep: {
              primary: {
                helpCount: {vacant: 5, filled: 0},
                duration: {vacant: 20000, filled: 0},
              },
            },
          },
          skillTrigger: {
            ratePercent: 10,
          },
        },
      ),
    });

    // Skill freq = 39600
    const awakeFreq = 6336 / (bonus.stamina.multiplier.awake ?? 0);

    // Math.ceil(1251 * 1.05 * 1.2) where
    // - 1251 is the skill strength
    // - 1.05 is map multiplier from `testBonus['1']`
    // - 1.2 is overall multiplier from `testBonus['1']`
    const skillStrength = 1577;

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.qty).toBeCloseTo(awakeDuration / (awakeFreq * 10));
    expect(rate.awake.strength).toBeCloseTo(awakeDuration / (awakeFreq * 10) * skillStrength);
    expect(rate.sleep1Vacant.id).toBe(2);
    // 20000s originates from full pack stats
    expect(rate.sleep1Vacant.frequency).toBeCloseTo(20000 / (1 - 0.9 ** 5));
    expect(rate.sleep1Vacant.qty).toBeCloseTo(1 - 0.9 ** 5);
    expect(rate.sleep1Vacant.strength).toBeCloseTo((1 - 0.9 ** 5) * skillStrength);
    expect(rate.sleep1Filled.id).toBe(2);
    expect(rate.sleep1Filled.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep1Filled.qty).toBeCloseTo(0);
    expect(rate.sleep1Filled.strength).toBeCloseTo(0);
    expect(rate.sleep2Vacant.id).toBe(2);
    expect(rate.sleep2Vacant.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Vacant.qty).toBeCloseTo(0);
    expect(rate.sleep2Vacant.strength).toBeCloseTo(0);
    expect(rate.sleep2Filled.id).toBe(2);
    expect(rate.sleep2Filled.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Filled.qty).toBeCloseTo(0);
    expect(rate.sleep2Filled.strength).toBeCloseTo(0);
  });
});
