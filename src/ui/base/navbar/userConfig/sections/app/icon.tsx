import React from 'react';


type Props = {
  icon: React.ReactNode,
};

export const UserConfigAppInfoIcon = ({icon}: Props) => {
  return (
    <div className="size-4">
      {icon}
    </div>
  );
};
