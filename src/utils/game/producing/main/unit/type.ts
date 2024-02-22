import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {ProducingRateImplicitParams, ProducingRateSingleParams} from '@/types/game/producing/rate/params';
import {GetBerryProducingRateBaseOpts} from '@/utils/game/producing/branch/berry/type';
import {GetIngredientProducingRateBaseListOpts} from '@/utils/game/producing/branch/ingredient/type';
import {GetMainSkillProducingRateBaseCommonOpts} from '@/utils/game/producing/branch/mainSkill/direct/type';
import {GetProducingRateSharedOpts} from '@/utils/game/producing/main/type';


export type GetPokemonProducingRateUnitOpts =
  Omit<
    GetBerryProducingRateBaseOpts & GetIngredientProducingRateBaseListOpts & GetMainSkillProducingRateBaseCommonOpts,
    'baseFrequency' | 'timeToFullPack'
  > &
  ProducingRateSingleParams &
  ProducingRateImplicitParams &
  GetProducingRateSharedOpts & {
    skillData: MainSkillData | undefined,
    recipeLevelData: RecipeLevelData[],
    pokemonProducingParams: PokemonProducingParams,
    helpingBonusEffect: HelpingBonusEffect,
  };
