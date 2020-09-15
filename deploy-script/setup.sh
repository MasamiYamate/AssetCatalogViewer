#!/bin/bash
# 管理したいリポジトリのURL入力リクエストする
echo -n Enter the clone url or ssh:
# 入力待ちを行う
read githubPath
# 既存のプロファイルを削除する
rm ".profile"
# profileへの設定
echo "export COLORSET_VIEWER=$githubPath" >> .profile
#viewer側の npm installの実行
cd ../asset-catalog-viewer
npm install

echo "Repository setting completed!!"