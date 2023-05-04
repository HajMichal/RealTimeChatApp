export function getTimeDiffInMs(timestamp1: number, timestamp2: number): number {
    const timeDiffInMs = Math.abs(timestamp2 - timestamp1);
    return timeDiffInMs;
  }
  