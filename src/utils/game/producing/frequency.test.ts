import {describe, expect, it} from '@jest/globals';

import {defaultUserCalculationBehavior} from '@/const/user/config/user';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';


describe('Pokemon Production (Base) / Frequency', () => {
  it('is correct for clean Absol', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helpingBonusEffect: {
        context: 'single',
        active: false,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2920);
  });

  it('respects good camp ticket calculation behavior', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helpingBonusEffect: {
        context: 'single',
        active: false,
      },
      natureId: null,
      behavior: {
        ...defaultUserCalculationBehavior,
        goodCampTicket: true,
      },
    });

    expect(frequency).toBeCloseTo(2433);
  });

  it('is correct calculating helping bonus with team', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helpingBonusEffect: {
        context: 'team',
        stack: 3,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2482);
  });

  it('is correct calculating helping bonus as single', () => {
    const frequency = getBaseFrequencyFromPokemon({
      level: 30,
      subSkillBonus: {},
      pokemon: testPokemonData.absol,
      helpingBonusEffect: {
        context: 'single',
        active: true,
      },
      natureId: null,
      behavior: defaultUserCalculationBehavior,
    });

    expect(frequency).toBeCloseTo(2252);
  });
});
