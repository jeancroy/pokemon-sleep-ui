import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';


export const appCompatibilityIcon = new Map([
  [true, <CheckCircleIcon key="compatible"/>],
  [false, <XCircleIcon key="incompatible"/>],
]);

export const appCompatibilityColor = new Map([
  [true, 'text-green-700 dark:text-green-300'],
  [false, 'text-red-700 dark:text-red-300'],
]);
