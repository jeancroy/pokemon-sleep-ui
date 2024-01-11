import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PacketLotteryInfo} from '@/types/packet/lottery';


const getCollection = async (): Promise<Collection<PacketLotteryInfo>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketLotteryInfo>('lottery');
};

export const storePacketLotteryInfo = async (data: PacketLotteryInfo) => {
  return (await getCollection()).insertOne(data);
};
