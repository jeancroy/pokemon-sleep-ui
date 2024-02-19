import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {CarryLimitInfo} from '@/types/game/producing/inventory';
import {ProducingRateImplicitParams, ProducingRateSingleParams} from '@/types/game/producing/rate';
import {ProduceSplit} from '@/types/game/producing/split';
import {GetBerryProducingRateBaseOpts} from '@/utils/game/producing/branch/berry/type';
import {GetIngredientProducingRateBaseListOpts} from '@/utils/game/producing/branch/ingredient/type';
import {GetMainSkillProducingRateBaseOpts} from '@/utils/game/producing/branch/mainSkill/type';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/main/type';


export type PokemonProducingRateParams = {
  isFullPack: boolean,
  period: ProductionPeriod,
  frequency: number,
  subSkillBonus: GroupedSubSkillBonus,
  carryLimitInfo: CarryLimitInfo,
  produceSplit: ProduceSplit,
  skillRatePercent: number,
};

export type GetPokemonProducingRateBaseOpts =
  Omit<
    GetBerryProducingRateBaseOpts & GetIngredientProducingRateBaseListOpts & GetMainSkillProducingRateBaseOpts,
    'baseFrequency' | 'skillRatePercent' | 'skillLevel' | 'timeToFullPack'
  > &
  ProducingRateSingleParams &
  ProducingRateImplicitParams &
  GetProducingRateSharedOpts & {
    recipeLevelData: RecipeLevelData[],
    pokemonProducingParams: PokemonProducingParams,
    helpingBonusEffect: HelpingBonusEffect,
  };
