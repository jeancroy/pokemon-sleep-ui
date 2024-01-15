import React from 'react';

import FingerPrintIcon from '@heroicons/react/24/outline/FingerPrintIcon';
import PauseCircleIcon from '@heroicons/react/24/outline/PauseCircleIcon';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';

import {InputBox} from '@/components/input/box';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {DeleteButton} from '@/components/shared/common/button/delete';
import {activationTypeToText} from '@/const/activation/common';
import {activationType} from '@/types/mongo/activation';
import {ActivationPresetData} from '@/types/mongo/activationPreset';
import {AdminActivationPresetModifyProps} from '@/ui/admin/activationPreset/type';


type Props = AdminActivationPresetModifyProps & {
  preset: ActivationPresetData,
};

export const ActivationPresetUnit = ({preset, onUpdate, onDelete}: Props) => {
  const {
    uuid,
    tag,
    name,
    activation,
    suspended,
  } = preset;

  return (
    <AnimatedCollapseQuick show appear className="info-section flex flex-col gap-1.5">
      <Flex direction="row" className="gap-1">
        <FingerPrintIcon className="h-6 w-6"/>
        <InputBox
          type="text"
          value={tag}
          className="w-full"
          onChange={({target}) => onUpdate(uuid, {tag: target.value})}
        />
      </Flex>
      <Flex direction="row" className="gap-1">
        <PencilSquareIcon className="h-6 w-6"/>
        <InputBox
          type="text"
          value={name}
          className="w-full"
          onChange={({target}) => onUpdate(uuid, {name: target.value})}
        />
      </Flex>
      <FilterTextInput
        ids={[...activationType]}
        isActive={(type) => !!activation[type]}
        idToText={(type) => activationTypeToText[type]}
        onClick={(type) => onUpdate(
          uuid,
          {
            activation: {
              ...activation,
              [type]: !activation[type],
            },
          },
        )}
        title={null}
        noFixedTitleWidth
      />
      <InputRow className="justify-end">
        <ToggleButton
          active={suspended}
          onClick={() => onUpdate(uuid, {suspended: !suspended})}
          className="rounded-full p-1"
        >
          <PauseCircleIcon className="h-6 w-6"/>
        </ToggleButton>
      </InputRow>
      <DeleteButton dimension="h-7 w-7" onClick={() => onDelete(uuid)} className="self-end"/>
    </AnimatedCollapseQuick>
  );
};
