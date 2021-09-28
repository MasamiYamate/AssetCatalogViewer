# AssetCatalogViewer
Analyze the asset catalog and output a list of materials in a Markdown file.

## Description
By reading the contents of the AssetCatalog handled in Xcode, you can generate a file where you can view the colors and images currently being used in the project.
This makes it easy for non-engineers to browse the adapted material.

## Installation
Execute the following command in the root directory
```
$ npm install
```

## How to use
Prepare the directory path of the iOS project in advance.

Execute the following command.
Give the directory path of the iOS project as the -p argument.

```sh
$ npm run build -- -p (project path)
```
A Markdown file of the analysis results will be generated under the dist directory.