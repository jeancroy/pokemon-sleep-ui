import {MemberScanInternalCommonOpts} from '@/handler/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {ActivationKey} from '@/types/mongo/activation';


export type ScanMemberOnPlatformOpts<TMember> = MemberScanInternalCommonOpts<TMember> & {
  isActivationBelongToMember: (activation: ActivationKey, member: TMember) => boolean,
};

export const scanMemberOnPlatform = <TMember>({
  source,
  members,
  activations,
  isMemberActive,
  isActivationBelongToMember,
}: ScanMemberOnPlatformOpts<TMember>): ActivationScanResult<TMember> => {
  const result: ActivationScanResult<TMember> = {
    toUpdateExpiry: [],
    toDeactivate: [],
    toSendActivation: [],
  };

  for (const member of members) {
    const activation = activations.find((activation) => (
      activation.source === source && isActivationBelongToMember(activation, member)
    ));

    if (isMemberActive(member)) {
      if (!activation) {
        result.toSendActivation.push(member);
      } else {
        result.toUpdateExpiry.push(member);
      }
    } else if (activation) {
      result.toDeactivate.push({member, key: activation.key});
    }
  }

  return result;
};
