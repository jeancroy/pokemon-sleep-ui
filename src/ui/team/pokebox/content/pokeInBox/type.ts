import React from 'react';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating/request';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {PokeInBox} from '@/types/userData/pokebox';
import {PokeInBoxChangeableProps} from '@/ui/team/pokebox/content/type';
import {PokeInBoxEditorState} from '@/ui/team/pokebox/editor/type';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';
import {PokeboxViewerDisplay, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxRefreshDependency = {
  filter: PokeboxViewerFilter,
  processedPokebox: SortedPokemonInfo<PokeInBox, PokemonInfoWithSortingPayload<PokeInBox>>[],
};

export type PokeInBoxPopupProps = {
  showPokemon: (pokemon: PokemonInfo) => void,
  setRatingPopupControl: (setupData: RatingSetupData) => void,
};

export type PokeInBoxViewCommonProps = {
  bundle: ConfigBundle,
  setEditingPokeInBox: React.Dispatch<React.SetStateAction<PokeInBoxEditorState | undefined>>,
};

export type PokeInBoxViewProps =
  PokeboxServerDataProps &
  PokeInBoxPopupProps &
  PokeInBoxRefreshDependency &
  PokeInBoxViewCommonProps & {
    isLevelPreview: boolean,
  };

export type PokeInBoxViewOfTypeProps = PokeInBoxViewProps;

export type PokeInBoxViewUnitProps = PokeboxServerDataProps & PokeInBoxPopupProps & PokeInBoxChangeableProps & {
  pokeInBox: PokeInBox,
  display: PokeboxViewerDisplay,
  onClick: () => void,
  isLevelPreview: boolean,
};
