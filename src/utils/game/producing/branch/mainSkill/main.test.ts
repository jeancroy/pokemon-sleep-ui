import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {defaultUserSettings} from '@/const/user/settings';
import {testBonus} from '@/tests/data/game/bonus';
import {testMainSkillMap} from '@/tests/data/game/mainSkill';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultToCalculatedUserSettingsOpts} from '@/tests/data/user/settings';
import {getMainSkillProducingRate} from '@/utils/game/producing/branch/mainSkill/main';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


describe('Pokemon Skill Production', () => {
  it('is correct when skill freq < sleep duration', () => {
    const bonus = testBonus['1'];
    const calculatedUserSettings = toCalculatedUserSettings({
      ...testDefaultToCalculatedUserSettingsOpts,
      settings: cloneMerge(
        defaultUserSettings,
        {
          stamina: {
            sleepSession: {
              primary: {start: 0, end: 28800},
              secondary: null,
            },
          },
        },
      ),
    });
    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 3168,
      calculatedSettings: cloneMerge(
        // Base
        calculatedUserSettings,
        // Override the whole bonus
        {bonus},
        // Override sleep session info calculated using custom sessions
        {bonus: {stamina: {sleepSessionInfo: calculatedUserSettings.bonus.stamina.sleepSessionInfo}}},
      ),
      skillRatePercent: 10,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
    });

    // Skill freq = 14400
    const awakeFreq = 3168 / (bonus.stamina.multiplier.awake ?? 0);
    const energyMultiplier = getStrengthMultiplier({
      bonus,
      strengthMultiplierType: 'skill',
    });
    // Math.ceil(1251 * 1.05) where
    // - 1251 is the skill strength
    // - 1.05 is map multiplier from `testBonus['1']`
    const skillStrength = 1314;

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * skillStrength);
    expect(rate.sleep1.id).toBe(2);
    expect(rate.sleep1.frequency).toBeCloseTo(28800);
    expect(rate.sleep1.quantity).toBeCloseTo(3);
    expect(rate.sleep1.energy).toBeCloseTo(3 * energyMultiplier * skillStrength);
  });

  it('is correct when sleep duration < skill freq', () => {
    const bonus = testBonus['1'];
    const calculatedUserSettings = toCalculatedUserSettings({
      ...testDefaultToCalculatedUserSettingsOpts,
      settings: cloneMerge(
        defaultUserSettings,
        {
          stamina: {
            sleepSession: {
              primary: {start: 0, end: 14400},
              secondary: null,
            },
          },
        },
      ),
    });

    const rate = getMainSkillProducingRate({
      pokemon: testPokemonData.ampharos,
      frequency: 4752,
      calculatedSettings: cloneMerge(
        // Base
        calculatedUserSettings,
        // Override the whole bonus
        {bonus},
        // Override sleep session info calculated using custom sessions
        {bonus: {stamina: {sleepSessionInfo: calculatedUserSettings.bonus.stamina.sleepSessionInfo}}},
      ),
      skillRatePercent: 10,
      skillLevel: 2,
      skillData: testMainSkillMap['2'],
    });

    // Skill freq = 21600
    const awakeFreq = 4752 / (bonus.stamina.multiplier.awake ?? 0);
    const energyMultiplier = getStrengthMultiplier({
      bonus,
      strengthMultiplierType: 'skill',
    });
    // Math.ceil(1251 * 1.05) where
    // - 1251 is the skill strength
    // - 1.05 is map multiplier from `testBonus['1']`
    const skillStrength = 1314;

    expect(rate.id).toBe(2);
    expect(rate.awake.id).toBe(2);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq * 10);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq / 10);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq / 10 * energyMultiplier * skillStrength);
    expect(rate.sleep1.id).toBe(2);
    expect(rate.sleep1.frequency).toBeCloseTo(21600);
    expect(rate.sleep1.quantity).toBeCloseTo(4);
    expect(rate.sleep1.energy).toBeCloseTo(4 * energyMultiplier * skillStrength);
  });
});
