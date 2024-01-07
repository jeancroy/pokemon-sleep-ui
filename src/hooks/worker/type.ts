import React from 'react';


export type UseWorkerCommonOpts = {
  workerName: string,
  generateWorker: () => Worker,
  onError: (event: ErrorEvent) => void,
  isCanceled?: boolean,
  workerDeps?: React.DependencyList,
};
