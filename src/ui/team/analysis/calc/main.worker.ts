import {getTeamProduction} from '@/ui/team/analysis/calc/main';
import {GetTeamProductionOpts} from '@/ui/team/analysis/calc/type';


const onMessage = ({data}: MessageEvent<GetTeamProductionOpts>) => {
  postMessage(getTeamProduction(data));
};

addEventListener('message', onMessage);
