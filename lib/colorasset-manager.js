const rx = require('rxjs');
const fileManager = require('./file-manager');

module.exports = {
    loadColorAssetJson
}

/**
 * ColorAssetを取得する
 *
 * @param {*} path
 * @returns
 */
function loadColorAssetJson(path) {
    return rx.Observable.create(observer => {
        fileManager.findJsonPaths(path).subscribe({
            next(paths) {
                let result = [];

                paths.forEach(path => {
                    let item = parseColorSetObject(path);
                });

                observer.next(result);
                observer.complete();
            },
            error(err) {observer.error(err);},
            complete() {observer.complete();}
        });
    });
}

function parseColorSetObject(path) {
    let assetPath = path.replace(/\/Contents.json/g, '');
    let matchStrings = assetPath.match(/([^/]+?)?$/);
    let assetName = matchStrings[0];
    let template = {}
    let object = fileManager.loadJson(path);

    let colors = object['colors'];
    if (!colors) {
        // colorsがない時は、ColorSetではないので
        // 早期リターン
        return null;
    }
    // AnyタイプのColorComponentを抽出する
    let anyComponent = parseAnyColorObject(colors);
    console.log(anyComponent);
    return [assetName, object];
}

// ユニバーサルなColorObjectを取り出す
function parseAnyColorObject(colors) {
    let result = null;
    colors.forEach(function( color ) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color, appearances, colorComponent) {
            result = colorComponent;
        }
    });
    return result;
}
