import {ResearchRankData} from '@/types/game/researchRank';
import {ResearchRankInfoTableDataProps} from '@/ui/info/researchRank/table/type';


export type ResearchRankInfoDataProps = ResearchRankInfoTableDataProps & {
  researchRankData: ResearchRankData[],
};
