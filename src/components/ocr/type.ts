import React from 'react';

import {OcrLocale} from '@/types/ocr/locale';


export type OcrState = {
  error: null,
  status: 'ready' | 'thresholding' | 'loadingOcr',
  progress: 0,
  text: null,
  processedImage: null,
} | {
  error: null,
  status: 'recognizing',
  progress: number,
  text: null,
  processedImage: null,
} | {
  error: null,
  status: 'completed',
  progress: 100,
  text: string,
  processedImage: ImageData,
} | {
  error: string,
  status: 'error',
  progress: 100,
  text: null,
  processedImage: ImageData | null,
};

export type OcrSettings = {
  locale: OcrLocale,
  tolerance: number,
};

export type OcrStatus = OcrState['status'];

export type OcrRenderDataOpts<TData> = {
  data: TData,
  text: string,
  image: {
    raw: string | null,
    processed: ImageData | null,
  },
};

export type OcrCommonProps<TData> = {
  buttonText: string,
  textToData: (text: string, locale: OcrLocale) => TData,
  renderData: (opts: OcrRenderDataOpts<TData>) => React.ReactNode,
  getWhitelistChars: (locale: OcrLocale) => string,
};

export type UseOcrReturn = {
  state: OcrState,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageRef: React.RefObject<HTMLImageElement>,
  runOcr: () => Promise<void>,
};
