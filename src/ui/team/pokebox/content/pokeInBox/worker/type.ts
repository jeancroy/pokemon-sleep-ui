import {CommonServerDataCollection} from '@/types/website/data/common';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export type PokeInBoxCalcOpts = PokeInBoxCommonProps & Pick<
  CommonServerDataCollection,
  'mealMap' |
  'cookingRecoveryData' |
  'pokemonProducingParamsMap' |
  'pokedexMap' |
  'subSkillMap' |
  'berryDataMap' |
  'ingredientMap' |
  'ingredientChainMap' |
  'mainSkillMap' |
  'recipeLevelData' |
  'eventStrengthMultiplierData'
>;
