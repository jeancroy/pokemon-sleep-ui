import {productionMultiplierByPeriod} from '@/const/game/production/multiplier';
import {
  GroupedProducingRate,
  PokemonProducingRate,
  ProducingRate,
  ProducingRateOfBranch,
  ProducingRateOfBranchByState,
  ProducingRateOfStates,
  ProducingValueOfStates,
} from '@/types/game/producing/rate';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {ProducingState, producingState, ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {getFrequencyFromItemRateOfSessions} from '@/utils/game/producing/frequency';
import {GetProduceSplitOpts} from '@/utils/game/producing/split';
import {GetItemRateOfSessionCommonOpts, GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
import {isNotNullish, KeysOfType} from '@/utils/type';


type GetProducingRateOfStatesOpts =
  GetProduceSplitOpts &
  GetItemRateOfSessionCommonOpts & {
    produceSplit: ProduceSplit,
    sleepStateSplit: ProducingSleepStateSplit,
  };

export const getProducingRateOfStates = (opts: GetProducingRateOfStatesOpts): ProducingRateOfStates => {
  const {
    period,
    rate,
    produceType,
    produceSplit,
    sleepStateSplit,
  } = opts;
  const {id} = rate;

  const produceItemSplit = produceSplit[produceType];

  return {
    id,
    period,
    frequency: getFrequencyFromItemRateOfSessions({
      ...opts,
      sleepStateSplit,
      produceItemSplit,
    }),
    quantity: getValueAfterSplitFromItemRateOfSessions({
      ...opts,
      valueKey: 'quantity',
      sleepStateSplit,
      produceItemSplit,
    }),
    energy: getValueAfterSplitFromItemRateOfSessions({
      ...opts,
      valueKey: 'energy',
      sleepStateSplit,
      produceItemSplit,
    }),
  };
};

type GetMergedItemRateByStateOpts = {
  rates: ProducingRateOfBranchByState[],
  frequencyMultiplier: number,
};

export const getMergedItemRateByState = ({
  rates,
  frequencyMultiplier,
}: GetMergedItemRateByStateOpts): ProducingRateOfBranchByState => {
  const firstRate = rates.at(0);

  if (!firstRate) {
    throw new Error('Empty rate data for merging');
  }

  return {
    id: firstRate.id,
    rateBase: firstRate.rateBase,
    ...Object.fromEntries(producingState.map((state) => [
      state,
      {
        ...firstRate[state],
        frequency: firstRate[state].frequency * (frequencyMultiplier / rates.length),
        quantity: toSum(rates.map((rate) => rate[state].quantity)),
        energy: toSum(rates.map((rate) => rate[state].energy)),
        qtyPerHelp: toSum(rates.map((rate) => rate[state].qtyPerHelp)),
      } satisfies ProducingRateOfBranch,
    ])) as {[state in ProducingState]: ProducingRateOfBranch},
  };
};

type GetValueAfterSplitFromItemSessionRateOpts = GetSpecificItemRateOfSessionCommonOpts & {
  valueKey: KeysOfType<ProducingRateOfBranch, number>,
};

export const getValueAfterSplitFromItemRateOfSessions = ({
  period,
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
  valueKey,
}: GetValueAfterSplitFromItemSessionRateOpts): ProducingValueOfStates => {
  const periodMultiplier = productionMultiplierByPeriod[period];

  const awake = (
    periodMultiplier * rate.awake[valueKey] * produceItemSplit * sleepStateSplit.awake
  );
  const sleepVacantBase = periodMultiplier * produceItemSplit;

  const sleep1Vacant = sleepVacantBase * rate.sleep1[valueKey] * sleepStateSplit.sleep1Vacant;
  const sleep1Filled = (
    periodMultiplier * (produceType === 'berry' ? rate.sleep1[valueKey] : 0) * sleepStateSplit.sleep1Filled
  );
  const sleep2Vacant = sleepVacantBase * rate.sleep2[valueKey] * sleepStateSplit.sleep2Vacant;
  const sleep2Filled = (
    periodMultiplier * (produceType === 'berry' ? rate.sleep2[valueKey] : 0) * sleepStateSplit.sleep2Filled
  );
  const unfilledOnly = awake + sleep1Vacant + sleep2Vacant;
  const equivalent = unfilledOnly + sleep1Filled + sleep2Filled;

  return {
    awake,
    sleep1Vacant,
    sleep1Filled,
    sleep2Vacant,
    sleep2Filled,
    equivalent,
    unfilledOnly,
  };
};

type GetTotalOfItemRatesOpts = {
  rates: ProducingRateOfStates[],
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateOfRate,
};

export const getTotalOfItemRates = ({rates, target, state}: GetTotalOfItemRatesOpts): number => (
  toSum(rates.map((rate) => rate[target][state]))
);

type GetTotalOfGroupedProducingRateOpts = {
  rate: GroupedProducingRate<number>,
  key: KeysOfType<ProducingRate, number>,
};

export const getTotalOfGroupedProducingRate = ({rate, key}: GetTotalOfGroupedProducingRateOpts) => {
  return toSum(Object.values(rate).filter(isNotNullish).map((rate) => rate[key]));
};

type GetPokemonProducingRateComponentOpts = {
  rate: PokemonProducingRate,
  target: KeysOfType<ProducingRate, number>,
  state: ProducingStateOfRate,
};

export const getTotalIngredientRateOfPokemon = ({
  rate,
  target,
  state,
}: GetPokemonProducingRateComponentOpts) => (
  getTotalOfItemRates({rates: Object.values(rate.ingredient), target, state})
);

export const getTotalOfPokemonProducingRate = ({
  rate,
  state,
}: Omit<GetPokemonProducingRateComponentOpts, 'target'>): ProducingRate => {
  const {period, berry, skill} = rate;

  return {
    period,
    quantity: (
      // Not adding `skill.energy[state]` here because this quantity is used for calculating carry limit,
      // but skill trigger count doesn't occupy inventory space
      berry.quantity[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'quantity', state})
    ),
    energy: (
      berry.energy[state] +
      getTotalIngredientRateOfPokemon({rate, target: 'energy', state}) +
      skill.energy[state]
    ),
  };
};

export const getTotalEnergyOfPokemonProducingRate = (rate: PokemonProducingRate): number => {
  return getTotalOfPokemonProducingRate({rate, state: 'equivalent'}).energy;
};
