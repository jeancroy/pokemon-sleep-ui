import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {imageIconSizes} from '@/styles/image';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {inputSectionHeight} from '@/ui/team/pokebox/const';
import {usePokeboxPickerFilter} from '@/ui/team/pokebox/filter/hook';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {showToast} from '@/utils/toast';


type Props = PokeboxCommonProps & {
  pokemonList: PokemonInfo[],
  onClick: (pokemonId: PokemonId) => void,
};

export const PokeboxPickerInput = ({pokemonList, onClick, ...props}: Props) => {
  const t = useTranslations('Game');
  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxPickerFilter({
    data: pokemonList,
    ...props,
  });
  const pickerCollapsible = useCollapsible();
  const resultCollapsible = useCollapsible();

  React.useEffect(() => {
    resultCollapsible.setShow(true);
  }, [filter]);

  return (
    <Flex className="gap-1.5">
      <Collapsible state={pickerCollapsible} classNameForHeight={inputSectionHeight} button={
        <Flex direction="row" center className="gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <InboxArrowDownIcon className="h-6 w-6"/>
          <FunnelIcon className="h-6 w-6"/>
        </Flex>
      }>
        <PokemonFilter
          className="pr-1"
          pokemonList={pokemonList}
          filter={filter}
          setFilter={setFilter}
          {...props}
        />
      </Collapsible>
      <Collapsible state={resultCollapsible} classNameForHeight={inputSectionHeight} appear button={
        <Flex direction="row" center className="group gap-0.5">
          <GenericPokeballIcon alt="Pokemon" dimension="h-6 w-6"/>
          <InboxArrowDownIcon className="h-6 w-6"/>
        </Flex>
      }>
        <PokemonClickableIcons pokemonList={pokemonList.filter(({id}) => isIncluded[id])} onClick={(pokemon) => {
          const {id} = pokemon;

          showToast({content: (
            <Flex direction="row" className="gap-1.5">
              <PlusCircleIcon className="h-9 w-9"/>
              <div className="relative h-9 w-9">
                <NextImage
                  src={`/images/pokemon/icons/${id}.png`} alt={t(`PokemonName.${id}`)}
                  sizes={imageIconSizes}
                />
              </div>
              <div className="self-end text-sm">
                #{id}
              </div>
            </Flex>
          )});
          onClick(id);
        }}/>
      </Collapsible>
    </Flex>
  );
};
