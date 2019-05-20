/*
 eslint
 import/no-dynamic-require: off,
 @typescript-eslint/no-require-imports: off,
 */

import { getAppconfigs } from '@filemaid/platform-folders';
import { resolve } from 'upath';

export const getGlobalConfig = <a>(app: string): a => require(resolve(getAppconfigs(app), 'index.js')); // tslint:disable-line no-unsafe-any
