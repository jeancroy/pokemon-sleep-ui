import {ActivationProperties} from '@/types/mongo/activation';


export type ActionSendActivationPayload = {
  contact: string,
  email: string | null,
  activationProperties: ActivationProperties | null,
};
