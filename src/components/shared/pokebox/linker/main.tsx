import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {InputBox} from '@/components/input/box';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxLinkerCurrentPokemon} from '@/components/shared/pokebox/linker/current/main';
import {usePokeboxLinker} from '@/components/shared/pokebox/linker/hook';
import {PokeboxLinkerDataProps, PokeboxLinkerState} from '@/components/shared/pokebox/linker/type';


type Props = PokeboxLinkerDataProps & {
  onLinked: (uuid: string | null) => void,
};

export const PokeboxLinker = ({onLinked, ...props}: Props) => {
  const t = useTranslations('UI.Common');
  const {
    state,
    setState,
    onPokeInBoxSelected,
  } = usePokeboxLinker();

  const {pokeInBoxUuid, pokeInBoxPreview, showImporter} = state;
  const effectivePokeInBoxUuid = pokeInBoxPreview ? pokeInBoxUuid : null;

  return (
    <Flex className="gap-1.5">
      <PokeboxImporter
        onPokeboxPicked={(pokeInBox) => onPokeInBoxSelected(pokeInBox)}
        show={showImporter}
        setShow={(showImporter) => setState((original) => ({
          ...original,
          showImporter,
        } satisfies PokeboxLinkerState))}
        {...props}
      />
      <FlexForm direction="row" className="items-center gap-1" onSubmit={() => onLinked(effectivePokeInBoxUuid)}>
        <InputBox
          type="text"
          value={pokeInBoxUuid}
          onChange={({target}) => setState(({pokeInBoxUuid, ...original}) => ({
            ...original,
            pokeInBoxUuid: target.value,
          } satisfies PokeboxLinkerState))}
          className="w-full"
        />
        <button
          type="submit"
          className="enabled:button-clickable-bg disabled:button-disabled size-7 p-1"
          disabled={!effectivePokeInBoxUuid && !!pokeInBoxUuid}
        >
          <LinkIcon/>
        </button>
      </FlexForm>
      <PokeboxLinkerCurrentPokemon pokeInBox={pokeInBoxPreview} {...props}/>
      <FlexButton
        center
        className="button-clickable-bg gap-1 p-2 text-lg"
        onClick={() => setState((original) => ({
          ...original,
          showImporter: true,
        } satisfies PokeboxLinkerState))}
      >
        <InboxArrowDownIcon className="size-6"/>
        <span>{t('Pokebox')}</span>
      </FlexButton>
      <AdsUnit/>
    </Flex>
  );
};
