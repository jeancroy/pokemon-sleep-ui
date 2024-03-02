import {PokemonId} from '@/types/game/pokemon';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {OcrExtractedPokemonInfo} from '@/types/ocr/extracted/pokemon';


export type OcrPokemonInfoImportState = Omit<OcrExtractedPokemonInfo, 'subSkills'> & {
  subSkill: PokemonSubSkill,
};

export type OcrPokemonInfoImportCommonProps = {
  onCompleteImport: (pokemonId: PokemonId, state: OcrPokemonInfoImportState) => void,
  pokemonIdOverride?: PokemonId,
};
