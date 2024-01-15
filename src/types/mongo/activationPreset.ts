import {ActivationSource, ActivationStatus} from '@/types/mongo/activation';


export type ActivationPresetData = {
  uuid: string,
  source: ActivationSource,
  tag: string,
  name: string,
  activation: ActivationStatus,
  suspended: boolean,
};

export type ActivationPresetMap = {[uuid in string]: ActivationPresetData};

export type ActivationPresetLookup = {[tag in string]?: ActivationPresetData};
