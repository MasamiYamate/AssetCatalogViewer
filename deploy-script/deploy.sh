#!/bin/bash
# 環境変数の読み込み
source .profile
# git cloneの実施
rm -rf "../app-repository"
mkdir "../app-repository"
cd ../app-repository
git clone $COLORSET_VIEWER

# color-setの読み込み
cd ../
pwd
node index.js -p "./app-repository"

# viewerの更新
cd ./asset-catalog-viewer
npm run build

echo "Success!!"