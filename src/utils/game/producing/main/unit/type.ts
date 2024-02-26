import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {ProductionImplicitParams, ProductionSingleParams} from '@/types/game/producing/rate/params';
import {GetBerryProductionBaseOpts} from '@/utils/game/producing/branch/berry/type';
import {GetIngredientProductionBaseListOpts} from '@/utils/game/producing/branch/ingredient/type';
import {GetMainSkillProductionBaseCommonOpts} from '@/utils/game/producing/branch/mainSkill/direct/type';
import {GetPokemonProductionSharedOpts} from '@/utils/game/producing/main/type';


export type GetPokemonProductionUnitOpts =
  Omit<
    GetBerryProductionBaseOpts & GetIngredientProductionBaseListOpts & GetMainSkillProductionBaseCommonOpts,
    'baseFrequency' | 'timeToFullPack'
  > &
  ProductionSingleParams &
  ProductionImplicitParams &
  GetPokemonProductionSharedOpts & {
    skillData: MainSkillData,
    recipeLevelData: RecipeLevelData[],
    pokemonProducingParams: PokemonProducingParams,
    helpingBonusEffect: HelpingBonusEffect,
  };
