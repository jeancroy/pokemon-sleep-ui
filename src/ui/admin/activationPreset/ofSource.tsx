import React from 'react';

import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

import {InputRow} from '@/components/input/filter/row';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {activationSourceToText} from '@/const/activation/common';
import {ActivationSource} from '@/types/mongo/activation';
import {ActivationPresetData} from '@/types/mongo/activationPreset';
import {AdminActivationPresetModifyProps} from '@/ui/admin/activationPreset/type';
import {ActivationPresetUnit} from '@/ui/admin/activationPreset/unit';


type Props = AdminActivationPresetModifyProps & {
  source: ActivationSource,
  presets: ActivationPresetData[],
};

export const ActivationPresetOfSource = ({source, presets, ...props}: Props) => {
  const {onCreate} = props;

  const collapsible = useCollapsibleControl(true);

  return (
    <CollapsibleFull control={collapsible} button={
      <Flex center>
        {activationSourceToText[source]}
      </Flex>
    }>
      <Flex className="gap-1.5">
        <Grid className="grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
          {presets.map((preset) => (
            <ActivationPresetUnit key={preset.uuid} preset={preset} {...props}/>
          ))}
        </Grid>
        <InputRow className="justify-end">
          <ClickableIconButton onClick={() => onCreate(source)}>
            <PlusIcon/>
          </ClickableIconButton>
        </InputRow>
      </Flex>
    </CollapsibleFull>
  );
};
