declare module 'platform-folders' {
    export type PlatformFolder =
        | 'home'
        | 'desktop'
        | 'documents'
        | 'music'
        | 'pictures'
        | 'videos'
        | 'cache'
        | 'downloads'
        | 'appData'
        | 'userData';

    function getPath(folder: PlatformFolder): string;

    export default getPath; // eslint-disable-line import/no-default-export
}
