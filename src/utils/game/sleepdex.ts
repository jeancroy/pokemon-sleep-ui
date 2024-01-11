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
import {toUnique} from '@/utils/array';
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
};

export const getAvailableSleepStylesFromNormal = <TReturn>({
  sleepStyles,
  extractor,
}: GetAvailableSleepStylesOpts<SleepStyleNormal, TReturn>): TReturn[] => {
  if (!sleepStyles) {
    return [];
  }

  return toUnique(sleepStyles.flatMap(({styles}) => styles.map(extractor)));
};

export const getAvailableSleepStylesFromSpecial = <TReturn>({
  sleepStyles,
  extractor,
}: GetAvailableSleepStylesOpts<SleepStyleSpecial, TReturn>): TReturn[] => {
  if (!sleepStyles) {
    return [];
  }

  return toUnique(sleepStyles.map(extractor));
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
