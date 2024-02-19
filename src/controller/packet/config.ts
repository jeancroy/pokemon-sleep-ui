import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {PacketRecordingConfig} from '@/types/packet/config';
import {Nullable} from '@/utils/type';


const getCollection = async (): Promise<Collection<PacketRecordingConfig>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketRecordingConfig>('settings');
};

export const getPacketRecordingConfig = (): Promise<Nullable<PacketRecordingConfig>> => {
  return getSingleData(getCollection());
};

type UpdatePacketRecordingConfigOpts = ControllerRequireUserIdOpts & {
  updated: PacketRecordingConfig,
};

export const updatePacketRecordingConfig = async ({
  executorUserId,
  updated,
}: UpdatePacketRecordingConfigOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne({}, {$set: updated}, {upsert: true});
};
