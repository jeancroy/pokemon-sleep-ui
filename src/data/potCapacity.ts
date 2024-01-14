import potCapacity from '@/data/potCapacity.json';
import {toUnique} from '@/utils/array';


export const potCapacityData = potCapacity;

export const potPossibleCapacity = toUnique(potCapacity.map(({capacity}) => capacity)).sort((a, b) => a - b);
