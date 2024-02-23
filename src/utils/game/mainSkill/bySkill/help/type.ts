import {BerryId} from '@/types/game/berry';
import {ProductionWithId} from '@/types/game/producing/rate/base';


export type MainSkillInstantHelpEffect = {
  helpCount: number,
  production: {
    berry: ProductionWithId<BerryId>,
    ingredient: ProductionWithId<BerryId>[],
  },
};
