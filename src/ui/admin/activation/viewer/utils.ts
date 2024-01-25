import {activationSourceToText} from '@/const/activation/common';
import {
  activationContact,
  ActivationDataAtClient,
  ActivationKeyAtClient,
  ActivationSourceAll,
} from '@/types/mongo/activation';
import {UserIdToEmailMap} from '@/types/mongo/auth';
import {activationButtonTextGetter} from '@/ui/admin/activation/viewer/const';
import {isNotNullish} from '@/utils/type';
import {isActivationSource} from '@/utils/user/activation/type';


type GetActivationButtonTextOpts<TActivation extends ActivationKeyAtClient> = {
  data: TActivation,
};

type GetActivationKeyButtonTextOpts<TDefault> = GetActivationButtonTextOpts<ActivationKeyAtClient> & {
  defaultOnNotFound: TDefault,
};

export const getActivationKeyButtonText = <TDefault>({
  data,
  defaultOnNotFound,
}: GetActivationKeyButtonTextOpts<TDefault>): string | TDefault => {
  const {source} = data;

  if (!source) {
    const contact = activationContact.map((channel) => {
      const contact = data.contact[channel];

      if (!contact) {
        return null;
      }

      return {channel, contact};
    })
      .filter(isNotNullish)
      .at(0);

    if (contact) {
      return `${contact.channel[0].toUpperCase()}: ${contact.contact}`;
    }

    return data.note || defaultOnNotFound;
  }

  if (!isActivationSource(source)) {
    return data.note || defaultOnNotFound;
  }

  return activationButtonTextGetter[source](data) ?? defaultOnNotFound;
};

type GetActivationDataButtonTextOpts = GetActivationButtonTextOpts<ActivationDataAtClient> & {
  userIdEmailMap: UserIdToEmailMap,
};

export const getActivationDataButtonText = ({
  data,
  userIdEmailMap,
}: GetActivationDataButtonTextOpts): string => {
  return (
    getActivationKeyButtonText({data, defaultOnNotFound: null}) ??
    userIdEmailMap[data.userId] ??
    data.userId
  );
};

export const getActivationTitle = (source: ActivationSourceAll | null) => {
  if (!source) {
    return '(Free)';
  }

  return activationSourceToText[source];
};
