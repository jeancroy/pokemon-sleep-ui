import {durationOfDay} from '@/const/common';
import {goodCampTicketBonus} from '@/const/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {helpingBonusSimpleMultiplier} from '@/utils/game/producing/const';
import {getHelpingBonusMultiplier} from '@/utils/game/producing/multiplier';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {roundDown} from '@/utils/number/round';


export type GetBaseFrequencyFromPokemonOpts = {
  pokemon: PokemonInfo,
  level: number,
  natureId: NatureId | null,
  subSkillBonus: GroupedSubSkillBonus,
  helpingBonusEffect: HelpingBonusEffect,
  behavior: UserCalculationBehavior,
};

export const getBaseFrequencyFromPokemon = ({
  pokemon,
  level,
  natureId,
  subSkillBonus,
  helpingBonusEffect,
  behavior,
}: GetBaseFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;
  const {frequency} = stats;

  const subSkillBonusRates = getSubSkillBonusValue(subSkillBonus, 'frequency');

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

type GetFrequencyOfStateFromPokemonRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateCalculated,
};

export const getFrequencyOfStateFromPokemonRate = ({rate, state}: GetFrequencyOfStateFromPokemonRateOpts) => {
  const {berry, ingredient} = rate;

  return 1 / (
    1 / berry.frequency[state] +
    toSum(Object.values(ingredient).map(({frequency}) => 1 / frequency[state]))
  );
};

export const getDailyHelpsOfStateFromPokemonRate = (opts: GetFrequencyOfStateFromPokemonRateOpts) => {
  return durationOfDay / getFrequencyOfStateFromPokemonRate(opts);
};
