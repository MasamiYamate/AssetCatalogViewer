const fileManager = require('./file-manager');

exports.generateMarkdown =  function generateMarkdown(assetJson) {
    let result = ""
    if (assetJson.colors) {
        result += fetchColorTableHeader();
        for (const key in assetJson.colors) {
            const item = assetJson.colors[key];
            result += fetchColorTableRow(item);
        }
    }
    if (assetJson.images) {
        result += '\n';
        result += fetchImageTableHeader();
        for (const key in assetJson.images) {
            const item = assetJson.images[key];
            result += fetchImageTableRow(item);
        }
    }
    fileManager.saveMarkDown(result);
}

function fetchColorTableHeader() {
    return `| Color Name |  Any Color  |  Light Color  |  Dark Color  |\n| ---- | ---- | ---- | ---- |\n` ;
}

function fetchImageTableHeader() {
    return `| Image Name | Device |  Any @x1  |  Any @x2  |  Any @x3  |  Light @x1  |  Light @x2  |  Light @x3  |  Dark @x1  |  Dark @x2  |  Dark @x3  |\n| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |\n`
}

function fetchColorTableRow(colorItem) {
    let result = "";
    if (!colorItem.name || !colorItem.value) {
        return result;
    }
    const name = colorItem.name.replace(".colorset", "");
    const value = colorItem.value;
    let anyColor = "";
    let lightColor = "";
    let darkColor = "";
    anyColor = fetchColorBlock(value.any);
    lightColor = fetchColorBlock(value.light);
    darkColor = fetchColorBlock(value.dark);
    result = `| ${ name } | ${ anyColor } | ${ lightColor} | ${ darkColor } |\n`;
    return result;
}

function fetchColorBlock(colorItem) {
    if (!colorItem) {
        return "";
    }

    const red = colorItem.red;
    const green = colorItem.green;
    const blue = colorItem.blue;
    const alpha = colorItem.alpha;
    const hex = colorItem.hex;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})<br>Hex: ${hex}<bar><span style="font-size: 200%; color: ${hex};">■</span>`;
}

function fetchImageTableRow(imageItem) {
    let result = "";
    if (!imageItem.name || !imageItem.path || !imageItem.value) {
        return result;
    }
    const name = imageItem.name.replace(".imageset", "");
    const path = imageItem.path;
    for (const key in imageItem.value) {
        const images = imageItem.value[key];
        const imageStyleRow = fetchImageStyleTableRow(name, path, key, images);
        result += `${ imageStyleRow }\n`;
    }
    return result;
}

function fetchImageStyleTableRow(name, path, device, images) {
    let result = "";
    result += `| ${ name } | ${ device } |`;
    result += fetchImageScaleTableItems(path, images.any);
    result +=fetchImageScaleTableItems(path, images.light);
    result += fetchImageScaleTableItems(path, images.dark);
    return result;
}

function fetchImageScaleTableItems(path, images) {
    if (images) {
        let result = '';
        result += fetchImageScaleTableItem(path, images['1x']);
        result += fetchImageScaleTableItem(path, images['2x']);
        result += fetchImageScaleTableItem(path, images['3x']);
        return result;
    } else {
        return ' ---- | ---- | ---- |';
    }
}

function fetchImageScaleTableItem(path, imageName) {
    if (!imageName) {
        return ' Not set |';
    }
    const copiedPath = fileManager.copyImage(path, imageName);
    return `![${imageName}](${ copiedPath }) |`;
}