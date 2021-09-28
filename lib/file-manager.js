const fl = require('node-filelist');
const fs = require('fs');
const rimraf = require('rimraf');

// 検索対象の拡張子
const searchExtension = {'ext': 'json'};

module.exports = {
    refreshDist,
    copyImage,
    findJsonPaths,
    loadJson,
    saveJson,
    copy,
    mkdir,
    saveMarkDown
}

function refreshDist() {
    let distPath = './dist';
    let distImagePath = './dist/images'
    removeDir(distPath);
    mkdir(distPath);
    mkdir(distImagePath);
}

function copyImage(originalPath, fileName) {
    const originalImagePath = originalPath + '/' + fileName;
    const outPutImagePath = './dist/images/' + fileName;
    copy(originalImagePath, outPutImagePath);
    return './images/' + fileName;
}

/**
 * AssetのJsonパスを抽出します
 *
 * @param {*} xcassersのパス
 * @returns Contents.jsonのファイルパス一覧
 */
function findJsonPaths(path) {
    return new Promise(function (resolve, reject) {
        fl.read([path], searchExtension, function(results) {
            let paths = results.map(function(result) {
                return result.path;
            });
            resolve(paths);
        })
    });
}

/**
 * 指定したパスのJSONを読み込む
 *
 * @param {*} path
 */
function loadJson(path) {
    let file = fs.readFileSync(path, 'utf8');
    let object = JSON.parse(file);
    return object;
}

function saveMarkDown(value) {
    fs.writeFileSync("./dist/asset.md", value);
}

/**
 * 指定したパスにJSONを書き出す
 *
 * @param {*} object
 * @param {*} outputDataPath
 */
function saveJson(object, outputDataPath) {
    console.log(object);
    const fileName = 'asset-resource.json';
    let outputPath = './' + fileName;
    if (outputDataPath) {
        if (!fs.existsSync(outputDataPath)) {
            fs.mkdirSync(outputDataPath);
        }
        outputPath = outputDataPath + fileName;
    }
    fs.writeFileSync(outputPath, JSON.stringify(object));
}

function mkdir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function removeDir(path) {
    if (fs.existsSync(path)) {
        rimraf.sync(path);
    }
}

function copy(basePath, copyPath) {
    fs.copyFile(basePath, copyPath, (err) => {
        if (err) {
            console.log(err.stack);
        }
    });
}