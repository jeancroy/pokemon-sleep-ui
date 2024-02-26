import {PokeInBox} from '@/types/userData/pokebox';
import {Optional} from '@/utils/type';


export type PokeInBoxData = Optional<PokeInBox, 'dateAdded'> & {
  owner: string,
};
