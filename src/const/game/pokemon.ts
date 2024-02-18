import {defaultLevel} from '@/const/game/production/defaults';
import {PokemonEventTypeId, PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {SubSkillBonusCategory, SubSkillId} from '@/types/game/pokemon/subSkill';


export const specialtyIdMap: {[name in SpecialtyType]: PokemonSpecialtyId} = {
  berry: 1,
  ingredient: 2,
  skill: 3,
};

export const specialtyIdToType: {[id in PokemonSpecialtyId]: SpecialtyType} = {
  [specialtyIdMap.berry]: 'berry',
  [specialtyIdMap.ingredient]: 'ingredient',
  [specialtyIdMap.skill]: 'skill',
};

export const specialtyImageSrcMap: {[id in PokemonSpecialtyId]: string} = {
  1: '/images/generic/berry.png',
  2: '/images/generic/ingredient.png',
  3: '/images/generic/mainSkill.png',
};

export const subSkillBonusImageSrcMap: {[bonus in SubSkillBonusCategory]: string} = {
  exp: '/images/subSkill/exp.png',
  helper: '/images/subSkill/helper.png',
  stamina: '/images/subSkill/stamina.png',
  shard: '/images/subSkill/shard.png',
  research: '/images/subSkill/research.png',
  frequency: '/images/subSkill/frequency.png',
  berryCount: '/images/subSkill/berryCount.png',
  inventory: '/images/subSkill/inventory.png',
  skillLevel: '/images/subSkill/skillLevel.png',
  ingredientProbability: '/images/subSkill/ingredientProbability.png',
  mainSkillProbability: '/images/subSkill/mainSkillProbability.png',
};

export const subSkillImageOverride: {[id in SubSkillId]?: string} = {
  19: '/images/subSkill/inventory2.png',
};

export const defaultPokemonEventType: PokemonEventTypeId = 1;

export const defaultPokemonIndividualParams: PokemonIndividualParams = {
  level: defaultLevel,
  subSkill: {},
  nature: null,
};

export const undefinedIngredientChainId = -1;
