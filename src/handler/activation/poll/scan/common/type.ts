import {ActivationKey, ActivationSource} from '@/types/mongo/activation';


export type MemberScanCommonOpts<TMember> = {
  members: TMember[],
  activations: ActivationKey[],
};

export type MemberScanInternalCommonOpts<TMember> = MemberScanCommonOpts<TMember> & {
  source: ActivationSource,
  isMemberActive: (member: TMember) => boolean,
};
