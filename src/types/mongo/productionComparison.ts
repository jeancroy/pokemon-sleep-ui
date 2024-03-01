import {MongoDataOfUser} from '@/types/mongo/user';
import {ProductionComparisonPreset} from '@/types/website/feature/productionComparison';


export type ProductionComparisonPresetData = MongoDataOfUser & ProductionComparisonPreset;
