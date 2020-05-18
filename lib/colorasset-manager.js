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
                    console.log(item);

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
    if (anyComponent) {
        template['any'] = anyComponent;
    }
    let lightComponent = parseLightColorObject(colors);
    if (lightComponent) {
        template['light'] = lightComponent;
    }
    let darkComponent = parseDarkColorObject(colors);
    if (darkComponent) {
        template['dark'] = darkComponent;
    }
    return [assetName, template];
}

// ユニバーサルなColorObjectを取り出す
function parseAnyColorObject(colors) {
    let result = null;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && !appearances && colorComponent) {
            // appearancesが含まれない時がAnyのColorSet
            result = colorComponent;
        }
    });
    return result;
}

// LightなColorObjectを取り出す
function parseLightColorObject(colors) {
    let result = null;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && appearances && colorComponent) {
            let appearance = appearances[0];
            let mode = appearance['value'];
            if (mode == "light") {
                result = colorComponent;
            }
        }
    });
    return result;
}

// DarkなColorObjectを取り出す
function parseDarkColorObject(colors) {
    let result = null;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && appearances && colorComponent) {
            let appearance = appearances[0];
            let mode = appearance['value'];
            if (mode == "dark") {
                result = colorComponent;
            }
        }
    });
    return result;
}