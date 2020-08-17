const fl = require('node-filelist');
const fs = require('fs');
const rx = require('rxjs');

// 検索対象の拡張子
const searchExtension = {'ext': 'json'};

module.exports = {
    findJsonPaths,
    loadJson,
    saveJson,
    copy,
    mkdir
}

/**
 * AssetのJsonパスを抽出します
 *
 * @param {*} xcassersのパス
 * @returns Contents.jsonのファイルパス一覧
 */
function findJsonPaths(path) {
    return rx.Observable.create(observer => {
        fl.read([path], searchExtension, function(results) {
            let paths = results.map(function(result) {
                return result.path;
            });
            observer.next(paths);
            observer.complete();
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

/**
 * 指定したパスにJSONを書き出す
 *
 * @param {*} object
 * @param {*} outputDataPath
 */
function saveJson(object, outputDataPath) {
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

function copy(basePath, copyPath) {
    fs.copyFile(basePath, copyPath, (err) => {
        if (err) {
            console.log(err.stack);
        }
    });
}