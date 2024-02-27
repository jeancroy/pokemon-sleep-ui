import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useTranslations} from 'next-intl';

import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {MapFilter} from '@/components/shared/map/filter';
import {toSnorlaxFavoriteBerryFromMapMeta} from '@/components/shared/snorlax/utils';
import {imageSmallIconSizes} from '@/styles/image';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {FilterWithSnorlaxFavorite, SnorlaxFavorite} from '@/types/game/snorlax';
import {toUnique} from '@/utils/array';
import {Indexable} from '@/utils/type';


type Props<
  TKey extends string,
  TFilter extends FilterWithSnorlaxFavorite<TKey>
> = FilterWithUpdaterProps<TFilter> & {
  filterKey: TKey,
  pokemonList: PokemonInfo[],
  fieldMetaMap: FieldMetaMap,
};

export const SnorlaxFavoriteInput = <
  TKey extends string,
  TFilter extends FilterWithSnorlaxFavorite<TKey>,
>({
  filter,
  setFilter,
  pokemonList,
  fieldMetaMap,
  ...props
}: Props<TKey, TFilter>) => {
  const {filterKey} = props;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Common');

  const snorlaxFavorite: SnorlaxFavorite = filter[filterKey];

  return (
    <>
      <MapFilter
        title={
          <Flex direction="row" center className="gap-0.5">
            <div className="relative size-7">
              <NextImage
                src="/images/generic/snorlax.png" alt={t2('SnorlaxFavorite')} sizes={imageSmallIconSizes}
              />
            </div>
            <PlusCircleIcon className="size-6"/>
            <div className="relative size-7">
              <NextImage
                src="/images/generic/map.png" alt={t2('Map')} sizes={imageSmallIconSizes}
                className="invert-on-light"
              />
            </div>
          </Flex>
        }
        mapIds={Object.keys(fieldMetaMap).map(Number)}
        {...getSingleSelectOnClickProps({
          filter: snorlaxFavorite,
          filterKey: 'mapId',
          setFilter: (getUpdated) => setFilter((original) => ({
            ...original,
            [filterKey]: getUpdated(original[filterKey]),
          } satisfies TFilter)),
          allowNull: true,
        })}
        isActive={(selectedMap) => selectedMap === snorlaxFavorite.mapId}
        onClick={(selected) => setFilter((original) => {
          const mapId = original[filterKey].mapId === selected ? null : selected;

          return {
            ...original,
            [filterKey]: {
              mapId,
              berry: mapId ? toSnorlaxFavoriteBerryFromMapMeta(fieldMetaMap[mapId]) : {},
            } satisfies SnorlaxFavorite,
          };
        })}
      />
      <FilterIconInput
        title={
          <Flex direction="row" center>
            <div className="relative size-7">
              <NextImage
                src="/images/generic/snorlax.png"
                alt={t2('SnorlaxFavorite')}
                sizes={imageSmallIconSizes}
              />
            </div>
          </Flex>
        }
        idToAlt={(id) => t(`Berry.${id.toString()}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={toUnique(pokemonList.map(({berry}) => berry.id)).sort((a, b) => a - b)}
        {...getMultiSelectOnClickProps<SnorlaxFavorite, Indexable>({
          filter: snorlaxFavorite,
          filterKey: 'berry',
          setFilter: (getUpdated) => setFilter((original) => ({
            ...original,
            [filterKey]: getUpdated(original[filterKey]),
          } satisfies TFilter)),
        })}
        disabled={!!snorlaxFavorite.mapId && !!fieldMetaMap[snorlaxFavorite.mapId]?.berry?.length}
      />
    </>
  );
};
