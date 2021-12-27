const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

export function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback, delay) {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  const timeoutID = {
    id: requestAnimationFrame(tick),
  };

  return timeoutID;
}
