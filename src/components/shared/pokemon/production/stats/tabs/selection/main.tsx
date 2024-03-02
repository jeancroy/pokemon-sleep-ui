import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {pokemonDetailedProductionTabsI18nId} from '@/components/shared/pokemon/production/stats/tabs/const';
import {
  pokemonDetailedProductionTabs,
  PokemonDetailedProductionTabs,
} from '@/components/shared/pokemon/production/stats/tabs/type';


type Props = {
  tab: PokemonDetailedProductionTabs,
  setTab: React.Dispatch<React.SetStateAction<PokemonDetailedProductionTabs>>,
};

export const PokemonDetailedProductionTabSelection = ({tab, setTab}: Props) => {
  const t = useTranslations('UI.Component.PokemonDetailedProduction.Tab');

  return (
    <FilterTextInput
      title={<EyeIcon className="size-6"/>}
      ids={[...pokemonDetailedProductionTabs]}
      idToText={(tab) => t(pokemonDetailedProductionTabsI18nId[tab])}
      onClick={setTab}
      isActive={(current) => current === tab}
    />
  );
};
