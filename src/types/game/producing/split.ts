import {ProducingStateWithPack} from '@/types/game/producing/state';
import {ProduceType} from '@/types/game/producing/type';


export type ProducingStateSplit = {[state in ProducingStateWithPack]: number};

export type ProduceSplit = {[type in ProduceType]: number};
