import {Collection} from 'mongodb';

import mongoPromise from '@/lib/mongodb';
import {PacketLotteryInfo} from '@/types/packet/lottery';


const getCollection = async (): Promise<Collection<PacketLotteryInfo>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketLotteryInfo>('lottery');
};

export const storePacketLotteryInfo = async (data: PacketLotteryInfo[]) => {
  return (await getCollection()).insertMany(data);
};

const addIndex = async () => {
  return Promise.all([
    (await getCollection()).createIndex({pid: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Packet lottery info index', e));
