const program = require('commander')
const assetParser = require('./lib/asset-parser');
const fileManager = require('./lib/file-manager');

program
  .version('0.0.1', '-v, --version')
  .option("-p, --path <path>", "description for path")
  .parse(process.argv)

if (!program.path) {
    console.log("Not found asset catalog path");
    return
}

const path = program.path;
assetParser.loadAssetJson(path).subscribe({next(result) {
  console.log(result);
  fileManager.saveJson(result, './resources/');
}});

