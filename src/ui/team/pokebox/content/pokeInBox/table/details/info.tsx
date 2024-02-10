import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokeInBoxMeta} from '@/components/shared/pokebox/meta';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokeInBoxLevel} from '@/ui/team/pokebox/content/pokeInBox/common/level';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableInfo = (props: PokeInBoxTableDetailsProps) => {
  const {pokeInBox, pokemon, isLevelPreview} = props;
  const {specialty} = pokemon;

  return (
    <>
      <PokeInBoxLevel viewType="table" level={pokeInBox.level} isLevelPreview={isLevelPreview}/>
      <div className="w-60">
        <PokeInBoxMeta {...props}/>
      </div>
      <Flex center noFullWidth className={clsx(
        'mx-1 rounded-lg p-1',
        specialty === specialtyIdMap.ingredient ? 'info-highlight' : 'bg-slate-500/30',
      )}>
        <PokemonIngredientIcons
          ingredients={[Object.values(pokeInBox.ingredients).map((ingredient) => ingredient)]}
          dimension="size-5"
          noQuantity
        />
      </Flex>
    </>
  );
};
