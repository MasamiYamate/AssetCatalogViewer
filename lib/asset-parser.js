const rx = require('rxjs');
const fileManager = require('./file-manager');

module.exports = {
    loadAssetJson
}

/**
 * Assetを取得する
 *
 * @param {*} path
 * @returns
 */
function loadAssetJson(paths) {
    return rx.Observable.create(observer => {
        let colors = [];
        let images = [];

        paths.forEach(path => {
            let color = parseColorSetObject(path);
            let image = parseImageSetObject(path);
            if (color) {
                colors.push(color);
            } else if (image) {
                images.push(image);
            }
        });
        
        let result = {
            'colors': colors,
            'images': images
        }

        observer.next(result);
        observer.complete();
    });
}

/**
 * ImageSetオブジェクトを取得する
 * @param {*} path 
 */
function parseImageSetObject(path) {
    let assetPath = path.replace(/\/Contents.json/g, '');
    let matchStrings = assetPath.match(/([^/]+?)?$/);
    let assetName = matchStrings[0];
    let object = fileManager.loadJson(path);
    let images = object['images'];
    if (!images) {
        // imagesがない時は、ImageSetではないので
        // 早期リターン
        return null;
    }

    let template = {};
    for(const index in images) {
        let image = images[index];
        let idiom = image['idiom'];
        let idiomImages = template[idiom] || {};
        let scale = image['scale'];
        let fileName = image['filename'];
        let appearances = image['appearances'] || [];
        let colorAppearance = appearances[0] || {};
        let style = colorAppearance['value'] || 'any';
        if (fileName) {
            let styleImages = idiomImages[style] || {};
            styleImages[scale] = fileName;
            idiomImages[style] = styleImages;
            template[idiom] = idiomImages;
        }
    }

    return [assetName, template];
}

/**
 * カラーセットオブジェクトを取り出す
 * @param {*} path 
 */
function parseColorSetObject(path) {
    let template = {};
    let assetPath = path.replace(/\/Contents.json/g, '');
    let matchStrings = assetPath.match(/([^/]+?)?$/);
    let assetName = matchStrings[0];
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