import {testBaseProductionByState, testBaseProductionOfDrop} from '@/tests/production/rate';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';


export const testPokemonProductionInitial: PokemonProductionInitial = {
  params: {
    isFullPack: false,
    period: 'daily',
    frequency: NaN, // ignore
    carryLimitInfo: {
      base: NaN, // ignore
      final: NaN, // ignore
    },
    produceSplit: {
      berry: NaN, // ignore
      ingredient: NaN, // ignore
      skill: NaN, // ignore
    },
    skillTrigger: {
      ratePercent: NaN, // ignore
    },
    activeSkillEffect: null,
  },
  noSkillTriggerPercent: {
    primary: NaN, // ignore
    secondary: null,
  },
  producingStateSplit: {
    awake: NaN, // ignore
    sleep1Vacant: NaN, // ignore
    sleep1Filled: NaN, // ignore
    sleep2Vacant: NaN, // ignore
    sleep2Filled: NaN, // ignore
  },
  baseRates: {
    berry: testBaseProductionOfDrop,
    ingredient: [],
    skill: testBaseProductionOfDrop,
  },
  fullPackStats: {
    bySleep: {
      primary: null,
      secondary: null,
    },
  },
  berry: testBaseProductionByState,
  ingredient: {},
  skill: testBaseProductionByState,
};
