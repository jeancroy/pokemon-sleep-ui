import {describe, expect, it} from '@jest/globals';

import {testBonus} from '@/tests/data/game/bonus';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getTestFinalProductionOfDropCommonOpts} from '@/tests/production/rate';
import {getBerryProductionFinal} from '@/utils/game/producing/branch/berry/final';


describe('Pokemon Production (Berry) / Final', () => {
  it('is correct for clean Absol', () => {
    const bonus = testBonus['1'];
    const berryStrength = 67;
    const commonOpts = getTestFinalProductionOfDropCommonOpts(bonus);
    const rate = getBerryProductionFinal({
      base: {
        id: testPokemonData.absol.berry.id,
        frequency: 1000,
        triggerRate: 1,
        period: 'daily',
        qty: 86.4,
        qtyPerHelp: 2,
        strength: 5788.8,
        strengthPerHelp: berryStrength * 2,
      },
      ...commonOpts,
    });

    const awakeFreq = 1000 / (bonus.stamina.multiplier.awake ?? 0);
    const awakeDuration = commonOpts.sleepSessionInfo.duration.awake;

    expect(rate.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.awake.frequency).toBeCloseTo(awakeFreq);
    expect(rate.awake.qty).toBeCloseTo(awakeDuration / awakeFreq);
    expect(rate.awake.strength).toBeCloseTo(awakeDuration / awakeFreq * berryStrength);
    expect(rate.sleep1Vacant.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep1Vacant.frequency).toBeCloseTo(1000);
    expect(rate.sleep1Vacant.qty).toBeCloseTo(40);
    expect(rate.sleep1Vacant.strength).toBeCloseTo(40 * berryStrength);
    expect(rate.sleep1Filled.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep1Filled.frequency).toBeCloseTo(2000);
    expect(rate.sleep1Filled.qty).toBeCloseTo(10.6);
    expect(rate.sleep1Filled.strength).toBeCloseTo(10.6 * berryStrength);
    expect(rate.sleep2Vacant.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep2Vacant.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Vacant.qty).toBeCloseTo(0);
    expect(rate.sleep2Vacant.strength).toBeCloseTo(0);
    expect(rate.sleep2Filled.id).toBe(testPokemonData.absol.berry.id);
    expect(rate.sleep2Filled.frequency).toBeCloseTo(Infinity);
    expect(rate.sleep2Filled.qty).toBeCloseTo(0);
    expect(rate.sleep2Filled.strength).toBeCloseTo(0);
  });
});
