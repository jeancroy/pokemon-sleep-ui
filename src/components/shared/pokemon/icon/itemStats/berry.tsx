import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonItemStatsFromPokebox} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/main';
import {PokemonItemStatsFromPokedex} from '@/components/shared/pokemon/icon/itemStats/base/fromPokedex';
import {PokemonItemStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/base/type';
import {PokemonBerryStatsCommonProps} from '@/components/shared/pokemon/icon/itemStats/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {BerryData} from '@/types/game/berry';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';


type Props = PokemonBerryStatsCommonProps & {
  input: PokemonIndividualParams,
  berryData: BerryData,
};

export const PokemonBerryStats = ({
  pokemonOfBerry,
  berryData,
  ...props
}: Props) => {
  const t = useTranslations('UI.Pokemon.Info');

  const commonProps: PokemonItemStatsCommonProps = {
    targetSpecialty: specialtyIdMap.berry,
    getItemRate: ({berry}) => berry,
    getIcon: ({berry}, dimension) => (
      <PokemonBerryIcon id={berry.id} dimension={dimension} noLink/>
    ),
  };

  return (
    <Flex className="gap-2">
      <PokemonItemStatsFromPokedex
        itemAlt={t('Berry')}
        itemImageSrc={`/images/berry/${berryData.id}.png`}
        {...commonProps}
        {...props}
      />
      <PokemonItemStatsFromPokebox
        filter={{
          internal: ({pokemonInfo}) => pokemonInfo.berry.id === berryData.id,
          external: {},
        }}
        {...commonProps}
        {...props}
      />
    </Flex>
  );
};
