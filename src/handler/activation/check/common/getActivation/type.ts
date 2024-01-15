import {ActivationProperties, ActivationStatus} from '@/types/mongo/activation';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';


export type ActivationGetterCommonOpts = {
  presetLookup: ActivationPresetLookup,
};

export type ActivationGetterOpts<TSubscriber> = ActivationGetterCommonOpts & {
  subscriber: TSubscriber,
};

export type ActivationGettingResult = {
  activation: ActivationStatus | null,
  isSuspended: boolean,
  existedActivationProperties: ActivationProperties | null,
};
