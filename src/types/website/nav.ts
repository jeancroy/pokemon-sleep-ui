import {FeatureLinkImageProps} from '@/components/shared/link/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export type NavEntryCommonProps = FeatureLinkImageProps & {
  i18nTextId: I18nMessageKeysOfNamespace<'UI.Metadata'>,
};

export type NavEntryLink = NavEntryCommonProps & {
  type: 'link',
  showInHome?: boolean,
};

export type NavEntryGroup = NavEntryCommonProps & {
  type: 'group',
  entries: NavEntry[],
};

export type NavEntry = NavEntryLink | NavEntryGroup;
