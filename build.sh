#!/bin/bash
set -e

export $(xargs < .env)

DIR="react-app"

if [ -d $DIR ]; then
  cd ./react-app
else
  npm create vite@latest react-app -- --template react-swc-ts  
  cd ./react-app
  # npmライブラリはここに追加して下さい。
  yarn add react react-dom react-router-dom @dnd-kit/core @dnd-kit/sortable
  yarn add typescript @types/node --save-dev
  sed -i "/plugins: \[/a \ \ server: {\n\ \ \ \ host: '0.0.0.0'\n\ \ }," vite.config.ts
  yarn add -D tailwindcss postcss autoprefixer
  npx tailwindcss init
  sed -i "s/content: \[\]/content: \[\".\/src\/\*\*\/\*.{js,jsx,ts,tsx}\"\]/" tailwind.config.js
fi

# cd ./react
# # 最初にreactのプロジェクトをインストールする場合=serverフォルダが完全に空っぽ
# if [ -z "$(ls -A . )" ]; then
#   # npx create-react-app react_prj --template typescrip
#   npm create vite@latest my-react-app -- --template react-swc-ts
#   # npmライブラリはここに追加して下さい。
#   yarn add react react-dom
#   yarn add typescript @types/node --save-dev
# fi

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
