import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {MarkdownCalloutProps} from '@/components/shared/docs/view/directive/callout/type';


export const MarkdownCalloutSection = ({children}: MarkdownCalloutProps) => {
  return (
    <Flex className="bg-plate gap-1">
      {children}
    </Flex>
  );
};
