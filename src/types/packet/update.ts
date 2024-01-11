import {ApiActionWithToken} from '@/types/api';


export type PacketUpdateData = any;

export type PacketUpdateDataFromApi = ApiActionWithToken & {
  data: PacketUpdateData,
};
