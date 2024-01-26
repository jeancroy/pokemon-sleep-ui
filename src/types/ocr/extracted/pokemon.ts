import {PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkillLevel, SubSkillId} from '@/types/game/pokemon/subSkill';
import {OcrTranslationOfLocale, OcrTranslationOfLocales} from '@/types/ocr/translation';


export type OcrTranslationsForPokemonInfoOfLocale = {
  name: OcrTranslationOfLocale<PokemonId>,
  subSkill: OcrTranslationOfLocale<SubSkillId>,
  nature: OcrTranslationOfLocale<NatureId>,
};

export type OcrTranslationsForPokemonInfo = OcrTranslationOfLocales<OcrTranslationsForPokemonInfoOfLocale>;

export type OcrExtractPokemonSubSkill = {
  id: SubSkillId,
  level: PokemonSubSkillLevel,
};

export type OcrExtractedPokemonInfo = {
  pokemonId: PokemonId | null,
  subSkills: OcrExtractPokemonSubSkill[],
  nature: NatureId | null,
};
