import {scanActivationInDatabase} from '@/handler/activation/poll/scan/common/activation';
import {MemberScanCommonOpts} from '@/handler/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {PatreonMemberData} from '@/types/subscription/patreon/memberData';
import {isPatronActive} from '@/utils/external/patreon';


export const scanPatreonActivationInDatabase = (
  opts: MemberScanCommonOpts<PatreonMemberData>,
): ActivationScanResult<PatreonMemberData> => {
  return scanActivationInDatabase({
    ...opts,
    source: 'patreon',
    isMemberActive: ({member}) => isPatronActive(member),
    isMemberMatchesActivation: ({member}, {contact}) => (
      member.attributes.email === contact.patreon
    ),
  });
};
