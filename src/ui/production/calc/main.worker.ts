import {getProductionComparisonPresetStats} from '@/ui/production/calc/main';
import {GetProductionComparisonTargetStatsOpts} from '@/ui/production/calc/type';


const onMessage = ({data}: MessageEvent<GetProductionComparisonTargetStatsOpts>) => {
  postMessage(getProductionComparisonPresetStats(data));
};

addEventListener('message', onMessage);
