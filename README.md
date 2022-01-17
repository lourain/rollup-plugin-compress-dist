A plugin for rollup or vite to compress the bundle directory which supports `.zip` `.tar` `.tgz` formats.

## Usage

  1. download from npm
  ```
    npm install rollup-plugin-compress-dist --dev
  ```
  2. Modify configuration file of project. it would archive `dist` directory to `dist.tar.gz` by default.For example: 
  ```javascript
  //vite.config.ts
  import { defineConfig } from 'vite';
  import compressDist, { CompressOptions } from 'rollup-plugin-compress-dist';
  ...
   const compressOpts: CompressOptions<'tgz'> = {
     type: 'tgz',
     archiverName: 'dist.tar.gz',
     sourceName: 'dist',
   };
  export default defineConfig({
    plugins: [compressDist(compressOpts)],
    ...
  });
  
  ```
