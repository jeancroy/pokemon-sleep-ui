'use client';
import React from 'react';

import {v4} from 'uuid';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {activationSource} from '@/types/mongo/activation';
import {ActivationPresetOfSource} from '@/ui/admin/activationPreset/ofSource';
import {AdminActivationPresetServerDataProps} from '@/ui/admin/activationPreset/type';
import {isNotNullish} from '@/utils/type';


export const AdminActivationPresetClient = ({preloaded}: AdminActivationPresetServerDataProps) => {
  const [presetMap, setPresetMap] = React.useState(preloaded);

  const presetList = Object.values(presetMap).filter(isNotNullish);

  return (
    <Flex className="gap-2">
      {activationSource.map((source) => (
        <ActivationPresetOfSource
          key={source}
          source={source}
          presets={presetList.filter((preset) => preset.source === source)}
          onUpdate={(uuid, update) => setPresetMap((original) => ({
            ...original,
            [uuid]: {
              ...original[uuid],
              ...update,
            },
          }))}
          onCreate={(source) => setPresetMap((original) => {
            const uuid = v4();

            return {
              ...original,
              [uuid]: {
                uuid,
                source,
                tag: '(Tag / ID)',
                name: '(Name)',
                activation: {},
                suspended: false,
              },
            };
          })}
          onDelete={(uuid) => setPresetMap((original) => {
            const update = {...original};

            delete update[uuid];

            return update;
          })}
        />
      ))}
      <InputRow className="justify-end">
        <UserDataUploadButton
          opts={{
            type: 'admin.activation.preset.update',
            data: presetMap,
          }}
        />
      </InputRow>
    </Flex>
  );
};
