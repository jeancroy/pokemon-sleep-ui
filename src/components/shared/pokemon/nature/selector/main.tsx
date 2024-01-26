import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonNatureSelectorButton} from '@/components/shared/pokemon/nature/selector/button';
import {PokemonIndividualParamsSelectorButton} from '@/components/shared/pokemon/selector/button';
import {PokemonIndividualSelectorButtonProps} from '@/components/shared/pokemon/selector/type';
import {natureData} from '@/data/nature';
import {useSearchableData} from '@/hooks/search';
import {NatureId} from '@/types/game/pokemon/nature';


type Props = PokemonIndividualSelectorButtonProps & {
  nature: NatureId | null,
  setNature: (nature: NatureId | null) => void,
  hideName?: boolean,
};

export const PokemonNatureSelector = ({
  nature,
  setNature,
  hideName,
  ...selectButtonProps
}: Props) => {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const t = useTranslations('Game');

  const matchingNatureData = useSearchableData({
    search,
    data: natureData,
    getKeyword: (data) => [
      t(`Nature.${data.id}`),
      data.buff && t(`NatureEffect.${data.buff}`),
      data.nerf && t(`NatureEffect.${data.nerf}`),
    ].join(' '),
    getSorter: (a, b) => (
      (a.buff ?? 0) - (b.buff ?? 0) ||
      t(`Nature.${a.id}`).localeCompare(t(`Nature.${b.id}`))
    ),
  });

  const onClick = (id: NatureId | null) => {
    setNature(id);
    setShow(false);
  };

  return (
    <>
      <PokemonIndividualParamsSelectorButton setShow={setShow} {...selectButtonProps}>
        <PokemonNatureIndicator nature={nature} hideName={hideName}/>
      </PokemonIndividualParamsSelectorButton>
      <PopupCommon show={show} setShow={setShow}>
        <Flex className="max-w-2xl gap-2">
          <Flex direction="row" center className="gap-1.5">
            <MagnifyingGlassIcon className="size-6"/>
            <InputBox
              type="text"
              value={search}
              onChange={({target}) => setSearch(target.value)}
              className="w-full"
            />
          </Flex>
          {
            search &&
            <>
              <Flex direction="row" center wrap className="gap-2">
                {matchingNatureData.length ?
                  matchingNatureData.map((data) => (
                    <PokemonNatureSelectorButton
                      key={data.id} data={data} active={nature === data.id} onClick={() => onClick(data.id)}
                    />
                  )) :
                  <QuestionMarkCircleIcon className="size-14"/>}
              </Flex>
              <HorizontalSplitter className="my-2"/>
            </>
          }
          <Flex direction="row" center wrap className="gap-2">
            <PokemonNatureSelectorButton data={null} active={nature === null} onClick={() => onClick(null)}/>
            {natureData.map((data) => (
              <PokemonNatureSelectorButton
                key={data.id} data={data} active={nature === data.id} onClick={() => onClick(data.id)}
              />
            ))}
          </Flex>
        </Flex>
      </PopupCommon>
    </>
  );
};
