/*
 eslint
 no-console: off,
 */

import { watch } from '@filemaid/watch';

(async () => {
    for await (const x of watch('/home/mm/Downloads/Firefox')) {
        console.log(x);
    }
})().catch(() => null);
