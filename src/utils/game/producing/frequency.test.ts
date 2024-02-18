import {describe, expect, it} from '@jest/globals';

import {defaultUserCalculationBehavior} from '@/const/user/settings';
import {testPokemonData} from '@/tests/data/game/pokemon';
import {testBaseProducingRateOfBranch} from '@/tests/producing/rate';
import {getBaseFrequencyFromPokemon, getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';


describe('Pokemon Base Producing Frequency', () => {
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

describe('Item Rate of Sessions Frequency', () => {
  it('is correct for berry', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getFrequencyFromItemRateOfSessions({
      produceType: 'berry',
      produceItemSplit: 0.8,
      rate: {
        id: NaN, // Ignored
        rateBase: testBaseProducingRateOfBranch,
        awake: {
          ...testBaseProducingRateOfBranch,
          frequency: 1600,
        },
        sleep1: {
          ...testBaseProducingRateOfBranch,
          frequency: 2400,
        },
        sleep2: {
          ...testBaseProducingRateOfBranch,
          frequency: 2400,
        },
      },
      sleepStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 2 / 24,
        sleep2Vacant: 0,
        sleep2Filled: 0,
      },
    });

    expect(awake).toBeCloseTo(2000);
    expect(sleep1Vacant).toBeCloseTo(3000);
    expect(sleep1Filled).toBeCloseTo(2400);
    expect(sleep2Vacant).toBeCloseTo(3000);
    expect(sleep2Filled).toBeCloseTo(2400);
    expect(equivalent).toBeCloseTo(2215.38);
    expect(unfilledOnly).toBeCloseTo(2400);
  });

  it('is correct for ingredient', () => {
    const {
      awake,
      sleep1Vacant,
      sleep1Filled,
      sleep2Vacant,
      sleep2Filled,
      equivalent,
      unfilledOnly,
    } = getFrequencyFromItemRateOfSessions({
      produceType: 'ingredient',
      produceItemSplit: 0.2,
      rate: {
        id: NaN, // Ignored
        rateBase: testBaseProducingRateOfBranch,
        awake: {
          ...testBaseProducingRateOfBranch,
          frequency: 1600,
        },
        sleep1: {
          ...testBaseProducingRateOfBranch,
          frequency: 2400,
        },
        sleep2: {
          ...testBaseProducingRateOfBranch,
          frequency: 2400,
        },
      },
      sleepStateSplit: {
        awake: 16 / 24,
        sleep1Vacant: 6 / 24,
        sleep1Filled: 2 / 24,
        sleep2Vacant: 0,
        sleep2Filled: 0,
      },
    });

    expect(awake).toBeCloseTo(8000);
    expect(sleep1Vacant).toBeCloseTo(12000);
    expect(sleep1Filled).toBeCloseTo(Infinity);
    expect(sleep2Vacant).toBeCloseTo(12000);
    expect(sleep2Filled).toBeCloseTo(Infinity);
    expect(equivalent).toBeCloseTo(9600);
    expect(unfilledOnly).toBeCloseTo(9600);
  });
});
