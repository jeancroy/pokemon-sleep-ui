import {GetSkillTriggerValueCommonOpts} from '@/ui/team/mainskill/calc/type';
import {SkillTriggerAnalysisCalcResult, SkillTriggerAnalysisCalculatedUnit} from '@/ui/team/mainskill/targets/type';
import {SkillTriggerAnalysisUnit} from '@/ui/team/mainskill/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';


type GetSkillTriggerValueOfUnitOpts = GetSkillTriggerValueCommonOpts & {
  id: string,
  unit: SkillTriggerAnalysisUnit,
  base: SkillTriggerAnalysisCalcResult<number> | null,
};

export const getSkillTriggerValueOfUnit = ({
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
}: GetSkillTriggerValueOfUnitOpts): SkillTriggerAnalysisCalculatedUnit | null => {
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
  const {subSkillBonus} = singleParams;

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

  const skillTriggerValue = getSkillTriggerValue({
    rate,
    skillValue: pokemonProducingParams.skillValue,
    natureId: nature,
    subSkillBonus,
  });
  const skillTriggerCount = rate.skill.qty.equivalent;

  return {
    ...unit,
    id,
    skillTriggerValue: {
      actual: skillTriggerValue,
      ratioToBase: base ? skillTriggerValue / base.skillTriggerValue : 1,
    },
    skillTriggerCount: (
      skillTriggerCount ?
        {
          actual: skillTriggerCount,
          ratioToBase: base?.skillTriggerCount ? skillTriggerCount / base.skillTriggerCount : 1,
        } :
        null
    ),
  };
};
