import {describe, expect, it} from '@jest/globals';

import {defaultProductionCalcBehavior} from '@/const/game/production/defaults';
import {testPokemonProductionInitial} from '@/tests/production/pokemon';
import {getPokemonSkillRecoveryFromProduction} from '@/utils/game/producing/skill/skillRecovery';
import {cloneMerge} from '@/utils/object/cloneMerge';


describe('Pokemon Production (Skill) / Recovery from Production', () => {
  it('is correct when calculated as team', () => {
    const triggers = getPokemonSkillRecoveryFromProduction({
      rates: [
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 3}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'team', value: 18}},
          },
        ),
        testPokemonProductionInitial,
        testPokemonProductionInitial,
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 1}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'random', value: 20}},
          },
        ),
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 2}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'self', value: 36}},
          },
        ),
      ],
      calcBehavior: {
        ...defaultProductionCalcBehavior,
        asSingle: false,
      },
    });

    expect(triggers[0].type).toBe('override');
    expect(triggers[0].triggers).toHaveLength(2);
    expect(triggers[0].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[0].triggers[1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[1].type).toBe('override');
    expect(triggers[1].triggers).toHaveLength(2);
    expect(triggers[1].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[1].triggers[1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[2].type).toBe('override');
    expect(triggers[2].triggers).toHaveLength(2);
    expect(triggers[2].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[2].triggers[1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[3].type).toBe('override');
    expect(triggers[3].triggers).toHaveLength(2);
    expect(triggers[3].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[3].triggers[1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[4].type).toBe('override');
    expect(triggers[4].triggers).toHaveLength(3);
    expect(triggers[4].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[4].triggers[1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[4].triggers[2]).toMatchObject({dailyCount: 2, amount: 36});
  });

  it('is correct when calculated as individual', () => {
    const triggers = getPokemonSkillRecoveryFromProduction({
      rates: [
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 3}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'team', value: 18}},
          },
        ),
        testPokemonProductionInitial,
        testPokemonProductionInitial,
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 1}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'random', value: 20}},
          },
        ),
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 2}},
            intermediate: {activeSkillEffect: {type: 'stamina', target: 'self', value: 36}},
          },
        ),
      ],
      calcBehavior: {
        ...defaultProductionCalcBehavior,
        asSingle: true,
      },
    });

    expect(triggers[0].type).toBe('attach');
    expect(triggers[0].triggers).toHaveLength(1);
    expect(triggers[0].triggers[0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[1].type).toBe('attach');
    expect(triggers[1].triggers).toHaveLength(0);
    expect(triggers[2].type).toBe('attach');
    expect(triggers[2].triggers).toHaveLength(0);
    expect(triggers[3].type).toBe('attach');
    expect(triggers[3].triggers).toHaveLength(1);
    expect(triggers[3].triggers[0]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[4].type).toBe('attach');
    expect(triggers[4].triggers).toHaveLength(1);
    expect(triggers[4].triggers[0]).toMatchObject({dailyCount: 2, amount: 36});
  });
});
