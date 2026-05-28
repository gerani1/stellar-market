import { getRequestId } from "./request-context";

type LogFn = (obj: Record<string, unknown> | string, msg?: string) => void;

function makeLogFn(level: string, consoleFn: (...args: unknown[]) => void): LogFn {
  return (obj, msg) => {
    const requestId = getRequestId();
    const base = { level, ...(requestId ? { requestId } : {}) };
    if (typeof obj === "string") {
      consoleFn(JSON.stringify({ ...base, msg: obj }));
    } else {
      consoleFn(JSON.stringify({ ...base, ...obj, ...(msg ? { msg } : {}) }));
    }
  };
}

export const logger = {
  info: makeLogFn("info", console.log),
  warn: makeLogFn("warn", console.warn),
  error: makeLogFn("error", console.error),
  debug: makeLogFn("debug", console.debug),
};

export function installRequestIdConsolePatch(): void {
  return;
}
