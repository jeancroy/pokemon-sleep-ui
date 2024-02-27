import {getTeamAnalysisCompsOfUser} from '@/controller/user/teamAnalysis/comp';
import {getTeamAnalysisConfigOfUser} from '@/controller/user/teamAnalysis/config';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {Nullable} from '@/utils/type';


export const getUserTeamAnalysisContent = async (userId?: string): Promise<Nullable<UserTeamAnalysisContent>> => {
  if (!userId) {
    return null;
  }

  const [config, comps] = await Promise.all([
    getTeamAnalysisConfigOfUser(userId),
    getTeamAnalysisCompsOfUser(userId),
  ]);

  if (!config) {
    return null;
  }

  return {config, comps};
};
