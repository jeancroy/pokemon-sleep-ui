import React from 'react';

import {useTranslations} from 'next-intl';

import {I18nProvider} from '@/components/i18n/provider';
import {Flex} from '@/components/layout/flex/common';
import {ItemIcon} from '@/components/shared/icon/item';
import {ItemId} from '@/types/game/item';
import {PokemonInfo} from '@/types/game/pokemon';
import {Locale} from '@/types/next/locale';
import {EvolutionIconPokemon} from '@/ui/item/evolution/pokemon';


type Props = {
  locale: Locale,
  itemId: ItemId,
  pokemonList: PokemonInfo[],
};

export const EvolutionItemSingle = ({locale, itemId, pokemonList}: Props) => {
  const t = useTranslations('Game');
  const itemName = t(`Item.${itemId}`);

  return (
    <Flex center className="info-section-bg h-full gap-1.5 rounded-lg p-2">
      <Flex direction="row" center>
        <ItemIcon
          itemId={itemId}
          alt={itemName}
          dimension="h-12 w-12"
          noInvert
        />
        <div className="text-lg">{itemName}</div>
      </Flex>
      <Flex direction="row" center className="gap-2">
        <I18nProvider locale={locale} namespaces={['Game', 'UI.Metadata']}>
          <EvolutionIconPokemon pokemonList={pokemonList}/>
        </I18nProvider>
      </Flex>
    </Flex>
  );
};
