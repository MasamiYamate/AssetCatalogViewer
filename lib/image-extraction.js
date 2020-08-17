const rx = require('rxjs');
const fileManager = require('./file-manager');

module.exports = {
    extractionResource
}

/**
 * Imageを取得する
 *
 * @param {*} path
 * @returns
 */
function extractionResource(paths) {
    return rx.Observable.create(observer => {
        let images = [];
        paths.forEach(path => {
            let image = extractionImageResource(path);
            if (image) {
                images.push(image);
            }
        });
        observer.next(images);
        observer.complete();
    });
}

/**
 * ImageSetオブジェクトを取得する
 * @param {*} path 
 */
function extractionImageResource(path) {
    let result = null;
    let assetPath = path.replace(/\/Contents.json/g, '');
    let matchStrings = assetPath.match(/([^/]+?)?$/);
    let object = fileManager.loadJson(path);
    let images = object['images'];
    if (!images) {
        // imagesがない時は、ImageSetではないので
        // 早期リターン
        return result;
    }
    for(const index in images) {
        let image = images[index];
        let fileName = image['filename'];
        if (fileName) {
            result = {
                'name': fileName,
                'path': assetPath + "/" + fileName
            };
        }
    }
    return result;
}