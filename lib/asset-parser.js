const rx = require('rxjs');
const fileManager = require('./file-manager');

const blancComponent = {
    'red': '',
    'green': '',
    'blue': '',
    'alpha': '',
    'hex': ''
}

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

    return {
        'name': assetName,
        'value': template
    };
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
    template['any'] = parseAnyColorObject(colors);
    template['light'] = parseLightColorObject(colors);
    template['dark'] = parseDarkColorObject(colors);
    return {
        'name': assetName,
        'value': template
    };
}

// ユニバーサルなColorObjectを取り出す
function parseAnyColorObject(colors) {
    let result = blancComponent;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && !appearances && colorComponent) {
            // appearancesが含まれない時がAnyのColorSet
            result = parseColorComponent(colorComponent);
        }
    });
    return result;
}

// LightなColorObjectを取り出す
function parseLightColorObject(colors) {
    let result = blancComponent;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && appearances && colorComponent) {
            let appearance = appearances[0];
            let mode = appearance['value'];
            if (mode == "light") {
                result = parseColorComponent(colorComponent);
            }
        }
    });
    return result;
}

// DarkなColorObjectを取り出す
function parseDarkColorObject(colors) {
    let result = blancComponent;
    colors.forEach(function(color) {
        let appearances = color['appearances'];
        let colorComponent = color['color'];
        if (color && appearances && colorComponent) {
            let appearance = appearances[0];
            let mode = appearance['value'];
            if (mode == "dark") {
                result = parseColorComponent(colorComponent);
            }
        }
    });
    return result;
}


function parseColorComponent(colorComponent) {
    let red = Number(colorComponent['components']['red']);
    let green = Number(colorComponent['components']['green']);
    let blue = Number(colorComponent['components']['blue']);
    let alpha = Number(colorComponent['components']['alpha']);
    if (!red && !green && !blue) {
        // rgbが取得できない場合はBlancComponent返却
        return blancComponent;
    } else {
        // 0.0から1.0までの表記の場合0-255に変換する
        if (red <= 1.0 && green <= 1.0 && blue <= 1.0) {
            red = parseDecimalPointRGB(red);
            green = parseDecimalPointRGB(green);
            blue = parseDecimalPointRGB(blue);
        }
        let hexColor = parseHexColor(red, green, blue);
        return {
            'red': red,
            'green': green,
            'blue': blue,
            'alpha': alpha,
            'hex': hexColor
        }
    }
}

function parseDecimalPointRGB(colorValue) {
    return colorValue * 255.0
}

function parseHexColor(red, green, blue) {
    let redHex = ("0" + Math.floor(red).toString( 16 )).slice( -2 );
    let greenHex = ("0" + Math.floor(green).toString( 16 )).slice( -2 );
    let blueHex = ("0" + Math.floor(blue).toString( 16 )).slice( -2 );
    return "#" + redHex + greenHex + blueHex
}