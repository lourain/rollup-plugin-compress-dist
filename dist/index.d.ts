import { Plugin } from "rollup";
export interface CompressOptions<N extends string, T extends string = "zip" | "tar" | "tgz"> {
    archiverName?: ArchiverName<N, T>;
    type: T;
    sourceName?: string;
}
declare type ArchiverName<N extends string, T extends string = "zip" | "tar" | "tgz"> = T extends `${"zip" | "tar"}` ? `${N}.${T}` : T extends `${"tgz"}` ? `${N}.tar.gz` : null;
export default function compressDist(opts?: CompressOptions<string, "zip" | "tar" | "tgz">): Plugin;
export {};
