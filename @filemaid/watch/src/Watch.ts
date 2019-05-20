import { watch as chokidar } from 'chokidar';

export type WatchPaths = string | WatchArray;

export interface WatchArray extends ReadonlyArray<WatchPaths> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface WatchOptions {
    readonly ignore?: Ignore;

    /**
     * If `true`, strings in `paths` will not be interpreted as globs.
     */
    readonly literal?: boolean;

    /**
     * If `true`, `add` event will be also emitted at startup.
     */
    readonly initial?: boolean;

    /**
     * Usually required for network file systems.
     */
    readonly polling?: boolean;

    /**
     * Polling interval.
     */
    readonly interval?: number;
}

export type Ignore = string | RegExp | ((path: string) => unknown) | IgnoreArray;

export interface IgnoreArray extends ReadonlyArray<Ignore> {} // eslint-disable-line @typescript-eslint/no-empty-interface

export type WatchEvent = 'add' | 'adddir' | 'change' | 'unlink' | 'unlinkdir';

export type WatchEntry = readonly [WatchEvent, string];

export async function* watch(paths: WatchPaths, options = {} as WatchOptions): AsyncIterableIterator<WatchEntry> {
    const { ignore = [], literal = false, initial = false, polling = false, interval = 100 } = options; // eslint-disable-line no-magic-numbers

    const watcher = chokidar(paths as string, {
        ignored: ignore,
        disableGlobbing: literal,
        ignoreInitial: !initial,
        usePolling: polling,
        interval,
    });

    while (true) {
        // eslint-disable-next-line no-await-in-loop
        yield await new Promise<WatchEntry>(resolve => {
            watcher.once('all', (e: string, p: string) => {
                resolve([e.toLowerCase() as WatchEvent, p]);
            });
        });
    }
}
