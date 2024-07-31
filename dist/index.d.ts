export interface CompressOptions<Type extends "zip" | "tar" | "tgz"> {
    archiverName?: ArchiverName<Type>;
    type: Type;
    sourceName?: string;
    ignoreBase?: boolean;
}
type ArchiverName<T> = T extends "zip" | "tar" ? `${string}.${T}` : T extends "tgz" ? `${string}.tar.gz` : never;
export default function compressDist(opts?: CompressOptions<"zip" | "tar" | "tgz">): {
    name: string;
    closeBundle(): void;
};
export {};
