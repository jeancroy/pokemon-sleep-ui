import {durationOfDay} from '@/const/common';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {FullPackStats} from '@/types/game/producing/carryLimit';
import {ProduceSplit, ProducingSleepStateSplit} from '@/types/game/producing/split';
import {SleepSessionInfo} from '@/types/game/sleep';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export type GetProduceSplitOpts = {
  pokemonProducingParams: PokemonProducingParams,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  isFullPack: boolean,
};

export const getProduceSplit = ({
  pokemonProducingParams,
  natureId,
  subSkillBonus,
  isFullPack,
}: GetProduceSplitOpts): ProduceSplit => {
  if (isFullPack) {
    return {
      berry: 1,
      ingredient: 0,
      skill: 0,
    };
  }

  let ingredientSplit = pokemonProducingParams.ingredientSplit;

  ingredientSplit *= (1 + toSum(getSubSkillBonusValue(subSkillBonus, 'ingredientProbability')) / 100);
  ingredientSplit *= getNatureMultiplier({id: natureId, effect: 'rateOfIngredient'});

  return {
    berry: 1 - ingredientSplit,
    ingredient: ingredientSplit,
    skill: 1,
  };
};

type GetProducingSleepStateSplitOpts = {
  sleepSessionInfo: SleepSessionInfo,
  fullPackStats: FullPackStats,
};

export const getProducingSleepStateSplit = ({
  sleepSessionInfo,
  fullPackStats,
}: GetProducingSleepStateSplitOpts): ProducingSleepStateSplit => {
  const {
    session,
    duration,
  } = sleepSessionInfo;
  const {secondsToFull} = fullPackStats;
  const {primary, secondary} = session;

  const secondaryDuration = secondary?.duration.actual ?? 0;

  const primaryTimeToFull = secondsToFull.primary ?? primary.duration.actual;
  const secondaryTimeToFull = secondsToFull.secondary ?? secondaryDuration;

  return {
    awake: duration.awake / durationOfDay,
    sleep1Vacant: primaryTimeToFull / durationOfDay,
    sleep1Filled: (primary.duration.actual - primaryTimeToFull) / durationOfDay,
    sleep2Vacant: secondaryTimeToFull / durationOfDay,
    sleep2Filled: (secondaryDuration - secondaryTimeToFull) / durationOfDay,
  };
};
