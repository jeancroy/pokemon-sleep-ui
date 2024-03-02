import {getAnalysisStatsOfPokemon} from '@/ui/analysis/page/calc/pokemon/main';
import {getAnalysisStatsOfProduction} from '@/ui/analysis/page/calc/production/main';
import {AnalysisStats, GetAnalysisStatsWorkerOpts} from '@/ui/analysis/page/calc/type';


const onMessage = ({data}: MessageEvent<GetAnalysisStatsWorkerOpts>) => {
  const analysisStats: AnalysisStats = {
    pokemon: getAnalysisStatsOfPokemon(data),
    production: getAnalysisStatsOfProduction(data),
  };

  postMessage(analysisStats);
};

addEventListener('message', onMessage);
