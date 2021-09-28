const program = require('commander');
const assetParser = require('./lib/asset-parser');
const fileManager = require('./lib/file-manager');
const markdownGenerator = require('./lib/markdown-generator');

const resourceDirPath = './resource/';

program
  .version('0.0.1', '-v, --version')
  .option("-p, --path <path>", "description for path")
  .parse(process.argv)

if (!program.path) {
    console.log("Not found asset catalog path");
    return
}

async function main() {
  fileManager.refreshDist();
  /// AssetのPathを取得する
  const jsonPaths = await fileManager.findJsonPaths(program.path);
  /// Assetを扱いやすい形に加工する
  const result = await assetParser.loadAssetJson(jsonPaths);
  /// Markdownを生成する
  markdownGenerator.generateMarkdown(result);
}

main();