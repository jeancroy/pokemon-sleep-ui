import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMap, SleepdexStyleId} from '@/types/game/sleepdex';
import {
  SleepStyleCommon,
  SleepStyleId,
  SleepStyleNormal,
  SleepStyleNormalMap,
  SleepStyleSpecial,
  SleepStyleSpecialMap,
} from '@/types/game/sleepStyle';
import {toUnique, toUniqueWithKey} from '@/utils/array';
import {isNotNullish, Nullable} from '@/utils/type';


type ToSleepdexByMapIdOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const toSleepdexStyleId = ({pokemonId, styleId}: ToSleepdexByMapIdOpts): SleepdexStyleId => (
  `${pokemonId}-${styleId}`
);

export type IsInSleepdexOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
  sleepdex: SleepdexMap,
};

export const isInSleepdex = ({pokemonId, styleId, sleepdex}: IsInSleepdexOpts) => {
  const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
  return sleepdex[sleepdexId];
};

type GetAvailableSleepStylesOpts<TData, TReturn> = {
  sleepStyles: Nullable<TData[]>,
  extractor: (sleepStyle: SleepStyleCommon) => TReturn,
  getKey: (data: TReturn) => SleepStyleId,
};

export const getAvailableSleepStylesFromNormal = <TReturn>({
  sleepStyles,
  extractor,
  getKey,
}: GetAvailableSleepStylesOpts<SleepStyleNormal, TReturn>): TReturn[] => {
  if (!sleepStyles) {
    return [];
  }

  return toUniqueWithKey<TReturn, SleepStyleId>({
    arr: sleepStyles.flatMap(({styles}) => styles.map(extractor)),
    getKey,
  });
};

export const getAvailableSleepStylesFromSpecial = <TReturn>({
  sleepStyles,
  extractor,
  getKey,
}: GetAvailableSleepStylesOpts<SleepStyleSpecial, TReturn>): TReturn[] => {
  if (!sleepStyles) {
    return [];
  }

  return toUniqueWithKey<TReturn, SleepStyleId>({
    arr: sleepStyles.map(extractor),
    getKey,
  });
};

type GetAllPossibleSleepStylesOpts = {
  normal: SleepStyleNormalMap,
  special: SleepStyleSpecialMap,
};

export const getAllPossibleSleepStyles = ({normal, special}: GetAllPossibleSleepStylesOpts): SleepdexStyleId[] => {
  const totalOfNormal = toUnique(Object.values(normal)
    .filter(isNotNullish)
    .flatMap((sleepStyles) => (
      sleepStyles.flatMap(({pokemonId, styles}) => (
        styles.map(({style}) => toSleepdexStyleId({pokemonId, styleId: style}))
      ))
    )),
  );

  const totalOfSpecial = toUnique(Object.values(special)
    .filter(isNotNullish)
    .flatMap((sleepStyles) => (
      sleepStyles.flatMap(({pokemonId, style}) => (
        toSleepdexStyleId({pokemonId, styleId: style})
      ))
    )),
  );

  return [...totalOfNormal, ...totalOfSpecial];
};
