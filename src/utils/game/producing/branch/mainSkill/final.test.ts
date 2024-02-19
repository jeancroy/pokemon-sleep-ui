import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {testMainSkillMap} from '@/tests/data/game/mainSkill';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getTestFinalProducingRateOfDropCommonOpts} from '@/tests/producing/rate';
import {getMainSkillProducingRateBase} from '@/utils/game/producing/branch/mainSkill/base';
import {getMainSkillProducingRateFinal} from '@/utils/game/producing/branch/mainSkill/final';
import {cloneMerge} from '@/utils/object/cloneMerge';


describe('Pokemon Production (Skill) / Final', () => {
  const bonus = testBonus['1'];
  const commonOpts = getTestFinalProducingRateOfDropCommonOpts(bonus);
  const {calculatedUserConfig} = commonOpts;

  const awakeDuration = commonOpts.sleepSessionInfo.duration.awake;

  it('is correct if expected skill count during sleep is > 1', () => {
    const rate = getMainSkillProducingRateFinal({
      base: getMainSkillProducingRateBase({
        pokemon: testPokemonData.ampharos,
        baseFrequency: 3168,
        calculatedUserConfig: calculatedUserConfig,
        skillRatePercent: 10,
        skillLevel: 2,
        skillData: testMainSkillMap['2'],
      }),
      ...commonOpts,
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
    expect(rate.sleep1Vacant.qty).toBeCloseTo(1);
    expect(rate.sleep1Vacant.strength).toBeCloseTo(skillStrength);
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
    const rate = getMainSkillProducingRateFinal({
      base: getMainSkillProducingRateBase({
        pokemon: testPokemonData.ampharos,
        baseFrequency: 6336,
        calculatedUserConfig: calculatedUserConfig,
        skillRatePercent: 10,
        skillLevel: 2,
        skillData: testMainSkillMap['2'],
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
    // 40000 from the fact that each base help gives 0.1 skills, and the vacant duration is 5 helps in 20000s
    // Therefore 1 skill in 40000s
    expect(rate.sleep1Vacant.frequency).toBeCloseTo(40000);
    // 0.5 based on the above calculation that 5 base helps "accumulates" 0.5 skills
    expect(rate.sleep1Vacant.qty).toBeCloseTo(0.5);
    expect(rate.sleep1Vacant.strength).toBeCloseTo(0.5 * skillStrength);
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
