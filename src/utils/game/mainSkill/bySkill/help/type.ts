import {BerryId} from '@/types/game/berry';
import {ProducingRateWithId} from '@/types/game/producing/rate/base';


export type MainSkillInstantHelpEffect = {
  helpCount: number,
  production: {
    berry: ProducingRateWithId<BerryId>,
    ingredient: ProducingRateWithId<BerryId>[],
  },
};
