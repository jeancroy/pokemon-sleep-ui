import React from 'react';

import {clsx} from 'clsx';

import {MarkdownContent} from '@/components/markdown/main';
import {DocRenderingCommonProps} from '@/components/shared/docs/type';
import {tableOfContentsText} from '@/components/shared/docs/view/const';
import {remarkDirectiveComponents} from '@/components/shared/docs/view/directive/const';
import {rehypePlugins, remarkPlugins} from '@/components/shared/docs/view/plugins/const';

import 'katex/dist/katex.min.css';


type Props = DocRenderingCommonProps & {
  className?: string,
};

export const DocsContentView = ({locale, doc, className}: Props) => {
  const {showIndex} = doc;

  const content = [
    showIndex && `## ${tableOfContentsText[locale]}`,
    doc.content,
  ]
    .filter((content) => !!content)
    .join('\n');

  return (
    <MarkdownContent
      plugins={{
        remark: remarkPlugins,
        rehype: rehypePlugins,
      }}
      className={clsx('markdown flex flex-col gap-2.5 break-words p-2', className)}
      components={remarkDirectiveComponents}
    >
      {content}
    </MarkdownContent>
  );
};
