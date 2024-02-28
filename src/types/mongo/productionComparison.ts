import {MongoDataOfUser} from '@/types/mongo/user';
import {ProductionComparisonPreset} from '@/types/productionComparison';


export type ProductionComparisonPresetData = MongoDataOfUser & ProductionComparisonPreset;
