import React from 'react';

import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {displayTypeToTranslationId, sortTypeToTranslationId} from '@/ui/pokedex/index/input/const';
import {pokedexDisplayType, PokedexInputProps, pokedexSortType} from '@/ui/pokedex/index/input/type';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';


type Props = PokedexInputProps & PokedexClientCommonProps;

export const PokedexInput = ({pokedex, maxLevel, ...props}: Props) => {
  const {filter, setFilter} = props;
  const t = useTranslations('UI.InPage.Pokedex');

  return (
    <Flex direction="col" className="h-72 gap-1 overflow-x-hidden overflow-y-scroll md:h-52">
      <PokemonMapFilter
        highlight
        mapIds={toUnique(pokedex
          .flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId)))
          .sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'mapId',
        })}
      />
      {pokemonInputType.map((type) => (
        <PokemonFilter
          key={type}
          style={type === 'sleepType' || type === 'ingredientFixed' ? 'highlight' : 'normal'}
          type={type}
          filterKey={type}
          pokemon={pokedex}
          {...props}
        />
      ))}
      <InputRow>
        <Flex direction="col" className="p-1">
          <PokemonLevelSlider level={filter.level} maxLevel={maxLevel}
            setLevel={(level) => setFilter((original) => ({
              ...original,
              level,
            } satisfies PokedexInputProps['filter']))}/>
        </Flex>
      </InputRow>
      <FilterTextInput
        onClick={(display) => setFilter((original) => ({
          ...original,
          display,
        } satisfies PokedexInputProps['filter']))}
        isActive={(display) => filter.display === display}
        title={
          <Flex direction="row" center>
            <div className="h-6 w-6">
              <InformationCircleIcon/>
            </div>
          </Flex>
        }
        ids={[...pokedexDisplayType]}
        idToButton={(display) => t(displayTypeToTranslationId[display])}
        idToItemId={(display) => `displayType-${display}`}
      />
      <FilterTextInput
        onClick={(sort) => setFilter((original) => ({
          ...original,
          sort,
        } satisfies PokedexInputProps['filter']))}
        isActive={(sort) => filter.sort === sort}
        title={
          <Flex direction="row" center>
            <div className="h-6 w-6">
              <Bars3BottomLeftIcon/>
            </div>
          </Flex>
        }
        ids={[...pokedexSortType]}
        idToButton={(sort) => t(sortTypeToTranslationId[sort])}
        idToItemId={(sort) => `sortType-${sort}`}
      />
    </Flex>
  );
};
