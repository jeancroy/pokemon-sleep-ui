import {describe, expect, it} from '@jest/globals';

import {testPokemonProductionInitial} from '@/tests/production/pokemon';
import {getPokemonSkillRecoveryFromProduction} from '@/utils/game/producing/skill/skillRecovery';
import {cloneMerge} from '@/utils/object/cloneMerge';


describe('Pokemon Production (Skill) / Recovery from Production', () => {
  it('is correct', () => {
    const triggers = getPokemonSkillRecoveryFromProduction({
      rates: [
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 3}},
            params: {activeSkillEffect: {type: 'stamina', target: 'team', value: 18}},
          },
        ),
        testPokemonProductionInitial,
        testPokemonProductionInitial,
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 1}},
            params: {activeSkillEffect: {type: 'stamina', target: 'random', value: 20}},
          },
        ),
        cloneMerge(
          testPokemonProductionInitial,
          {
            skill: {qty: {equivalent: 2}},
            params: {activeSkillEffect: {type: 'stamina', target: 'self', value: 36}},
          },
        ),
      ],
    });

    expect(triggers[0][0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[0][1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[1][0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[1][1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[2][0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[2][1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[3][0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[3][1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[4][0]).toMatchObject({dailyCount: 3, amount: 18});
    expect(triggers[4][1]).toMatchObject({dailyCount: 1, amount: 4});
    expect(triggers[4][2]).toMatchObject({dailyCount: 2, amount: 36});
  });
});
