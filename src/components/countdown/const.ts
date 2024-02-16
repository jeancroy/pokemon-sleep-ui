import {CountdownState} from '@/components/countdown/type';


export const countdownProgressStyling: {[state in CountdownState]: string} = {
  toOpen: 'bg-slate-500',
  openingSoon: 'bg-safe',
  open: 'bg-slate-500',
  endingSoon: 'bg-energy',
  ended: 'bg-slate-500',
  closingSoon: 'bg-danger',
};

export const countdownTextStyling: {[state in CountdownState]: string | null} = {
  toOpen: null,
  openingSoon: 'text-safe',
  open: null,
  endingSoon: 'text-energy',
  ended: null,
  closingSoon: 'text-danger',
};

export const countdownShowProgress: {[state in CountdownState]: boolean} = {
  toOpen: false,
  openingSoon: false,
  open: true,
  endingSoon: true,
  ended: true,
  closingSoon: true,
};
