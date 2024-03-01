'use client';
import React from 'react';

import {CommonServerDataCollection} from '@/types/website/data/common';


export const CommonServerDataContext = React.createContext<CommonServerDataCollection | null>(null);
