import { Plugin } from "rollup";
import { cwd } from "process";
import { resolve } from "path";
import compressing from "compressing";
import chalk from "chalk";
import { createWriteStream } from "fs";

export interface CompressOptions<
  N extends string,
  T extends string = "zip" | "tar" | "tgz"
> {
  archiverName?: ArchiverName<N, T>;
  type: T;
  sourceName?: string;
}

type ArchiverName<
  N extends string,
  T extends string = "zip" | "tar" | "tgz"
> = T extends `${"zip" | "tar"}`
  ? `${N}.${T}`
  : T extends `${"tgz"}`
  ? `${N}.tar.gz`
  : null;

const initOpts: CompressOptions<string, "tgz"> = {
  archiverName: "dist.tar.gz",
  type: "tgz",
  sourceName: "dist",
};
export default function compressDist(
  opts?: CompressOptions<string, "zip" | "tar" | "tgz">
): Plugin {
  const { sourceName, archiverName, type } = opts || initOpts;
  return {
    name: "compress-dist",
    closeBundle() {
      const rootPath = cwd();
      const sourcePath = resolve(rootPath, sourceName);

      const destStream = createWriteStream(resolve(rootPath, archiverName));
      const sourceStream = new compressing[type].Stream();

      destStream.on("finish", () => {
        console.log(chalk.cyan(`compress-dist:  ${sourceName} compress completed!`));
      });

      destStream.on("error", (err) => {
        throw err;
      });

      sourceStream.addEntry(sourcePath);
      sourceStream.pipe(destStream);
    },
  };
}
