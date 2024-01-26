import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import BookmarkIcon from '@heroicons/react/24/solid/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {usePokeboxImporterFilter} from '@/components/shared/pokebox/importer/filter';
import {PokeboxImporterCommonProps, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterView = ({
  pokedexMap,
  subSkillMap,
  onPokeboxPicked,
  pokebox,
  ...props
}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Common');
  const t4 = useTranslations('UI.InPage.Pokedex');

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
  const collapsible = useCollapsible();

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
      <Collapsible state={collapsible} classNameForHeight="h-72 md:h-56" button={
        <Flex direction="row" center className="gap-0.5">
          <FunnelIcon className="size-6"/>
        </Flex>
      }>
        <Flex noFullWidth className="gap-1 pr-1">
          <InputRowWithTitle title={t4('Info.Name')}>
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
                const {
                  pokemon,
                  level,
                  name,
                  subSkill,
                  nature,
                  isShiny,
                  isFavorite,
                } = pokeInBox;

                const pokemonDefaultName = t2(`PokemonName.${pokemon}`);

                return (
                  <div style={style} className="pr-1">
                    <FlexButton
                      key={pokeInBox.uuid}
                      direction="col"
                      noFullWidth={false}
                      className="button-clickable-bg group relative items-center p-1"
                      onClick={() => onPokeboxPicked(pokeInBox)}
                    >
                      <div className="absolute bottom-1 right-1">
                        <IconWithInfo
                          imageSrc={`/images/pokemon/icons/${pokemon}.png`}
                          imageAlt={t2(`PokemonName.${pokemon}`)}
                          imageDimension="size-12"
                          imageSizes={imageIconSizes}
                          info={level}
                          className="shrink-0 opacity-70"
                          classNameImage="rounded-lg"
                        />
                      </div>
                      <Flex direction="row" className={clsx('gap-1', isFavorite && pokeInBoxFavoriteStyle)}>
                        {
                          isShiny &&
                          <InfoIcon>
                            <div className="relative size-4">
                              <NextImage
                                src="/images/generic/flash.png" alt={t3('Shiny')}
                                sizes={imageSmallIconSizes} className="invert-on-light"
                              />
                            </div>
                          </InfoIcon>
                        }
                        {isFavorite && <BookmarkIcon className="size-5"/>}
                        <div className="truncate">
                          {name ?? pokemonDefaultName}
                        </div>
                      </Flex>
                      <Flex direction="row" className="gap-1">
                        <PokemonSubSkillIndicator
                          subSkill={subSkill}
                          subSkillMap={subSkillMap}
                          level={level}
                        />
                        <PokemonNatureIndicator nature={nature} hideName/>
                      </Flex>
                    </FlexButton>
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
