# AssetCatalogViewer
Parse the Asset Catalog and make it viewable in the browser.

## Description
By reading the contents of the AssetCatalog handled in Xcode, you can generate a page where you can view the colors and images currently being used in the project.
This makes it easy for non-engineers to browse the adapted material.

## Installation
Execute the following command in the root directory
```
$ npm install
```

## Setup procedure
Execute the following command in the root directory
You will be asked to enter the Github URL of the project you want to manage the material for.
Enter a valid, Git clone-able URL.
```
$ npm run setup

> colorsetjsonparser@1.0.0 setup /Users/hogehoge/Documents/Workspace/AssetCatalogViewer
> bash ./deploy-script/setup.sh

Enter the clone url or ssh: 【github url or ssh】
audited 1312 packages in 4.365s

56 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Repository setting completed!!
```
## Build Procedure
Execute the following command in the root directory
If you see "success", the build is complete.
```
$ npm run build

Success!!
```

To view the generated viewer, go to index.html under the dist directory

## Notes.
Currently, only ColorSet is available in the Viewer.
Please wait a little longer as the ImageSet is not yet implemented.