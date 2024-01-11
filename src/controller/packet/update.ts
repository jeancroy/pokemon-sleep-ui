import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PacketUpdateData} from '@/types/packet/update';


const getCollection = async (): Promise<Collection<PacketUpdateData>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketUpdateData>('update');
};

export const storePacketUpdateData = async (data: PacketUpdateData) => {
  return (await getCollection()).insertOne(data);
};
