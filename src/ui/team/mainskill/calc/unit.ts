import {GetSkillTriggerAnalysisCalcUnitCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalcResult, SkillTriggerAnalysisCalcUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';


type GetSkillTriggerAnalysisCalcUnitOpts = GetSkillTriggerAnalysisCalcUnitCommonOpts & {
  id: string,
  unit: SkillTriggerAnalysisUnit,
  base: SkillTriggerAnalysisCalcResult<number> | null,
};

export const getSkillTriggerAnalysisCalcUnit = ({
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  recipeLevelData,
  calculatedConfigBundle,
  id,
  unit,
  base,
  ...opts
}: GetSkillTriggerAnalysisCalcUnitOpts): SkillTriggerAnalysisCalcUnit | null => {
  const {
    level,
    pokemonId,
    nature,
    subSkill,
    ingredients,
  } = unit;

  const pokemon = pokedexMap[pokemonId];
  if (!pokemon) {
    return null;
  }

  const {berry, skill} = pokemon;
  const {
    bundle,
    snorlaxFavorite,
    calculatedCookingConfig,
  } = calculatedConfigBundle;

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId,
    pokemonProducingParamsMap,
  });
  const singleParams = getProducingRateSingleParams({
    level,
    subSkill,
    nature,
    subSkillMap,
  });

  const rate = getPokemonProducingRateSingle({
    ...opts,
    // `unit` could have `pokemon` from Poke-in-box, therefore it should always be at the top
    ...unit,
    ...singleParams,
    pokemon,
    snorlaxFavorite,
    bundle,
    calculatedCookingConfig,
    berryData: berryDataMap[berry.id],
    ingredientMap,
    mealMap,
    skillData: mainSkillMap[skill],
    recipeLevelData,
    pokemonProducingParams,
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    // For HB to be evaluated as team member instead of individual
    calcBehavior: {asSingle: false},
  }).atStage.final;

  const skillTriggerCount = rate.skill.qty.equivalent;

  return {
    ...unit,
    id,
    skillTriggerCount: {
      actual: skillTriggerCount,
      diffPercentToBase: base?.skillTriggerCount ? skillTriggerCount / base.skillTriggerCount * 100 - 100 : 0,
    },
  };
};
