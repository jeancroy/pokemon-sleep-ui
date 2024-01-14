import {getPacketSkillTriggerRateData} from '@/controller/packet/data/skillTrigger';


export const handlePacketSkillTriggerRateDataRequest = async () => {
  return Response.json(
    await getPacketSkillTriggerRateData(),
    {status: 200},
  );
};
