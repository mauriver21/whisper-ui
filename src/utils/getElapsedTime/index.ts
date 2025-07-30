import moment from 'moment';

/**
 * Returns the elapsed time in seconds or milliseconds.
 */
export const getElapsedTime = (
  startMs: number,
  endMs: number,
  options?: { abs?: boolean; duration?: 'seconds' | 'milliseconds' },
) => {
  const { abs, duration } = { abs: true, ...options };

  if (duration === 'seconds') {
    startMs = Math.floor(moment.duration(startMs, 'milliseconds').asSeconds());
    endMs = Math.floor(moment.duration(endMs, 'milliseconds').asSeconds());
  }

  const elapsed = endMs - startMs;

  return abs ? Math.abs(elapsed) : elapsed;
};
