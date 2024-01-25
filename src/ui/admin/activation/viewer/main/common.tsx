import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {ActivationInfo, ActivationKeyAtClient} from '@/types/mongo/activation';
import {ActivationViewerCommonProps} from '@/ui/admin/activation/viewer/main/type';
import {ActivationUnit} from '@/ui/admin/activation/viewer/unit';
import {isActivationSource} from '@/utils/user/activation/type';


type Props<TActivation extends ActivationKeyAtClient> = ActivationViewerCommonProps & {
  data: TActivation[],
  title: React.ReactNode,
  getButtonText: (activation: TActivation) => string,
  getActivationInfo: (activation: TActivation) => ActivationInfo,
};

export const ActivationViewerCommon = <TActivation extends ActivationKeyAtClient>({
  data,
  title,
  getButtonText,
  getActivationInfo,
  ...props
}: Props<TActivation>) => {
  const {control} = props;

  const collapsible = useCollapsible();
  const [search, setSearch] = React.useState('');

  let activations = data
    .map((data) => ({
      ...data,
      buttonText: getButtonText(data),
    }))
    .sort((a, b) => a.buttonText.localeCompare(b.buttonText));

  if (search) {
    activations = activations.filter(({buttonText, contact, source}) => (
      buttonText.includes(search) || (isActivationSource(source) && contact[source]?.includes(search))
    ));
  }

  return (
    <Collapsible state={collapsible} classNameForHeight="h-80" button={
      <Flex direction="row" center className="gap-1.5 p-2">
        <div>{title}</div>
        <InfoIcon style="glow" dimension="size-5" className="p-3">
          {activations.length}
        </InfoIcon>
      </Flex>
    }>
      <Flex className="gap-1.5 pr-1.5">
        <InputRow>
          <InputBox
            type="text"
            value={search}
            onChange={({target}) => setSearch(target.value)}
            className="w-full"
          />
        </InputRow>
        <HorizontalSplitter/>
        <Grid className="grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {activations.map((data) => (
            <ActivationUnit
              key={data.key}
              activationInfo={getActivationInfo(data)}
              button={data.buttonText}
              control={control}
            />
          ))}
        </Grid>
      </Flex>
    </Collapsible>
  );
};
