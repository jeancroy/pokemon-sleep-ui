import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {AnalysisPokemonIcon} from '@/ui/analysis/page/result/icon';
import {AnalysisLayoutProps} from '@/ui/analysis/page/result/type';


export const AnalysisLayout = <TData, >({
  linked,
  linkedIconKey,
  title,
  footer,
  mark,
  renderData,
  children,
}: React.PropsWithChildren<AnalysisLayoutProps<TData>>) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Flex direction="row" center wrap className="items-center gap-1">
          {linked.map((linkedData) => (
            <AnalysisPokemonIcon key={linkedIconKey(linkedData)} linked={linkedData} renderData={renderData}/>
          ))}
        </Flex>
      </PopupCommon>
      <Flex className="info-section items-center justify-center">
        <div className="text-center text-sm text-slate-500">
          {title}
        </div>
        <Flex center className="h-16">
          {children}
        </Flex>
        <Flex center className={mark ? classOfMarkStyle[mark] : ''}>
          {footer}
        </Flex>
        <Flex direction="row" className="justify-end">
          <button
            className="enabled:button-clickable-border disabled:button-disabled size-6 p-1"
            disabled={!linked.length} onClick={() => setShow(true)}
          >
            <LinkIcon/>
          </button>
        </Flex>
      </Flex>
    </>
  );
};
