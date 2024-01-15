import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';


type ConvertPacketDataFromApiToStorableConverterOpts<
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonProps<TData>
> = {
  source: TDataFromApi['source'],
  data: Omit<TData, '_source'>,
  key: string | null,
};

type ConvertPacketDataFromApiToStorableOpts<
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonProps<TData>
> = {
  dataFromApi: TDataFromApi,
  toData: (opts: ConvertPacketDataFromApiToStorableConverterOpts<TData, TDataFromApi>) => TData,
};

export const convertPacketDataFromApiToStorable = <
  TData extends PacketDataCommonProps,
  TDataFromApi extends PacketDataFromApiCommonProps<TData>
>({
  dataFromApi,
  toData,
}: ConvertPacketDataFromApiToStorableOpts<TData, TDataFromApi>): TData[] => {
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
