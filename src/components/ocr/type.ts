import React from 'react';

import {OcrLocale} from '@/types/ocr/locale';


export type OcrState = {
  error: null,
  status: 'ready' | 'thresholding' | 'loadingOcr',
  progress: 0,
  text: null,
} | {
  error: null,
  status: 'recognizing',
  progress: number,
  text: null,
} | {
  error: null,
  status: 'completed',
  progress: 100,
  text: string,
} | {
  error: string,
  status: 'error',
  progress: 100,
  text: null,
};

export type OcrSettings = {
  locale: OcrLocale,
  tolerance: number,
};

export type OcrStatus = OcrState['status'];

export type OcrRenderImageData = {
  raw: string | null,
  processedCanvasRef: React.RefObject<HTMLCanvasElement>,
};

export type OcrRenderDataOpts<TData> = {
  data: TData,
  text: string,
  image: OcrRenderImageData,
};

export type OcrCommonProps<TData> = {
  buttonText: string,
  textToData: (text: string, locale: OcrLocale) => TData,
  renderData: (opts: OcrRenderDataOpts<TData>) => React.ReactNode,
  getWhitelistChars: (locale: OcrLocale) => string | null,
};

export type UseOcrReturn = {
  state: OcrState,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageRef: React.RefObject<HTMLImageElement>,
  runOcr: () => Promise<void>,
};
