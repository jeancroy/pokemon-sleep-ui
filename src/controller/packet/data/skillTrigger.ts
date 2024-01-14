import mongoPromise from '@/lib/mongodb';
import {PacketSkillTriggerRateData} from '@/types/packet/data/skillTrigger';
import {PacketUpdatePokemonData} from '@/types/packet/update/pokemon';


export const getPacketSkillTriggerRateData = async (): Promise<PacketSkillTriggerRateData[]> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketUpdatePokemonData>('skillTriggerRate')
    .find()
    .toArray();
};
