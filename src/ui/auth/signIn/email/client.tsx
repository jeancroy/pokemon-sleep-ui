'use client';
import React from 'react';

import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import {clsx} from 'clsx';
import {signIn} from 'next-auth/react';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';


export const AuthSignInEmailClient = () => {
  const [email, setEmail] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void signIn('email', {email, callbackUrl: '/'});
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
      <Flex center noFullWidth className="shrink-0">
        <EnvelopeIcon className="size-10"/>
      </Flex>
      <InputBox
        value={email}
        type="email"
        className="w-full p-1 text-center text-lg"
        placeholder="email@example.com"
        onChange={({target}) => setEmail(target.value)}
        required
      />
      <Flex center>
        <button type="submit" disabled={!email} className={clsx(
          'enabled:button-clickable-bg disabled:button-disabled w-1/2 p-2 md:w-1/3',
        )}>
          Email
        </button>
      </Flex>
    </form>
  );
};
