import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';


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

export type PacketLotteryInfo = PacketDataCommonProps & {
  pid: number,
  times: number[],
  items: PacketLotteryInfoItems[],
  skill: PacketLotterySkillTriggers[],
};

export type PacketLotteryInfoFromApi = PacketDataFromApiCommonProps<PacketLotteryInfo>;
