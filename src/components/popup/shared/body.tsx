import React from 'react';


export const PopupBody = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <div className="max-h-[85vh] w-full overflow-y-auto p-2">
      {children}
    </div>
  );
};
