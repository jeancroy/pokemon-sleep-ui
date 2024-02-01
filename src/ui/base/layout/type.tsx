import {NavBarCommonProps} from '@/ui/base/navbar/type';


export type UiPageProps = NavBarCommonProps & {
  noPageEndAds?: boolean,
  announcement?: boolean,
};
