import {ApplyMultiplierTarget} from '@/types/game/producing/apply';
import {ProducingRateByCalculatedStates, ProducingValueByCalculatedStates} from '@/types/game/producing/rate/base';
import {
  PokemonProducingRate,

} from '@/types/game/producing/rate/main';
import {producingStateCalculated} from '@/types/game/producing/state';


type ApplyMultiplierToProducingValueByCalculatedStatesOpts = {
  value: ProducingValueByCalculatedStates,
  isEffective: boolean,
  multiplier: number,
};

const applyMultiplierToProducingValueByCalculatedStates = ({
  value,
  isEffective,
  multiplier,
}: ApplyMultiplierToProducingValueByCalculatedStatesOpts): ProducingValueByCalculatedStates => {
  if (!isEffective) {
    return value;
  }

  return (
    Object.fromEntries(
      producingStateCalculated.map((state) => [state, value[state] * multiplier]),
    ) as ProducingValueByCalculatedStates
  );
};

type ApplyMultiplierCommonOpts = {
  target: ApplyMultiplierTarget[],
  multiplier: {
    original: number,
    target: number,
  },
};

type ApplyMultiplierToRateOfStatesOpts = ApplyMultiplierCommonOpts & {
  rate: ProducingRateByCalculatedStates,
};

export const applyMultiplierToRateOfStates = ({
  target,
  multiplier,
  rate,
}: ApplyMultiplierToRateOfStatesOpts): ProducingRateByCalculatedStates => {
  const multiplierToApply = multiplier.target / multiplier.original;

  return {
    ...rate,
    frequency: applyMultiplierToProducingValueByCalculatedStates({
      value: rate.frequency,
      isEffective: target.includes('frequency'),
      multiplier: 1 / multiplierToApply,
    }),
    qty: applyMultiplierToProducingValueByCalculatedStates({
      value: rate.qty,
      isEffective: target.includes('qty'),
      multiplier: multiplierToApply,
    }),
    strength: applyMultiplierToProducingValueByCalculatedStates({
      value: rate.strength,
      isEffective: target.includes('strength'),
      multiplier: multiplierToApply,
    }),
  };
};

type ApplyMultiplierToPokemonRateOpts = ApplyMultiplierCommonOpts & {
  rate: PokemonProducingRate,
};

export const applyMultiplierToPokemonRate = ({
  rate,
  ...opts
}: ApplyMultiplierToPokemonRateOpts): PokemonProducingRate => {
  const berry = applyMultiplierToRateOfStates({rate: rate.berry, ...opts});
  const ingredient = Object.values(rate.ingredient)
    .map((rate) => applyMultiplierToRateOfStates({rate, ...opts}));
  const skill = applyMultiplierToRateOfStates({rate: rate.skill, ...opts});

  return {
    ...rate,
    berry,
    ingredient,
    skill,
  };
};
