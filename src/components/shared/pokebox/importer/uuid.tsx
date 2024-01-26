import React from 'react';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';

import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {regexUuid} from '@/const/regex';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';


type Props = PokeboxImporterCommonProps;

export const PokeboxImporterViaUuid = ({onPokeboxPicked}: Props) => {
  const [uuid, setUuid] = React.useState('');
  const {actAsync, status} = useUserDataActor();

  if (!actAsync) {
    return null;
  }

  const pullPokeInBox = async () => {
    const {updated} = await actAsync({
      action: 'load',
      options: {
        type: 'pokeboxSingle',
        opts: {
          pokeInBoxUuid: uuid,
        },
      },
      getStatusOnCompleted: (updated) => (
        !!updated?.user.lazyLoaded.pokeboxSingle ? 'completed' : 'failed'
      ),
    });

    const pokeInBox = updated?.user.lazyLoaded.pokeboxSingle;
    if (!pokeInBox) {
      return;
    }

    onPokeboxPicked(migrate({
      original: pokeInBox,
      override: null,
      migrators: pokeInBoxMigrators,
      migrateParams: {},
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await pullPokeInBox();
  };

  return (
    <form onSubmit={onSubmit}>
      <InputRowWithTitle title="ID">
        <InputBox
          type="text"
          value={uuid}
          onChange={({target}) => setUuid(target.value)}
          className="w-full"
          pattern={regexUuid.source}
        />
        <button
          type="submit"
          className="enabled:button-clickable-bg disabled:button-disabled size-8 shrink-0 p-1"
          disabled={!regexUuid.test(uuid) || status === 'processing'}
        >
          <UserActionStatusIcon status={status} onWaitingOverride={<InboxArrowDownIcon/>}/>
        </button>
      </InputRowWithTitle>
    </form>
  );
};
