import {ApiActionWithToken} from '@/types/api';


export type PacketLotteryInfoItems = {
  item: string,
  typ: number,
  num: number,
};

export type PacketLotterySkillTriggers = {
  id: number,
  time: number,
  tgt: null,
};

export type PacketLotteryInfo = {
  pid: number,
  times: number[],
  items: PacketLotteryInfoItems[],
  skill: PacketLotterySkillTriggers[],
};

export type PacketLotteryInfoFromApi = ApiActionWithToken & {
  data: PacketLotteryInfo[],
};
