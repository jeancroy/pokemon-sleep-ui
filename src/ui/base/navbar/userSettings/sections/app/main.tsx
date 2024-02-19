import React from 'react';

import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon';
import PuzzlePieceIcon from '@heroicons/react/24/outline/PuzzlePieceIcon';
import ServerIcon from '@heroicons/react/24/outline/ServerIcon';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {UserSettingsAppBuildInfo} from '@/ui/base/navbar/userSettings/sections/app/build';
import {UserSettingsAppCompatibility} from '@/ui/base/navbar/userSettings/sections/app/compatibility';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {isArrayAtSupported} from '@/utils/compatibility/array';
import {isNestedWorkerSupported} from '@/utils/compatibility/nestedWorker';
import {isStringReplaceAllSupported} from '@/utils/compatibility/stringReplaceAll';


export const UserSettingsAppInfo = () => {
  const t = useTranslations('UI.UserConfig');
  // Only check once on load to avoid duplicated checking
  const isNestedWorkerSupportedResult = React.useMemo(isNestedWorkerSupported, []);

  return (
    <UserSettingsSection titleIcon={<PuzzlePieceIcon/>} title={t('Section.AppInfo')}>
      <UserDataLazyLoad
        options={{type: 'buildId'}}
        loadingText="Server Build"
        content={({data}) => (
          <UserSettingsAppBuildInfo
            icon={<ServerIcon/>}
            buildId={data?.buildId}
          />
        )}
        smallLoading
      />
      <UserSettingsAppBuildInfo
        icon={<ComputerDesktopIcon/>}
        buildId={process.env.NEXT_PUBLIC_BUILD_ID}
      />
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UserSettingsAppCompatibility title="Array.at()" result={isArrayAtSupported()}/>
        <UserSettingsAppCompatibility title="String.replaceAll()" result={isStringReplaceAllSupported()}/>
        <UserSettingsAppCompatibility title="Nested WebWorker" result={isNestedWorkerSupportedResult}/>
      </Grid>
    </UserSettingsSection>
  );
};
