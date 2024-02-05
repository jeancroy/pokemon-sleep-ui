import {durationOfDay} from '@/const/common';
import {goodCampTicketBonus} from '@/const/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {PokemonProducingRate, ProducingValueOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {UserCalculationBehavior} from '@/types/userData/settings/behavior';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {helpingBonusSimpleMultiplier} from '@/utils/game/producing/const';
import {getHelpingBonusMultiplier} from '@/utils/game/producing/multiplier';
import {GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {roundDown} from '@/utils/number/round';


type GetBaseFrequencyOpts = {
  level: number,
  frequency: PokemonInfo['stats']['frequency'],
  natureId: NatureId | null,
  subSkillBonusRates: number[],
  helpingBonusEffect: HelpingBonusEffect,
  behavior: UserCalculationBehavior,
};

const getBaseFrequency = ({
  level,
  frequency,
  natureId,
  subSkillBonusRates,
  helpingBonusEffect,
  behavior,
}: GetBaseFrequencyOpts) => {
  const {context} = helpingBonusEffect;

  let bonus = (1 - (level - 1) * 0.002);
  bonus *= getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});
  // https://x.com/emuptea/status/1711238322780266825
  // 0.35 is the mandatory cap from the officials
  bonus *= (
    1 -
    Math.min(
      0.35,
      toSum(subSkillBonusRates) / 100 + (context === 'team' ? getHelpingBonusMultiplier(helpingBonusEffect.stack) : 0),
    )
  );

  if (context === 'single' && helpingBonusEffect.active) {
    bonus /= helpingBonusSimpleMultiplier;
  }

  if (behavior.goodCampTicket) {
    bonus /= goodCampTicketBonus.frequencyDivisor;
  }

  bonus = roundDown({value: bonus, decimals: 4});

  return roundDown({value: frequency * bonus, decimals: 0});
};

export type GetFrequencyFromPokemonOpts = Pick<
  GetBaseFrequencyOpts,
  'behavior' | 'helpingBonusEffect' | 'natureId'
> & {
  level: number,
  subSkillBonus: GroupedSubSkillBonus,
  pokemon: PokemonInfo,
};

export const getBaseFrequencyFromPokemon = ({
  subSkillBonus,
  pokemon,
  ...opts
}: GetFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;

  return getBaseFrequency({
    frequency: stats.frequency,
    subSkillBonusRates: getSubSkillBonusValue(subSkillBonus, 'frequency'),
    ...opts,
  });
};

type GetFrequencyFromItemRateOfSessionsOpts = Omit<GetSpecificItemRateOfSessionCommonOpts, 'period'>;

export const getFrequencyFromItemRateOfSessions = ({
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
}: GetFrequencyFromItemRateOfSessionsOpts): ProducingValueOfStates => {
  const multiplier = 1 / produceItemSplit;

  const awake = multiplier * rate.awake.frequency;
  const sleep1Vacant = multiplier * rate.sleep1.frequency;
  const sleep1Filled = produceType === 'berry' ? rate.sleep1.frequency : Infinity;
  const sleep2Vacant = multiplier * rate.sleep2.frequency;
  const sleep2Filled = produceType === 'berry' ? rate.sleep2.frequency : Infinity;

  const unfilledOnlyDivisor = (
    sleepStateSplit.awake / awake +
    sleepStateSplit.sleep1Vacant / sleep1Vacant +
    sleepStateSplit.sleep2Vacant / sleep2Vacant
  );
  const filledDivisor = (
    sleepStateSplit.sleep1Filled / sleep1Filled +
    sleepStateSplit.sleep2Filled / sleep2Filled
  );

  const unfilledOnly = 1 / unfilledOnlyDivisor;
  const equivalent = 1 / (unfilledOnlyDivisor + filledDivisor);

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

type GetHelpingCountFromPokemonRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const getDailyHelpsOfStateFromPokemonRate = ({rate, state}: GetHelpingCountFromPokemonRateOpts) => {
  const {berry, ingredient} = rate;

  return durationOfDay * (
    1 / berry.frequency[state] +
    toSum(Object.values(ingredient).map(({frequency}) => 1 / frequency[state]))
  );
};

export const getFrequencyOfStateFromPokemonRate = (opts: GetHelpingCountFromPokemonRateOpts) => {
  return durationOfDay / getDailyHelpsOfStateFromPokemonRate(opts);
};
