import { ToDoList } from "./types";

export const dummyFetch = async () => {
  const dummyJson = {
    items: [
      {
        "card_id": 1,
        "col_id": 1,
        "card_name": "朝ごはんを作る",
        "col_name": "未着手",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color1",
        "description": "昨日のカレー"
      },
      {
        "card_id": 2,
        "col_id": 2,
        "card_name": "レポートを書く",
        "col_name": "進行中",
        "input_date": "2024/01/30",
        "due_date": "2024/02/05",
        "color": "color2",
        "description": "市場分析に関するレポート"
      },
      {
        "card_id": 3,
        "col_id": 1,
        "card_name": "ジムに行く",
        "col_name": "未着手",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color3",
        "description": "新しいトレーニングプランを試す"
      },
      {
        "card_id": 4,
        "col_id": 3,
        "card_name": "買い物に行く",
        "col_name": "完了",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color4",
        "description": "週末の食料品"
      },
      {
        "card_id": 5,
        "col_id": 2,
        "card_name": "犬の散歩",
        "col_name": "進行中",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color5",
        "description": "公園までの長い散歩"
      },
      {
        "card_id": 6,
        "col_id": 1,
        "card_name": "友人との会食",
        "col_name": "未着手",
        "input_date": "2024/01/30",
        "due_date": "2024/02/03",
        "color": "color6",
        "description": "新しいレストランでのディナー"
      },
      {
        "card_id": 7,
        "col_id": 3,
        "card_name": "図書館から本を返す",
        "col_name": "完了",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color7",
        "description": "借りていた小説"
      },
      {
        "card_id": 8,
        "col_id": 2,
        "card_name": "車のメンテナンス",
        "col_name": "進行中",
        "input_date": "2024/01/30",
        "due_date": "2024/02/10",
        "color": "color8",
        "description": "オイル交換とタイヤチェック"
      },
      {
        "card_id": 9,
        "col_id": 1,
        "card_name": "家の掃除",
        "col_name": "未着手",
        "input_date": "2024/01/30",
        "due_date": "2024/02/01",
        "color": "color9",
        "description": "リビングとキッチン"
      },
      {
        "card_id": 10,
        "col_id": 3,
        "card_name": "植物に水をやる",
        "col_name": "完了",
        "input_date": "2024/01/30",
        "due_date": "2024/01/31",
        "color": "color10",
        "description": "すべての室内植物"
      }
    ]
  };

  return dummyJson as ToDoList;
}