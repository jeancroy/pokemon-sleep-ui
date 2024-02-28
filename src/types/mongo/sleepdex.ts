import {SleepdexData} from '@/types/game/sleepdex';
import {MongoDataOfUser} from '@/types/mongo/user';


export type SleepdexRecord = MongoDataOfUser & SleepdexData;
