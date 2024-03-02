import React from 'react';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {PokemonVanillaPresetInput} from '@/components/shared/pokemon/predefined/vanillaPreset/main';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';


export const TeamMakerInputVanillaPresets = ({
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    source,
    vanillaPresets,
  } = input;

  return (
    <AnimatedCollapse show={source === 'vanilla'}>
      <PokemonVanillaPresetInput
        filter={vanillaPresets}
        setFilter={(getUpdated) => setInput(({vanillaPresets, ...original}) => ({
          ...original,
          vanillaPresets: getUpdated(vanillaPresets),
        }))}
        className="gap-1"
      />
    </AnimatedCollapse>
  );
};
