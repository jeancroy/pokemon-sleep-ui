import {ActivationProperties} from '@/types/mongo/activation';


export type ActivationSendingPayload = {
  contact: string,
  email: string | null,
  activationProperties: ActivationProperties | null,
  ignoreOnSend: boolean,
};

export type ActivationSendingCommonOpts = {
  sourceNote: string,
};
