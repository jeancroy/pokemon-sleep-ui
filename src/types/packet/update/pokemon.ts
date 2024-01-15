import {PacketDataCommonProps, PacketDataFromApiCommonProps} from '@/types/packet/common';


export type PacketUpdatePokemonIngredientData = {
  item: string,
  type: number,
  num: number,
};

export type PacketUpdatePokemonData = PacketDataCommonProps & {
  pid: number,
  num: number,
  form: number,
  ptn: number,
  gen: number,
  nam: string,
  namfl: number,
  favfl: number,
  col: number,
  eveid: number,
  power: number,
  poupd: number,
  exp: number,
  rank: number,
  msklv: number,
  sbski: number[],
  pic: PacketUpdatePokemonIngredientData[],
  nat: number,
  sletm: number,
  skifc: number,
  sp: number,
  spe: number,
  lng: number,
  iteus: [],
  eiu: [],
  captm: number,
  capfi: number,
  capra: number,
  pictm: number,
  evcnt: number,
  poinf: {
    ingr: [],
    sbski: [],
  },
  updAt: number,
  sSp: number,
  bSp: number,
  fSp: number,
  pupds: number,
  nicsf: number,
};

export type PacketUpdatePokemonDataFromApi =
  PacketDataFromApiCommonProps<PacketUpdatePokemonData>;
