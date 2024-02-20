import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSpecialtyIcon} from '@/components/shared/pokemon/specialty/icon';
import {ratingBasisNameI18nId, ratingBasisSpecialty} from '@/const/game/rating';
import {RatingBasis} from '@/types/game/pokemon/rating/config';


type Props = {
  basis: RatingBasis | undefined,
  isActive?: boolean,
  larger?: boolean,
};

export const RatingBasisTitle = ({basis, isActive, larger}: Props) => {
  const t = useTranslations('UI.Rating.Basis');

  if (!basis) {
    return null;
  }

  return (
    <Flex direction="row" noFullWidth center className={clsx('gap-1', larger && 'text-2xl')}>
      {ratingBasisSpecialty[basis].map((specialty) => (
        <PokemonSpecialtyIcon
          key={specialty}
          specialty={specialty}
          active={isActive}
          dimension={larger ? 'size-6' : undefined}
        />
      ))}
      {t(ratingBasisNameI18nId[basis])}
    </Flex>
  );
};
