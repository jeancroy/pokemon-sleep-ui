import {describe, expect, it} from '@jest/globals';

import {defaultUserCalculationBehavior} from '@/const/user/settings';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getCarryLimitInfo} from '@/utils/game/producing/inventory/carryLimit';


describe('Pokemon Carry Limit Info', () => {
  it('gets correct info for clean Pokemon', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      subSkillBonus: {},
      behavior: defaultUserCalculationBehavior,
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
  });

  it('gets correct info for evolved Pokemon', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 2,
      subSkillBonus: {},
      behavior: defaultUserCalculationBehavior,
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 2 * 5);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 2 * 5);
  });

  it('gets correct info for Pokemon with carry limit subskill', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      subSkillBonus: {
        inventory: [18],
      },
      behavior: defaultUserCalculationBehavior,
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
    expect(final).toBeCloseTo(testPokemonData.absol.stats.maxCarry + 18);
  });

  it('respects good camp ticket calculation behavior', () => {
    const {base, final} = getCarryLimitInfo({
      pokemon: testPokemonData.absol,
      evolutionCount: 0,
      subSkillBonus: {
        inventory: [18],
      },
      behavior: {
        ...defaultUserCalculationBehavior,
        goodCampTicket: true,
      },
    });

    expect(base).toBeCloseTo(testPokemonData.absol.stats.maxCarry);
    expect(final).toBeCloseTo(39);
  });
});
