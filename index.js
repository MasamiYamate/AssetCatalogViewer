const rx = require('rxjs');
const program = require('commander')
const fileManager = require('./lib/file-manager');
const colorSetManager = require('./lib/colorasset-manager');

program
  .version('0.0.1', '-v, --version')
  .option("-p, --path <path>", "description for path")
  .parse(process.argv)

if (!program.path) {
    console.log("Not found asset catalog path");
    return
}

const path = program.path;
colorSetManager.loadColorAssetJson(path).subscribe({});

