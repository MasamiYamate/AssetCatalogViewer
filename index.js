const program = require('commander')
const assetParser = require('./lib/asset-parser');
const fileManager = require('./lib/file-manager');
const imageExtraction = require('./lib/image-extraction');

const resourceDirPath = './asset-catalog-viewer/src/assets/resource/';
const imagesDirPath =  './asset-catalog-viewer/src/assets/resource/images/';

program
  .version('0.0.1', '-v, --version')
  .option("-p, --path <path>", "description for path")
  .parse(process.argv)

if (!program.path) {
    console.log("Not found asset catalog path");
    return
}

const path = program.path;

fileManager.mkdir(resourceDirPath);

fileManager.findJsonPaths(path).subscribe({
  next(paths) {
    assetParser.loadAssetJson(paths).subscribe({next(result) {
      fileManager.saveJson(result, resourceDirPath);
    }});
    imageExtraction.extractionResource(paths).subscribe({next(results) {
      results.forEach(function(result) {
        let basePath = result['path'];
        let fileName = result['name'];
        let copyPath = imagesDirPath + fileName;
        fileManager.mkdir(imagesDirPath);
        fileManager.copy(basePath, copyPath);
      })
    }});
    
  }
});
