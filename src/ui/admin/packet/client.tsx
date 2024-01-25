'use client';
import React from 'react';

import ArrowDownRightIcon from '@heroicons/react/24/outline/ArrowDownRightIcon';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {defaultPacketRecordingSettings, packetRecordingSettingsText} from '@/const/api/packet';
import {PacketRecordingSettings, packetRecordingType} from '@/types/packet/settings';
import {AdminPacketSettingsServerDataProps} from '@/ui/admin/packet/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const AdminPacketSettingsClient = ({
  preloaded,
}: AdminPacketSettingsServerDataProps) => {
  const [settings, setSettings] = React.useState<PacketRecordingSettings>(cloneMerge(
    defaultPacketRecordingSettings,
    preloaded,
  ));

  return (
    <Flex className="gap-1.5">
      <FilterTextInput
        title={
          <Flex center>
            <ArrowDownRightIcon className="size-6"/>
          </Flex>
        }
        ids={[...packetRecordingType]}
        idToText={(id) => packetRecordingSettingsText[id]}
        {...getMultiSelectOnClickProps({
          filter: settings,
          setFilter: setSettings,
          filterKey: 'enabled',
        })}
      />
      <InputRow className="justify-end">
        <UserDataUploadButton opts={{
          type: 'admin.packets',
          data: settings,
        }}/>
      </InputRow>
    </Flex>
  );
};
