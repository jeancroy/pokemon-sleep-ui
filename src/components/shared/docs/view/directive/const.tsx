import {Options as ReactMarkdownOptions} from 'react-markdown';

import {AdsUnit} from '@/components/ads/main';
import {MarkdownCalloutAlert} from '@/components/shared/docs/view/directive/callout/alert';
import {MarkdownCalloutInfo} from '@/components/shared/docs/view/directive/callout/info';
import {MarkdownCalloutSection} from '@/components/shared/docs/view/directive/callout/section';
import {MarkdownCalloutWarning} from '@/components/shared/docs/view/directive/callout/warning';


export const remarkDirectiveComponents: ReactMarkdownOptions['components'] = {
  // @ts-ignore: None of the tag name below are valid, but this is exactly what is needed
  // > custom HTML tag gets changed into React component by passing this in `components` of `<ReactMarkdown/>`
  info: MarkdownCalloutInfo,
  warning: MarkdownCalloutWarning,
  alert: MarkdownCalloutAlert,
  section: MarkdownCalloutSection,
  ads: AdsUnit,
};
