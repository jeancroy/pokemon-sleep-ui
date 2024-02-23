import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {Flex} from '@/components/layout/flex/common';
import {
  pokemonProductionSingleDisplay,
  UsePokemonProductionSingleDisplayReturn,
} from '@/components/shared/pokemon/production/single/type';


type Props = {
  control: UsePokemonProductionSingleDisplayReturn,
  itemAlt: string,
  itemImageSrc: string,
};

export const PokemonProductionSingleDisplaySwitch = ({control, itemAlt, itemImageSrc}: Props) => {
  const {display, setDisplay} = control;

  const t = useTranslations('UI.InPage.Pokedex.Sort');

  return (
    <FilterIconInput
      onClick={(id) => setDisplay(id)}
      isActive={(id) => display === id}
      title={
        <Flex center>
          <EyeIcon className="size-6"/>
        </Flex>
      }
      ids={[...pokemonProductionSingleDisplay]}
      idToAlt={(id) => id === 'total' ? t('TotalEnergy') : itemAlt}
      idToImageSrc={(id) => id === 'total' ? '/images/generic/energy.png' : itemImageSrc}
    />
  );
};
