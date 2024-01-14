import {PacketDataCommonProps, PacketDataFromApiCommonPropsNonCompliant} from '@/types/packet/common';


type ConvertPacketDataFromApiToCompliantFormatToDataOpts<
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonPropsNonCompliant<TData>
> = {
  source: TDataFromApi['source'],
  data: Omit<TData, '_source'>,
  key: string | null,
};

type ConvertPacketDataFromApiToCompliantFormatOpts<
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonPropsNonCompliant<TData>
> = {
  dataFromApi: TDataFromApi,
  toData: (opts: ConvertPacketDataFromApiToCompliantFormatToDataOpts<TData, TDataFromApi>) => TData,
};

export const convertPacketDataFromApiToCompliantFormat = <
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonPropsNonCompliant<TData>
>({
  dataFromApi,
  toData,
}: ConvertPacketDataFromApiToCompliantFormatOpts<TData, TDataFromApi>): TData[] => {
  const {data, source} = dataFromApi;

  if (Array.isArray(data)) {
    return [...data].map((entry): TData => toData({
      source,
      data: entry,
      key: null,
    }));
  }

  return Object.entries(data).map(([key, entry]): TData => toData({
    source,
    data: entry,
    key,
  }));
};
