import { platform } from 'os';

import getPath from 'platform-folders';
import { resolve } from 'upath';

/**
 * E.g. `/home/me`, `C:/Users/me`, `/Users/me`.
 */
export function getHome() {
    return getPath('home');
}

/**
 * E.g. `/home/me/Desktop`, `C:/Users/me/Desktop`, `/Users/me/Desktop`.
 */
export function getDesktop() {
    return getPath('desktop');
}

/**
 * E.g. `/home/me/Documents`, `C:/Users/me/Documents`, `/Users/me/Documents`.
 */
export function getDocuments() {
    return getPath('documents');
}

/**
 * E.g. `/home/me/Music`, C:/Users/me/Music`, `/Users/me/Music`.
 */
export function getMusic() {
    return getPath('music');
}

/**
 * E.g. `/home/me/Videos`, `C:/Users/me/Videos`, `/Users/me/Videos`.
 */
export function getVideos() {
    return getPath('videos');
}

/**
 * E.g. `/home/me/Downloads`, `C:/Users/me/Downloads`, `/Users/me/Downloads`.
 */
export function getDownloads() {
    return getPath('downloads');
}

/**
 * E.g. `/home/me/Pictures`, `C:/Users/me/Pictures`, `/Users/me/Pictures`.
 */
export function getPictures() {
    return getPath('pictures');
}

/**
 * E.g. `/home/me/.cache/filemaid`, `C:/Users/me/AppData/Local/filemaid`, `/Users/me/Library/Caches/filemaid`.
 */
export function getCache(app: string) {
    return resolve(getPath('cache'), app);
}

/**
 * E.g. `/home/me/.local/share/filemaid`, `C:/Users/me/AppData/Roaming/filemaid/var`, `/Users/me/Library/Application Support/filemaid/var`.
 */
export function getAppdata(app: string) {
    return getApppath(app, 'appData', 'var');
}

/**
 * E.g. `/home/me/.config/filemaid`, `C:/Users/me/AppData/Roaming/filemaid/config`, `/Users/me/Library/Application Support/filemaid/config`.
 */
export function getAppconfigs(app: string) {
    return getApppath(app, 'userData', 'config');
}

function getApppath(app: string, folder: 'appData' | 'userData', subfolder: 'var' | 'config') {
    const p = platform();
    const f = getPath(folder);

    if (p === 'darwin' || p === 'win32') return resolve(f, app, subfolder);

    return resolve(f, app);
}
