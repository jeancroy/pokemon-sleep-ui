import {DreamClusterData} from '@/types/game/dreamCluster';
import {PokedexMap} from '@/types/game/pokemon';


export type ResearchRankInfoTableDataProps = {
  pokedexMap: PokedexMap,
  dreamClusterData: DreamClusterData[],
};

export type ResearchRankInfoTableCommonProps = ResearchRankInfoTableDataProps & {
  showRewards: boolean,
};
