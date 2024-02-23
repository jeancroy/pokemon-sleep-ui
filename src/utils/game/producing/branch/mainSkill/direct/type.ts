import {ProductionCommonParams} from '@/types/game/producing/rate/params';


export type GetMainSkillProductionBaseCommonOpts = Omit<ProductionCommonParams, 'level'>;
