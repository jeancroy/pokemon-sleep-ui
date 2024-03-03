import {ApplyMultiplierTarget} from '@/types/game/producing/apply';
import {ProductionByCalculatedStates, ProductionValueByCalculatedStates} from '@/types/game/producing/rate/base';
import {
  PokemonProduction,

} from '@/types/game/producing/rate/main';
import {producingStateCalculated} from '@/types/game/producing/state';


type ApplyMultiplierToProducingValueByCalculatedStatesOpts = {
  value: ProductionValueByCalculatedStates,
  isEffective: boolean,
  multiplier: number,
};

const applyMultiplierToProducingValueByCalculatedStates = ({
  value,
  isEffective,
  multiplier,
}: ApplyMultiplierToProducingValueByCalculatedStatesOpts): ProductionValueByCalculatedStates => {
  if (!isEffective) {
    return value;
  }

  return (
    Object.fromEntries(
      producingStateCalculated.map((state) => [state, value[state] * multiplier]),
    ) as ProductionValueByCalculatedStates
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
  rate: ProductionByCalculatedStates,
};

export const applyMultiplierToRateOfStates = ({
  target,
  multiplier,
  rate,
}: ApplyMultiplierToRateOfStatesOpts): ProductionByCalculatedStates => {
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
  rate: PokemonProduction,
};

export const applyMultiplierToPokemonRate = ({
  rate,
  ...opts
}: ApplyMultiplierToPokemonRateOpts): PokemonProduction => {
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
