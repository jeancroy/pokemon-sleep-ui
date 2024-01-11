import {Collection} from 'mongodb';

import {getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import mongoPromise from '@/lib/mongodb';
import {PacketRecordingSettings} from '@/types/packet/settings';
import {Nullable} from '@/utils/type';


const getCollection = async (): Promise<Collection<PacketRecordingSettings>> => {
  const client = await mongoPromise;

  return client
    .db('packet')
    .collection<PacketRecordingSettings>('settings');
};

export const getPacketRecordingSettings = (): Promise<Nullable<PacketRecordingSettings>> => {
  return getSingleData(getCollection());
};

type UpdatePacketRecordingSettingsOpts = ControllerRequireUserIdOpts & {
  updated: PacketRecordingSettings,
};

export const updatePacketRecordingSettings = async ({
  executorUserId,
  updated,
}: UpdatePacketRecordingSettingsOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne({}, {$set: updated}, {upsert: true});
};
