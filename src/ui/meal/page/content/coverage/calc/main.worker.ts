import {toSortedMealContentCoverageItemData} from '@/ui/meal/page/content/coverage/calc/main';
import {ToSortedMealContentCoverageItemDataOpts} from '@/ui/meal/page/content/coverage/calc/type';


const onMessage = ({data}: MessageEvent<ToSortedMealContentCoverageItemDataOpts>) => {
  const result = toSortedMealContentCoverageItemData(data);

  postMessage(result);
};

addEventListener('message', onMessage);
