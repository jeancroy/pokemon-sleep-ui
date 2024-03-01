import {MongoDataOfUser} from '@/types/mongo/user';
import {TeamAnalysisComp, TeamAnalysisConfig} from '@/types/website/feature/teamAnalysis';


export type TeamAnalysisConfigData = MongoDataOfUser & TeamAnalysisConfig;

export type TeamAnalysisCompData = MongoDataOfUser & TeamAnalysisComp;
