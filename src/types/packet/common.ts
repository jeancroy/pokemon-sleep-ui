import {ApiActionWithToken} from '@/types/website/api';


export type PacketDataFromApiCommonProps<TData extends PacketDataCommonProps> = ApiActionWithToken & {
  source: string,
  data: Omit<TData, '_source'>[] | {[key in string]: Omit<TData, '_source'>},
};

export type PacketDataCommonProps = {
  _source: string,
};
