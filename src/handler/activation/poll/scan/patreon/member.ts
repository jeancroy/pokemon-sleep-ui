import {scanMemberOnPlatform} from '@/handler/activation/poll/scan/common/platform';
import {MemberScanCommonOpts} from '@/handler/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {PatreonMemberData} from '@/types/subscription/patreon/memberData';
import {isPatronActive} from '@/utils/external/patreon';


export const scanPatron = (
  opts: MemberScanCommonOpts<PatreonMemberData>,
): ActivationScanResult<PatreonMemberData> => {
  return scanMemberOnPlatform({
    ...opts,
    source: 'patreon',
    isMemberActive: ({member}) => isPatronActive(member),
    isActivationBelongToMember: ({contact}, {member}) => (
      contact.patreon === member.attributes.email
    ),
  });
};
