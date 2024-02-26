import React from 'react';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import {clsx} from 'clsx';

import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {Dimension} from '@/types/style';
import {PokeInBox} from '@/types/userData/pokebox';


type Props = Omit<PokeboxImporterCommonProps, 'onPokeboxPicked'> & {
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
  noFullWidth?: boolean,
  dimension?: Dimension,
};

export const PokeboxImporterButton = ({onPokeboxPicked, noFullWidth, dimension, ...props}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PokeboxImporter
        {...props}
        show={show}
        setShow={setShow}
        onPokeboxPicked={(pokeInBox) => {
          onPokeboxPicked(pokeInBox);
          setShow(false);
        }}
      />
      <button onClick={() => setShow(true)} className="button-clickable-bg w-full p-1">
        <InboxArrowDownIcon className={clsx('m-auto', dimension ?? 'size-8')}/>
      </button>
    </>
  );
};
