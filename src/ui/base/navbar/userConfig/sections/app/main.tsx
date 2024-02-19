import React from 'react';

import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon';
import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon';
import ServerIcon from '@heroicons/react/24/outline/ServerIcon';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {UserConfigAppBuildInfo} from '@/ui/base/navbar/userConfig/sections/app/build';
import {UserConfigAppCompatibility} from '@/ui/base/navbar/userConfig/sections/app/compatibility';
import {UserConfigSection} from '@/ui/base/navbar/userConfig/sections/base';
import {isArrayAtSupported} from '@/utils/compatibility/array';
import {isNestedWorkerSupported} from '@/utils/compatibility/nestedWorker';
import {isStringReplaceAllSupported} from '@/utils/compatibility/stringReplaceAll';


export const UserConfigAppInfo = () => {
  const t = useTranslations('UI.UserConfig');
  // Only check once on load to avoid duplicated checking
  const isNestedWorkerSupportedResult = React.useMemo(isNestedWorkerSupported, []);

  return (
    <UserConfigSection titleIcon={<PuzzlePieceIcon/>} title={t('Section.AppInfo')}>
      <UserDataLazyLoad
        options={{type: 'buildId'}}
        loadingText="Server Build"
        content={({data}) => (
          <UserConfigAppBuildInfo
            icon={<ServerIcon/>}
            buildId={data?.buildId}
          />
        )}
        smallLoading
      />
      <UserConfigAppBuildInfo
        icon={<ComputerDesktopIcon/>}
        buildId={process.env.NEXT_PUBLIC_BUILD_ID}
      />
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UserConfigAppCompatibility title="Array.at()" result={isArrayAtSupported()}/>
        <UserConfigAppCompatibility title="String.replaceAll()" result={isStringReplaceAllSupported()}/>
        <UserConfigAppCompatibility title="Nested WebWorker" result={isNestedWorkerSupportedResult}/>
      </Grid>
    </UserConfigSection>
  );
};
