import {ProductionPeriod} from '@/types/game/producing/display';


export const productionMultiplierByPeriod: {[period in ProductionPeriod]: number} = {
  daily: 1,
  weekly: 7,
};
