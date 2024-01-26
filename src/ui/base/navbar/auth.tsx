import React from 'react';

import ArrowLeftCircleIcon from '@heroicons/react/24/outline/ArrowLeftCircleIcon';
import ArrowRightCircleIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  session: Session | null,
};

export const UserAuthControl = ({session}: Props) => {
  const t = useTranslations('UI.UserControl');

  if (!session) {
    return (
      <button className="nav-button-text group" onClick={() => signIn()}>
        <Flex direction="row" className="gap-1">
          <div className={clsx(
            'transform-smooth relative size-5',
            'text-green-700 group-hover:text-green-400 dark:text-green-400 dark:group-hover:text-green-700',
          )}>
            <ArrowLeftCircleIcon/>
          </div>
          <div>
            {t('Login')}
          </div>
        </Flex>
      </button>
    );
  }

  return (
    <button className="nav-button-text group" onClick={() => signOut()}>
      <Flex direction="row" className="gap-1">
        <div className={clsx(
          'transform-smooth relative size-5',
          'text-red-700 group-hover:text-red-400 dark:text-red-400 dark:group-hover:text-red-700',
        )}>
          <ArrowRightCircleIcon/>
        </div>
        <div>
          {t('Logout')}
        </div>
      </Flex>
    </button>
  );
};
