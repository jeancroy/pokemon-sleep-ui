import {calculateRatingValueIntraSpeciesSegmented} from '@/utils/game/rating/calc/promises/intraSegmented';
import {CalculateRatingDataWorkerOpts} from '@/utils/game/rating/calc/type';


const onMessage = ({data}: MessageEvent<CalculateRatingDataWorkerOpts>) => {
  postMessage(calculateRatingValueIntraSpeciesSegmented(data));
};

addEventListener('message', onMessage);
