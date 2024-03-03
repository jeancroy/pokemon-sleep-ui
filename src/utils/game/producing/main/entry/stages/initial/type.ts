import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {
  GetPokemonProductionSharedOpts,
  GetPokemonProductionUnitOptsWithPayload,
} from '@/utils/game/producing/main/type';


export type GetPokemonProductionInitialRateCommonOpts<TPayload> = {
  helpingBonusEffect: HelpingBonusEffect,
  subSkillBonuses: GroupedSubSkillBonus[],
  rateOpts: GetPokemonProductionUnitOptsWithPayload<TPayload>[],
  sharedOpts: GetPokemonProductionSharedOpts,
};
