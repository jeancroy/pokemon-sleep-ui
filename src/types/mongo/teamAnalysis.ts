import {MongoDataOfUser} from '@/types/mongo/user';
import {TeamAnalysisComp, TeamAnalysisConfig} from '@/types/teamAnalysis';


export type TeamAnalysisConfigData = MongoDataOfUser & TeamAnalysisConfig;

export type TeamAnalysisCompData = MongoDataOfUser & TeamAnalysisComp;
