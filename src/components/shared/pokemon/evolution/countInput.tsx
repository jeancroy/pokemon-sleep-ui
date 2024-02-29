import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {textFilterButtonStyle} from '@/styles/input';


type Props = {
  evolutionCount: number,
  maxEvolutionCount: number,
  setEvolutionCount: (evolutionCount: number) => void,
};

export const PokemonEvolutionCountInput = ({
  evolutionCount,
  maxEvolutionCount,
  setEvolutionCount,
}: Props) => {
  const t = useTranslations('UI.Component.PokemonFilter');

  const text = t('EvolutionCount');

  return (
    <FilterExpandedInput
      noFixedTitleWidth
      title={
        <Flex direction="row" className="items-center justify-end gap-0.5 px-2">
          <GenericIconLarger src="/images/generic/flash.png" alt={text}/>
          <div>{text}</div>
        </Flex>
      }
      idToButton={(id) => (
        <span className="mx-1">
          {id}
        </span>
      )}
      ids={[...new Array(maxEvolutionCount).keys()]}
      onClick={setEvolutionCount}
      isActive={(id) => evolutionCount === id}
      className={textFilterButtonStyle}
    />
  );
};
