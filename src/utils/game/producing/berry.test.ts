import {describe, expect, it} from '@jest/globals';

import {durationOfDay} from '@/const/common';
import {testBerryDataMap} from '@/tests/data/game/berry';
import {testBonus} from '@/tests/data/game/bonus';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testDefaultCalculatedUserSettings} from '@/tests/data/user/settings';
import {getBerryProducingRate} from '@/utils/game/producing/berry';
import {getCommonEnergyMultiplier} from '@/utils/game/producing/multiplier';


describe('Pokemon Berry Production', () => {
  it('is correct for clean Absol', () => {
    const bonus = testBonus['1'];
    const rate = getBerryProducingRate({
      level: 30,
      pokemon: testPokemonData.absol,
      frequency: 2920.2,
      subSkillBonus: {},
      calculatedSettings: {
        ...testDefaultCalculatedUserSettings,
        bonus,
      },
      energyMultiplier: getCommonEnergyMultiplier({bonus}),
      snorlaxFavorite: {},
      berryData: testBerryDataMap['16'],
    });

    const awakeFreq = 2920.2 / bonus.stamina.multiplier.awake;
    const sleepFreq = 2920.2 / bonus.stamina.multiplier.sleep1;
    // Math.ceil(63 * 1.05) where
    // - 63 is the berry strength
    // - 1.05 is map multiplier from `testBonus['1']`
    const berryEnergy = 67;
    const energyMultiplier = getCommonEnergyMultiplier({bonus});

    expect(rate.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate.awake.quantity).toBeCloseTo(durationOfDay / awakeFreq);
    expect(rate.awake.energy).toBeCloseTo(durationOfDay / awakeFreq * berryEnergy * energyMultiplier);
    expect(rate.sleep1.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep1.frequency).toBeCloseTo(sleepFreq);
    expect(rate.sleep1.quantity).toBeCloseTo(durationOfDay / sleepFreq);
    expect(rate.sleep1.energy).toBeCloseTo(durationOfDay / sleepFreq * berryEnergy * energyMultiplier);
  });
});
