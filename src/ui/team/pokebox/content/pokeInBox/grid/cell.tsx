import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {imageIconSizes} from '@/styles/image';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxGridPopUps} from '@/ui/team/pokebox/content/pokeInBox/grid/decorations/popup';
import {PokeInBoxDetails} from '@/ui/team/pokebox/content/pokeInBox/grid/details/main';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridCell = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    onClick,
    display,
    isLevelPreview,
  } = props;
  const {pokemon: pokemonId, isShiny} = pokeInBox;

  const {pokedexMap} = useCommonServerData();

  const pokemon = pokedexMap[pokemonId];

  const t = useTranslations('Game');

  if (!pokemon) {
    return null;
  }

  const pokemonName = t(`PokemonName.${pokemonId}`);

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    ratingBasis: display.ratingBasis,
    pokemon,
  };

  return (
    <div className="group relative w-full">
      <PokeInBoxGridPopUps pokemon={pokemon} pokemonName={pokemonName} {...props}/>
      <PokeInBoxLevel viewType="grid" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <button onClick={onClick} className={clsx(
        'button-clickable-bg w-full rounded-lg p-2',
        isShiny && '[&:not(:hover)]:info-highlight [&:not(:hover)]:info-section-opaque',
      )}>
        <Flex direction="row" className="relative h-24 gap-2">
          <div className="absolute bottom-0 right-0">
            <div className="relative size-16 opacity-50">
              <NextImage src={`/images/pokemon/icons/${pokemonId}.png`} alt={pokemonName} sizes={imageIconSizes}/>
            </div>
          </div>
          <Flex className="z-10 gap-1">
            <PokeInBoxMeta {...pokeInBoxProps}/>
            <div className="mt-auto">
              <PokeInBoxDetails displayType={display.displayOfGrid} {...pokeInBoxProps}/>
            </div>
          </Flex>
        </Flex>
      </button>
    </div>
  );
};
