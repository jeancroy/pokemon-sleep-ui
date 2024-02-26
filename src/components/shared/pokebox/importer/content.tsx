import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import {useTranslations} from 'next-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {usePokeboxImporterFilter} from '@/components/shared/pokebox/importer/filter';
import {PokeboxImporterCommonProps, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {PokeboxImporterUnit} from '@/components/shared/pokebox/importer/unit';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokeInBox} from '@/types/userData/pokebox';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterContent = ({pokebox, ...props}: Props) => {
  const {pokedexMap} = props;

  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.InPage.Pokedex');

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxImporterFilter({
    ...props,
    data: pokebox
      .map(({pokemon, ...pokeInBox}): PokeInBoxForFilter | null => {
        const pokemonInfo = pokedexMap[pokemon];

        if (!pokemonInfo) {
          return null;
        }

        return {
          ...pokeInBox,
          name: pokeInBox.name ?? t2(`PokemonName.${pokemon}`),
          search: [t2(`PokemonName.${pokemon}`), pokeInBox.name].filter(isNotNullish),
          pokemon: pokemonInfo,
        };
      })
      .filter(isNotNullish),
  });
  const collapsible = useCollapsibleControl();

  if (!pokebox.length) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  const filteredPokebox = pokebox.filter(({uuid}) => isIncluded[uuid]);

  return (
    <Flex className="gap-1.5">
      <Collapsible control={collapsible} classNameForHeight="h-72 md:h-56" button={
        <Flex direction="row" center className="gap-0.5">
          <FunnelIcon className="size-6"/>
        </Flex>
      }>
        <Flex noFullWidth className="gap-1 pr-1">
          <InputRowWithTitle title={t3('Info.Name')}>
            <InputBox
              type="text"
              value={filter.name}
              onChange={({target}) => setFilter((original) => ({
                ...original,
                name: target.value,
              }))}
            />
          </InputRowWithTitle>
          <PokemonFilter
            pokemonList={toPokemonList(pokedexMap)}
            filter={filter}
            setFilter={(getUpdated) => setFilter((original) => getUpdated(original))}
            {...props}
          />
        </Flex>
      </Collapsible>
      <Flex className="h-[50vh]">
        <AutoSizer disableWidth>
          {({height}) => (
            <FixedSizeList
              height={height}
              itemCount={filteredPokebox.length}
              itemSize={64}
              itemData={filteredPokebox}
              itemKey={(idx, data) => data[idx].uuid}
              width="100%"
              overscanCount={10}
            >
              {({style, data, index}) => {
                const pokeInBox = data[index];

                return (
                  <div style={style} className="pr-1">
                    <PokeboxImporterUnit pokeInBox={pokeInBox} {...props}/>
                  </div>
                );
              }}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Flex>
    </Flex>
  );
};
