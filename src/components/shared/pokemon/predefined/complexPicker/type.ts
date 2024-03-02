import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';


export type PokemonComplexFilter = PokemonInputFilter;

export type PokemonComplexFilterOnSelectOpts = {
  pokemon: PokemonInfo,
} & ({
  origin: 'pokedex',
  ingredients?: never,
  subSkill?: never,
  nature?: never,
} | {
  origin: 'ocr',
  ingredients?: never,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
} | {
  origin: 'pokebox',
  ingredients?: IngredientProductionAtLevels,
  subSkill?: PokemonSubSkill,
  nature?: NatureId | null,
});

export type PokemonComplexFilterOrigin = PokemonComplexFilterOnSelectOpts['origin'];

export type PokemonComplexFilterDataProps = {
  pokemonList: PokemonInfo[],
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type PokemonComplexFilterCommonProps = PokemonComplexFilterDataProps & {
  onPokemonPicked: (opts: PokemonComplexFilterOnSelectOpts) => void,
};
