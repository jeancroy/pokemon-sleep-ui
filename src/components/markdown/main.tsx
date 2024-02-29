import React from 'react';

import {clsx} from 'clsx';
import ReactMarkdown, {Options as ReactMarkdownOptions} from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {Nullable} from '@/utils/type';


type Props = {
  plugins?: Partial<{
    remark: ReactMarkdownOptions['remarkPlugins'],
    rehype: ReactMarkdownOptions['rehypePlugins'],
  }>,
  components?: ReactMarkdownOptions['components'],
  className?: string,
  noDefaultClass?: boolean,
  children?: Nullable<string>,
};

export const MarkdownContent = ({
  plugins,
  components,
  className,
  noDefaultClass,
  children,
}: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(plugins?.remark ?? [])]}
      rehypePlugins={plugins?.rehype}
      components={components}
      className={clsx(!noDefaultClass && 'markdown', className)}
    >
      {children}
    </ReactMarkdown>
  );
};
