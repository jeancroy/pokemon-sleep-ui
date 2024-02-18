import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {
  PokemonProducingRate,
  ProducingRateImplicitParams,
  ProducingRateSingleParams,
} from '@/types/game/producing/rate';
import {getMainSkillLevel} from '@/utils/game/mainSkill/level';
import {getSkillTriggerRatePercent} from '@/utils/game/mainSkill/utils';
import {getBerryProducingRate, GetBerryProducingRateOpts} from '@/utils/game/producing/branch/berry/main';
import {getIngredientProducingRates, GetIngredientProducingRatesOpts} from '@/utils/game/producing/branch/ingredient/main';
import {getMainSkillProducingRate, GetMainSkillProducingRateOpts} from '@/utils/game/producing/branch/mainSkill/main';
import {getBaseFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getCarryLimitInfo} from '@/utils/game/producing/inventory/carryLimit';
import {getFullPackStats} from '@/utils/game/producing/inventory/fullPackStats';
import {getExpectedQtyPerHelp} from '@/utils/game/producing/qtyPerHelp';
import {getProducingRateOfStates} from '@/utils/game/producing/rateReducer';
import {getProduceSplit, getProducingSleepStateSplit} from '@/utils/game/producing/split';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/type';
import {isFullPackEffective} from '@/utils/user/settings/utils';


export type GetPokemonProducingRateBaseOpts =
  Omit<
    GetBerryProducingRateOpts & GetIngredientProducingRatesOpts & GetMainSkillProducingRateOpts,
    'frequency' | 'skillRatePercent' | 'skillLevel' | 'timeToFullPack'
  > &
  ProducingRateSingleParams &
  ProducingRateImplicitParams &
  GetProducingRateSharedOpts & {
    recipeLevelData: RecipeLevelData[],
    pokemonProducingParams: PokemonProducingParams,
    helpingBonusEffect: HelpingBonusEffect,
  };

export const getPokemonProducingRateBase = ({
  seeds,
  evolutionCount,
  ...opts
}: GetPokemonProducingRateBaseOpts): PokemonProducingRate => {
  const {
    pokemon,
    calculatedSettings,
    pokemonProducingParams,
    natureId,
  } = opts;
  const {
    behavior,
    bonus,
  } = calculatedSettings;
  const {sleepSessionInfo} = bonus.stamina;

  const period = opts.period ?? defaultProductionPeriod;
  const subSkillBonus = opts.subSkillBonus ?? {};

  const frequency = getBaseFrequencyFromPokemon({
    ...opts,
    behavior,
    subSkillBonus,
  });
  const carryLimitInfo = getCarryLimitInfo({
    pokemon,
    evolutionCount,
    subSkillBonus,
    behavior,
  });

  const isFullPack = isFullPackEffective({
    fullPackBehavior: behavior.alwaysFullPack,
    specialty: pokemon.specialty,
  });

  const berry = getBerryProducingRate({
    frequency,
    ...opts,
  });
  const ingredient = getIngredientProducingRates({
    frequency,
    ...opts,
  });

  const produceSplit = getProduceSplit({
    isFullPack,
    ...opts,
  });
  const fullPackStats = getFullPackStats({
    intervalsDuringSleep: bonus.stamina.intervalsDuringSleep,
    isFullPack,
    carryLimit: carryLimitInfo.final,
    qtyPerHelp: getExpectedQtyPerHelp({
      rate: {berry, ingredient},
      produceSplit,
    }),
    frequency,
  });
  const sleepStateSplit = getProducingSleepStateSplit({
    sleepSessionInfo,
    fullPackStats,
  });
  // `skill` depends on `fullPackStats.secondsToFull`
  const skillRatePercent = getSkillTriggerRatePercent({
    baseSkillRatePercent: behavior.includeMainSkill ? pokemonProducingParams.skillPercent : 0,
    subSkillBonus,
    natureId,
  });
  const skill = getMainSkillProducingRate({
    frequency,
    skillLevel: getMainSkillLevel({
      seedsUsed: seeds.gold,
      evolutionCount,
      subSkillBonus,
    }),
    skillRatePercent,
    ...opts,
  });

  return {
    period,
    fullPackStats,
    sleepStateSplit,
    produceSplit,
    carryLimitInfo,
    skillRatePercent,
    berry: getProducingRateOfStates({
      period,
      rate: berry,
      produceType: 'berry',
      produceSplit,
      sleepStateSplit,
      isFullPack,
      ...opts,
    }),
    ingredient: Object.fromEntries(Object.values(ingredient).map((rate) => [
      rate.id,
      getProducingRateOfStates({
        period,
        rate,
        produceType: 'ingredient',
        produceSplit,
        sleepStateSplit,
        isFullPack,
        ...opts,
      }),
    ])),
    skill: getProducingRateOfStates({
      period,
      rate: skill,
      produceType: 'skill',
      produceSplit,
      sleepStateSplit,
      isFullPack,
      ...opts,
    }),
  };
};

