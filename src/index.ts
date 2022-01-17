import { Plugin } from "rollup";
import { cwd } from "process";
import { resolve } from "path";
import compressing from "compressing";
import chalk from "chalk";
import { createWriteStream } from "fs";

export interface CompressOptions<Type extends "zip" | "tar" | "tgz"> {
  archiverName?: ArchiverName<Type>;
  type: Type;
  sourceName?: string;
}
type ArchiverName<T> = T extends "zip" | "tar"
  ? `${string}.${T}`
  : T extends "tgz"
  ? `${string}.tar.gz`
  : never;

const initOpts: CompressOptions<'tgz'> = {
  archiverName: "dist.tar.gz",
  type: "tgz",
  sourceName: "dist",
};
export default function compressDist(opts?: CompressOptions<'tgz'>): Plugin {
  const { sourceName, archiverName, type } = opts || initOpts;
  return {
    name: "compress-dist",
    closeBundle() {
      const rootPath = cwd();
      const sourcePath = resolve(rootPath, sourceName);

      const destStream = createWriteStream(resolve(rootPath, archiverName));
      const sourceStream = new compressing[type].Stream();

      destStream.on("finish", () => {
        console.log(
          chalk.cyan(`compress-dist:  ${sourceName} compress completed!`)
        );
      });

      destStream.on("error", (err) => {
        throw err;
      });

      sourceStream.addEntry(sourcePath);
      sourceStream.pipe(destStream);
    },
  };
}
