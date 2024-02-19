import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';

import {UserConfigPopup} from '@/ui/base/navbar/userConfig/popup';
import {UserConfigProps} from '@/ui/base/navbar/userConfig/type';


export const UserConfigUI = (props: UserConfigProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <UserConfigPopup show={show} setShow={setShow} {...props}/>
      <button className="button-clickable-bg nav-height w-8 p-1" onClick={() => setShow(true)}>
        <Cog6ToothIcon/>
      </button>
    </>
  );
};
