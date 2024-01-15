import {MemberScanInternalCommonOpts} from '@/handler/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {ActivationKey} from '@/types/mongo/activation';


export type ScanMemberOnPlatformOpts<TMember> = MemberScanInternalCommonOpts<TMember> & {
  isMemberMatchesActivation: (member: TMember, activation: ActivationKey) => boolean,
};

export const scanActivationInDatabase = <TMember>({
  source,
  members,
  activations,
  isMemberActive,
  isMemberMatchesActivation,
}: ScanMemberOnPlatformOpts<TMember>): ActivationScanResult<TMember> => {
  const result: ActivationScanResult<TMember> = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const activation of activations) {
    if (activation.source !== source) {
      continue;
    }

    const member = members
      .find((member) => isMemberMatchesActivation(member, activation));
    if (!member) {
      // Dangling activation
      result.toDeactivate.push({member, key: activation.key});
      continue;
    }

    if (isMemberActive(member)) {
      continue;
    }

    result.toDeactivate.push({member, key: activation.key});
  }

  return result;
};
