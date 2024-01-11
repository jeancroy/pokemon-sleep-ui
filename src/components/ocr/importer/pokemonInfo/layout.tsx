import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OcrImporterControls} from '@/components/ocr/importer/controls/main';
import {
  OcrPokemonInfoImportCommonProps,
  OcrPokemonInfoImportState,
} from '@/components/ocr/importer/pokemonInfo/type';
import {toPokemonSubSkill} from '@/components/ocr/importer/pokemonInfo/utils';
import {OcrRenderImageData} from '@/components/ocr/type';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {PokemonSubSkillSelector} from '@/components/shared/pokemon/subSkill/selector/main';
import {OcrExtractedPokemonInfo} from '@/types/ocr/extracted/pokemon';


type Props = OcrPokemonInfoImportCommonProps & {
  data: OcrExtractedPokemonInfo,
  text: string,
  image: OcrRenderImageData,
};

export const OcrPokemonInfoImportLayout = ({
  subSkillMap,
  onCompleteImport,
  pokemonIdOverride,
  data,
  text,
  image,
}: Props) => {
  const [state, setState] = React.useState<OcrPokemonInfoImportState>({
    subSkill: toPokemonSubSkill(data.subSkills),
    ...data,
  });
  const {subSkill, nature} = state;
  const pokemonId = state.pokemonId ?? pokemonIdOverride ?? null;

  return (
    <Flex className="gap-1.5 p-10">
      <div className="relative h-20 w-20 self-center">
        <PokemonImage pokemonId={pokemonId} image={{type: 'default', image: 'icon'}} isShiny={false}/>
      </div>
      <Flex className="gap-1.5 md:flex-row">
        <PokemonSubSkillSelector
          subSkill={subSkill}
          setSubSkill={(subSkill) => setState((original) => ({
            ...original,
            subSkill,
          }))}
          subSkillMap={subSkillMap}
          classNameForHeight="h-8"
        />
        <PokemonNatureSelector
          nature={nature}
          setNature={(nature) => setState((original) => ({
            ...original,
            nature,
          }))}
          classNameForHeight="h-8"
        />
      </Flex>
      <OcrImporterControls
        text={text}
        image={image}
        onConfirm={() => pokemonId && onCompleteImport(pokemonId, state)}
        disableConfirm={!pokemonId}
      />
    </Flex>
  );
};
