"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const path_1 = require("path");
const compressing_1 = __importDefault(require("compressing"));
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const initOpts = {
    archiverName: "dist.tar.gz",
    type: "tgz",
    sourceName: "dist",
};
function compressDist(opts) {
    const { sourceName, archiverName, type } = opts || initOpts;
    return {
        name: "compress-dist",
        closeBundle() {
            const rootPath = (0, process_1.cwd)();
            const sourcePath = (0, path_1.resolve)(rootPath, sourceName);
            const destStream = (0, fs_1.createWriteStream)((0, path_1.resolve)(rootPath, archiverName));
            const sourceStream = new compressing_1.default[type].Stream();
            destStream.on("finish", () => {
                console.log(chalk_1.default.cyan(`compress-dist:  ${sourceName} compress completed!`));
            });
            destStream.on("error", (err) => {
                throw err;
            });
            sourceStream.addEntry(sourcePath);
            sourceStream.pipe(destStream);
        },
    };
}
exports.default = compressDist;
//# sourceMappingURL=index.js.map