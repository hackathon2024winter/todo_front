#!/bin/bash
set -e

export $(xargs < .env)

cd ./nextjs
# 最初にnextjsのプロジェクトをインストールする場合=serverフォルダが完全に空っぽ
if [ -z "$(ls -A . )" ]; then
  npx create-next-app@12.3.4 . --ts --yes
  # npmライブラリはここに追加して下さい。
  yarn add react react-dom interactjs
  yarn add typescript @types/node --save-dev
fi

# clone直後はnode_modulesフォルダだけが無い。package.jsonに基づいてインストール
yarn

if [ "$NODE_ENV" = "development" ]
then
  yarn run dev
elif [ "$NODE_ENV" = "production" ]
then
  yarn run build
  yarn run start
fi

# tail -f /dev/null
