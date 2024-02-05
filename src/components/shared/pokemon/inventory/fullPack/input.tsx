import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {textFilterButtonStyle} from '@/styles/input';


type Props = {
  title: string,
  alwaysFullPack: boolean | null,
  setAlwaysFullPack: (updated: boolean | null) => void,
};

export const PokemonIntentionalFullPackInput = ({title, alwaysFullPack, setAlwaysFullPack}: Props) => {
  const t = useTranslations('UI.Common');

  // Checks have to be exact comparison because of the possible `null` on `alwaysFullPack`
  return (
    <InputRowWithTitle
      title={<div className="px-1">{title}</div>}
      noFixedTitleWidth className="px-2"
      classOfDirectionOverride="md:flex-row"
    >
      <Flex direction="row" className="justify-center gap-1 md:justify-start">
        <ToggleButton
          active={alwaysFullPack === null}
          onClick={() => setAlwaysFullPack(null)}
          className={clsx('group', textFilterButtonStyle)}
        >
          {t('Default')}
        </ToggleButton>
        <ToggleButton
          active={alwaysFullPack === true}
          onClick={() => setAlwaysFullPack(true)}
          className={clsx('group', textFilterButtonStyle)}
        >
          <CheckCircleIcon className="size-6"/>
        </ToggleButton>
        <ToggleButton
          active={alwaysFullPack === false}
          onClick={() => setAlwaysFullPack(false)}
          className={clsx('group', textFilterButtonStyle)}
        >
          <XCircleIcon className="size-6"/>
        </ToggleButton>
      </Flex>
    </InputRowWithTitle>
  );
};
