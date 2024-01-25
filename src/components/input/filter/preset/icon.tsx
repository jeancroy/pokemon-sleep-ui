import React from 'react';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {NextImage} from '@/components/shared/common/image/main';
import {iconFilterButtonStyle} from '@/styles/input';
import {IndexableNonSymbol} from '@/utils/type';


type Props<TId extends IndexableNonSymbol> = Omit<
  FilterExpandedInputProps<TId>,
  'idToButton' | 'classNameOfButton'
> & {
  idToAlt: (id: TId) => string,
  idToImageSrc: (id: TId) => string,
  idToImageClassName?: (id: TId) => string,
};

const sizes = [
  '(max-width: 640px) 50vw',
  '(max-width: 768px) 25vw',
  '(max-width: 1024px) 20vw',
  '(max-width: 1280px) 15vw',
  '10vw',
].join(', ');

export const FilterIconInput = <TId extends IndexableNonSymbol>({
  idToAlt,
  idToImageSrc,
  idToImageClassName,
  ...props
}: Props<TId>) => {
  return (
    <FilterExpandedInput
      idToButton={(id) => (
        <div className="group relative size-7">
          <NextImage
            src={idToImageSrc(id)} alt={idToAlt(id)} sizes={sizes}
            className={idToImageClassName && idToImageClassName(id)}
          />
        </div>
      )}
      className={iconFilterButtonStyle}
      {...props}
    />
  );
};
