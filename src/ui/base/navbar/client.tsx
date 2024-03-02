'use client';
import React from 'react';


import {Flex} from '@/components/layout/flex/common';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {UserAuthControl} from '@/ui/base/navbar/auth';
import {ThemeSwitcher} from '@/ui/base/navbar/darkMode/main';
import {NavList} from '@/ui/base/navbar/list/main';
import {UserConfigUI} from '@/ui/base/navbar/userConfig/main';


type Props = {
  noUserControl?: boolean,
};

export const NavBarClient = ({
  noUserControl,
  children,
}: React.PropsWithChildren<Props>) => {
  const data = useCommonServerData();

  const {serverSession} = data;

  return (
    <>
      <Flex direction="row" stretch noFullWidth className="shrink gap-1.5 lg:px-2">
        <div className="p-2 lg:hidden">
          <NavList/>
        </div>
        {children}
      </Flex>
      <Flex direction="row" center noFullWidth className="ml-auto gap-1.5 px-2">
        <UserConfigUI session={serverSession} {...data}/>
        <ThemeSwitcher/>
        {noUserControl || <UserAuthControl session={serverSession}/>}
      </Flex>
    </>
  );
};
