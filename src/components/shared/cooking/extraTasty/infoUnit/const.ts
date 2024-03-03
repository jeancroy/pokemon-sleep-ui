import {ExtraTastyInfoUnitStyleSize} from '@/components/shared/cooking/extraTasty/infoUnit/type';
import {Dimension} from '@/types/style';


export const extraTastyInfoUnitContainerStyle: {[size in ExtraTastyInfoUnitStyleSize]: string} = {
  small: 'text-sm gap-0.5',
  normal: 'gap-0.5',
};

export const extraTastyInfoUnitIconDimension: {[size in ExtraTastyInfoUnitStyleSize]: Dimension} = {
  small: 'size-4',
  normal: 'size-6',
};
