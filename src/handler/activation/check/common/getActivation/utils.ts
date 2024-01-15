import {
  getActivationPropertiesByContact,
  GetActivationPropertiesByContactOpts,
} from '@/controller/user/activation/util';
import {
  ActivationGetterCommonOpts,
  ActivationGettingResult,
} from '@/handler/activation/check/common/getActivation/type';
import {ActivationPresetLookup} from '@/types/mongo/activationPreset';


export type GetActivationFromPlatformOpts = ActivationGetterCommonOpts & GetActivationPropertiesByContactOpts & {
  tag: keyof ActivationPresetLookup,
  userInfo: string,
};

export const getActivationFromPlatform = async ({
  presetLookup,
  tag,
  userInfo,
  ...opts
}: GetActivationFromPlatformOpts): Promise<ActivationGettingResult> => {
  const {source} = opts;

  const existedActivationProperties = (await getActivationPropertiesByContact(opts));

  /* eslint-disable no-console */
  console.log(`>>> Converting ${source} member [${userInfo}] to activation payload`);
  if (existedActivationProperties) {
    console.log(
      `Existing activation properties of ${userInfo} on ${source}:`,
      JSON.stringify(existedActivationProperties),
    );
  }
  /* eslint-enable no-console */

  if (existedActivationProperties?.isActivationLocked) {
    return {
      activation: existedActivationProperties.activation,
      isSuspended: false,
      existedActivationProperties,
    };
  }

  const activation = presetLookup[tag];
  if (!activation) {
    console.warn(
      `Activation tag [${tag}] on user [${userInfo}] from ${source} does not have associated preset`,
    );

    return {
      activation: null,
      isSuspended: false,
      existedActivationProperties,
    };
  }

  return {
    activation: activation.activation,
    isSuspended: activation.suspended,
    existedActivationProperties,
  };
};
