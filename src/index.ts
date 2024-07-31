import { cwd } from "process";
import { resolve } from "path";
import compressing from "compressing";
import chalk from "chalk";
import { createWriteStream } from "fs";

export interface CompressOptions<Type extends "zip" | "tar" | "tgz"> {
  archiverName?: ArchiverName<Type>;
  type: Type;
  sourceName?: string;
  ignoreBase?: boolean;
}
type ArchiverName<T> = T extends "zip" | "tar"
  ? `${string}.${T}`
  : T extends "tgz"
  ? `${string}.tar.gz`
  : never;

const initOpts: CompressOptions<"tgz"> = {
  archiverName: "dist.tar.gz",
  type: "tgz",
  sourceName: "dist",
  ignoreBase: false,
};
export default function compressDist(
  opts?: CompressOptions<"zip" | "tar" | "tgz">
) {
  const { sourceName, archiverName, type, ignoreBase } = opts || initOpts;
  return {
    name: "compress-dist",
    closeBundle() {
      console.log("closeBundle");
      const rootPath = cwd();
      const sourcePath = resolve(rootPath, sourceName);
      chalk.bgBlue(`sourcePath: ${sourcePath}`);

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

      sourceStream.addEntry(sourcePath, {
        ignoreBase,
      });
      sourceStream.pipe(destStream);
    },
  };
}
