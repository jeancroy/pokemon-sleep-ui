import {ApiActionWithToken} from '@/types/api';


export type PacketDataFromApiCommonProps<TData extends PacketDataCommonProps> = ApiActionWithToken & {
  source: string,
  data: Omit<TData, '_source'>[],
};

export type PacketDataCommonProps = {
  _source: string,
};
