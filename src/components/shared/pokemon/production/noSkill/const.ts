import {ProducingStateWithPack} from '@/types/game/producing/state';
import {SleepSession} from '@/types/game/sleep';


export const sleepSessionToProducingStateForNoSkillProbability: {
  [session in SleepSession]: ProducingStateWithPack
} = {
  primary: 'sleep1Vacant',
  secondary: 'sleep2Vacant',
};
