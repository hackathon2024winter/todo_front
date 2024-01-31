- ルーティングはこれを参考。7.10 Not Found Error 　まで
  https://reffect.co.jp/react/react-router-6#react-router-dom
- dnd-kit に関する Zenn、Qiita を参考に、表現したい UI を少しずつ拡張し、コードが増えると chatGPT による支援が効き始めたので、独自色が強くなった。
- npm ライブラリに使わないものが混ざったら以下手順で整理する。
  　 1.src フォルダを react-app の外に退避し、react-app フォルダを削除する。
  　 2.必要な npm のライブラリを bulid.sh に記入し docker-compose.yml でコンテナ生成。
  　 3.docker コンテナの view logs を確認しながらプロジェクトの完成を待つ。
  　 4.退避した src フォルダを戻す。

- React のコンポーネントの組み方に 3 種類あるらしい。具体的に採用していないが。
  dnd-kit のフックが管理するプロパティ（この場合 isOver や dragging）を子コンポーネントに動的に渡すためには、確かにいくつかの特定の手法を用いる必要があります。これは、React の標準的なデータフロー（上位コンポーネントから下位コンポーネントへの単方向データフロー）に基づいています。Droppable コンポーネントのようなカスタムフックを利用する場合、そのフックの返り値を子コンポーネントに適切に渡すために、以下のようなアプローチが一般的です：

  1.Render Props パターン: children を関数として利用し、その関数に必要なデータを引数として渡す方法です。これは、フックの戻り値を子コンポーネントに直接渡す柔軟な方法を提供します。
  2.Context API: より複雑なシナリオでは、React の Context API を利用して、状態を下位のコンポーネントに渡すこともできます。これにより、フックが管理する状態をコンポーネントツリーの下位の任意のコンポーネントにアクセス可能にします。
  3.Higher-Order Components (HOC): HOC を使用して、フックの戻り値を特定のコンポーネントのプロパティとして注入することも可能です。これは、特定の機能を多くのコンポーネントに適用したい場合に便利です。

- ToDoContainer.tsx と Droppable.tsx は親子関係になっており、親子の Hook 関数を一致させることで引数である子コンポーネントの状態が伝搬する。
- dummy_fetch.ts の dummyFetch()が バックエンドとの境界になる。バックエンドと接続する場合、const response = await dummyFetch();を const response = await fetch(url);に変える。
- classNames()を使うと tailwindcss でも hook の状態に応じて切り替えられる。
- DragOverLay でマウスカーソルが変化しない。そのためドラッグ中の表現ができない。原因不明。
