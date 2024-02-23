import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonInfo} from '@/types/game/pokemon';
import {RatingSetupData} from '@/types/game/pokemon/rating/request';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getProductionImplicitParamsFromPokeInbox} from '@/utils/game/producing/params';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


type Props = PokeInBoxViewUnitProps & {
  pokemon: PokemonInfo,
  setRatingPopupControl: (setupData: RatingSetupData) => void,
};

export const PokeInBoxOpenRatingButton = ({
  pokeInBox,
  snorlaxFavorite,
  bundle,
  pokemon,
  setRatingPopupControl,
}: Props) => {
  const t = useTranslations('UI.Metadata');

  return (
    <button className="button-clickable group relative size-6" onClick={() => setRatingPopupControl({
      ...pokeInBox,
      pokemon,
      snorlaxFavorite,
      basis: getDefaultRatingBasis(pokemon.specialty),
      friendshipLevel: 0,
      bundle,
      ...getProductionImplicitParamsFromPokeInbox({pokeInBox}),
    })}>
      <GenericIconLarger src="/images/generic/search.png" alt={t('Rating.Title')}/>
    </button>
  );
};
