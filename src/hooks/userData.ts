import React from 'react';

import {useSession} from 'next-auth/react';

import {useOverridableSession} from '@/hooks/session';
import {UserDataActionStatus, UserDataActor} from '@/types/userData/main';


type UseUserDataActorReturn = {
  act: UserDataActor | null,
  status: UserDataActionStatus,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (override?: ReturnType<typeof useSession>): UseUserDataActorReturn => {
  const [status, setStatus] = React.useState<UserDataActionStatus>('waiting');
  const session = useOverridableSession(override);

  const userDataActor: UserDataActor = (action) => {
    setStatus('processing');
    session.update(action)
      .then(() => setStatus('completed'))
      .catch((err) => {
        console.error(`Failed to [${action.action}] user data of [${action.options.type}]`, err);
        setStatus('failed');
      });
  };

  React.useEffect(() => {
    if (status !== 'completed' && status !== 'failed') {
      return;
    }

    const timeoutId = setTimeout(() => setStatus('waiting'), 2500);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return {
    act: session.data ? userDataActor : null,
    status,
    session,
  };
};
