'use client';
import React from 'react';


import {Flex} from '@/components/layout/flex/common';
import {UserAuthControl} from '@/ui/base/navbar/auth';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavList} from '@/ui/base/navbar/list/main';
import {NavBarServerDataProps} from '@/ui/base/navbar/type';
import {UserConfigUI} from '@/ui/base/navbar/userConfig/main';


export const NavBarClient = ({
  noUserControl,
  session,
  children,
  ...props
}: React.PropsWithChildren<NavBarServerDataProps>) => {
  return (
    <>
      <Flex direction="row" stretch noFullWidth className="shrink gap-1.5 lg:px-2">
        <div className="p-2 lg:hidden">
          <NavList/>
        </div>
        {children}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5 px-2">
        <UserConfigUI session={session} {...props}/>
        <ThemeSwitcher/>
        {noUserControl || <UserAuthControl session={session}/>}
      </Flex>
    </>
  );
};
