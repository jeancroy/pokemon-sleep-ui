import {getTeamProducingStats} from '@/ui/team/analysis/calc/main';
import {GetTeamProducingStatsOpts} from '@/ui/team/analysis/calc/type';


const onMessage = ({data}: MessageEvent<GetTeamProducingStatsOpts>) => {
  postMessage(getTeamProducingStats(data));
};

addEventListener('message', onMessage);
