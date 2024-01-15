import {handlePacketSkillTriggerRateDataRequest} from '@/handler/packet/data/skillTrigger';
import {RouteDynamic} from '@/types/next/route';


export const dynamic: RouteDynamic = 'force-dynamic';

export const GET = handlePacketSkillTriggerRateDataRequest;
