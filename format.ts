import { MAX_DEPTH } from './config';

export const formatPercent = (progress: number) => `${(progress * 100).toFixed(1).padStart(4, '0')}%`;

export const formatDepth = (progress: number) =>
  `${Math.floor(progress * MAX_DEPTH)
    .toString()
    .padStart(4, '0')}m`;
