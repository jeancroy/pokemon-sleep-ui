import {getTeamProducingStats} from '@/ui/team/analysis/calc/main';
import {GetTeamProductionStatsOpts} from '@/ui/team/analysis/calc/type';


const onMessage = ({data}: MessageEvent<GetTeamProductionStatsOpts>) => {
  postMessage(getTeamProducingStats(data));
};

addEventListener('message', onMessage);
