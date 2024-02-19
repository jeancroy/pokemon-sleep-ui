import {ProducingStateWithPack} from '@/types/game/producing/state';


export const isProducingStateVacant: {[state in ProducingStateWithPack]: boolean} = {
  awake: true,
  sleep1Vacant: true,
  sleep1Filled: false,
  sleep2Vacant: true,
  sleep2Filled: false,
};
