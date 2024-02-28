import {Locale} from '@/types/next/locale';
import {UserConfigProps} from '@/ui/base/navbar/userConfig/type';


export type NavBarCommonProps = {
  locale: Locale,
  noUserControl?: boolean,
};

export type NavBarServerDataProps = UserConfigProps & {
  noUserControl?: boolean,
};
