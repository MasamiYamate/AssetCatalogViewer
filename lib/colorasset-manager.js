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
                    parseColorSetObject(path);
                    console.log(path);
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
    let assetName = assetPath.match(/([^/]+?)?$/);
    console.log(assetName[0]);
    console.log(assetPath);
    let template = {}
    let object = fileManager.loadJson(path);
}
