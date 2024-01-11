import {ApiActionWithToken} from '@/types/api';


export type PacketLotteryInfo = any;

export type PacketLotteryInfoFromApi = ApiActionWithToken & {
  data: PacketLotteryInfo,
};
