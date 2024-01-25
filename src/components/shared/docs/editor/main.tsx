import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {useRouter} from '@/components/i18n/exports';
import {InputBox} from '@/components/input/box';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {InputTextArea} from '@/components/input/textarea';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {Grid} from '@/components/layout/grid';
import {DocsEditorDisplayToggle} from '@/components/shared/docs/editor/display';
import {DocsEditorDisplayType} from '@/components/shared/docs/editor/type';
import {DocRenderingCommonProps} from '@/components/shared/docs/type';
import {tableOfContentsText} from '@/components/shared/docs/view/const';
import {DocsContentView} from '@/components/shared/docs/view/main';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {regexDocLinkedPath, regexDocPath} from '@/const/regex';
import {localeName} from '@/const/website';
import {useOnBeforeUnload} from '@/hooks/beforeUnload';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {textFilterButtonStyle} from '@/styles/input';
import {DocsDataEditable} from '@/types/mongo/docs';
import {locales} from '@/types/next/locale';
import {UserDataAction} from '@/types/userData/main';
import {docsRelatedSeparator, toRelatedPathForDisplay} from '@/utils/docs';


type Props = DocRenderingCommonProps & {
  onDocUpdated: (updated: DocsDataEditable) => void,
  getUserDataAction: (data: DocsDataEditable) => UserDataAction,
};

export const DocsEditor = ({onDocUpdated, getUserDataAction, ...props}: Props) => {
  const {locale, doc} = props;
  const {path, title, content, showIndex, related} = doc;

  const [display, setDisplay] = React.useState<DocsEditorDisplayType>('markdown');
  const {push} = useRouter();
  const {actAsync, status} = useUserDataActor({
    statusToast: true,
    statusNoReset: true,
  });
  const t = useTranslations('UI.InPage.Docs');

  useOnBeforeUnload();

  if (!actAsync) {
    return null;
  }

  return (
    <FlexForm className="gap-1.5" onSubmit={async () => {
      const {status} = await actAsync(getUserDataAction(doc));

      if (status === 'completed') {
        push(`/docs/view/${path}`);
      }
    }}>
      <InputRowWithTitle title="URL">
        <InputBox
          type="text"
          value={path}
          onChange={({target}) => {
            const path = target.value;

            // `!!path` to allow empty string
            if (!!path && !regexDocPath.test(path)) {
              return;
            }

            onDocUpdated({...doc, path});
          }}
          className="w-full"
          pattern={regexDocPath.source}
          required
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={t('Title')}>
        <InputBox
          type="text"
          value={title}
          onChange={({target}) => onDocUpdated({
            ...doc,
            title: target.value,
          })}
          className="w-full"
          required
        />
      </InputRowWithTitle>
      <InputRowWithTitle title={
        <Flex center>
          <LinkIcon className="size-4"/>
        </Flex>
      }>
        <InputBox
          type="text"
          value={toRelatedPathForDisplay(related)}
          onChange={({target}) => {
            const related = target.value;

            // `!!path` to allow empty string
            if (!!related && !regexDocLinkedPath.test(related)) {
              return;
            }

            onDocUpdated({
              ...doc,
              related: related.split(docsRelatedSeparator),
            });
          }}
          className="w-full"
          pattern={regexDocLinkedPath.source}
        />
      </InputRowWithTitle>
      <FilterTextInput
        onClick={(locale) => onDocUpdated({...doc, locale})}
        isActive={(locale) => locale === doc.locale}
        title={
          <Flex center>
            <LanguageIcon className="size-6"/>
          </Flex>
        }
        ids={[...locales]}
        idToText={(locale) => localeName[locale]}
      />
      <InputRow>
        <ToggleButton
          active={showIndex}
          onClick={() => onDocUpdated({...doc, showIndex: !showIndex})}
          className={clsx('group', textFilterButtonStyle)}
        >
          {tableOfContentsText[locale]}
        </ToggleButton>
      </InputRow>
      <div className="lg:hidden">
        <DocsEditorDisplayToggle display={display} setDisplay={setDisplay}/>
      </div>
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        <InputTextArea
          value={content}
          setValue={(content) => onDocUpdated({...doc, content})}
          required
          className={clsx('lg:block', display === 'markdown' ? 'block' : 'hidden')}
        />
        <DocsContentView
          className={clsx('info-section-bg rounded-lg lg:flex', display === 'preview' ? 'flex' : 'hidden')}
          {...props}
        />
      </Grid>
      <InputRow className="justify-end">
        <UserDataUploadButton isSubmit statusOverride={status}/>
      </InputRow>
    </FlexForm>
  );
};
