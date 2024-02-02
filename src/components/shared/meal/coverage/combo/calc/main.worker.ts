import {getMealCoverageComboData} from '@/components/shared/meal/coverage/combo/calc/main';
import {GetMealCoverageComboDataOpts} from '@/components/shared/meal/coverage/combo/calc/type';


const onMessage = async ({data}: MessageEvent<GetMealCoverageComboDataOpts>) => {
  postMessage(getMealCoverageComboData(data));
};

addEventListener('message', onMessage);
