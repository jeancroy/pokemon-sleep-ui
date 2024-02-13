import {PremiumOnlyNoticeStyle} from '@/components/static/premium/type';


export const premiumOnlyNoticeStyles: {[style in PremiumOnlyNoticeStyle]: string} = {
  normal: '[&_a]:text-link',
  inverse: '[&_a]:text-link-inverse',
  section: 'markdown rounded-lg p-3 shadow-border shadow-rose-600 dark:shadow-rose-500',
};
