import {scanActivationInDatabase} from '@/handler/activation/poll/scan/common/activation';
import {MemberScanCommonOpts} from '@/handler/activation/poll/scan/common/type';
import {ActivationScanResult} from '@/handler/activation/poll/scan/type';
import {DiscordSubscriber} from '@/types/subscription/discord/data';


export const scanDiscordActivationInDatabase = (
  opts: MemberScanCommonOpts<DiscordSubscriber>,
): ActivationScanResult<DiscordSubscriber> => {
  return scanActivationInDatabase({
    ...opts,
    source: 'discord',
    isMemberActive: () => true,
    isMemberMatchesActivation: ({userId}, {contact}) => (
      userId === contact.discord
    ),
  });
};
