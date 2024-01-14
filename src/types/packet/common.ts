import {ApiActionWithToken} from '@/types/api';


export type PacketDataFromApiCommonPropsNonCompliant<TData extends PacketDataCommonProps> = ApiActionWithToken & {
  source: string,
  data: Omit<TData, '_source'>[] | {[key in string]: Omit<TData, '_source'>},
};

export type PacketDataFromApiCommonProps<TData extends PacketDataCommonProps> = ApiActionWithToken & {
  source: string,
  data: Omit<TData, '_source'>[],
};

export type PacketDataCommonProps = {
  _source: string,
};
