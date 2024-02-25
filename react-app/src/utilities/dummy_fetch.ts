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

export const dummyFetchCard = async () => {
  const dummyJson = {
    items: [
      {
        "card_id": "5fa25678-4df3-458b-87a8-df45397daba3",
        "card_pos": 1,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "朝ごはんを作る",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color1",
        "description": "昨日のカレー"
      },
      {
        "card_id": "b2c04f39-66d7-4eaf-af36-d52a23492e94",
        "card_pos": 2,
        "col_id": "734c5844-7cba-4c51-8d0c-9830d09bb562",
        "card_name": "レポートを書く",
        "input_date": "2024-01-30",
        "due_date": "2024-02-05",
        "color": "color2",
        "description": "市場分析に関するレポート"
      },
      {
        "card_id": "7e26623f-2903-4e60-b146-0075d38e7503",
        "card_pos": 3,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "ジムに行く",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color3",
        "description": "新しいトレーニングプランを試す"
      },
      {
        "card_id": "05236ffd-eefd-42b1-a895-b474c243316d",
        "card_pos": 4,
        "col_id": "7414208f-560c-4641-8d08-f7ea576d4f6f",
        "card_name": "買い物に行く",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color4",
        "description": "週末の食料品"
      },
      {
        "card_id": "29207055-e668-40ef-9668-a0a9d35dca3a",
        "card_pos": 5,
        "col_id": "734c5844-7cba-4c51-8d0c-9830d09bb562",
        "card_name": "犬の散歩",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color5",
        "description": "公園までの長い散歩"
      },
      {
        "card_id": "9c16f9d6-b968-4873-be2e-b30779228211",
        "card_pos": 6,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "友人との会食",
        "input_date": "2024-01-30",
        "due_date": "2024-02-03",
        "color": "color6",
        "description": "新しいレストランでのディナー"
      },
      {
        "card_id": "9ad92ac4-0e74-454f-9b6f-540df58a3e52",
        "card_pos": 7,
        "col_id": "7414208f-560c-4641-8d08-f7ea576d4f6f",
        "card_name": "図書館から本を返す",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color7",
        "description": "借りていた小説"
      },
      {
        "card_id": "017f8b11-4e1e-470d-b8f8-38f35d3996c8",
        "card_pos": 8,
        "col_id": "734c5844-7cba-4c51-8d0c-9830d09bb562",
        "card_name": "車のメンテナンス",
        "input_date": "2024-01-30",
        "due_date": "2024-02-10",
        "color": "color8",
        "description": "オイル交換とタイヤチェック"
      },
      {
        "card_id": "ae7004f1-eb7c-49bd-b366-83f3ce842568",
        "card_pos": 9,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "card_name": "家の掃除",
        "input_date": "2024-01-30",
        "due_date": "2024-02-01",
        "color": "color9",
        "description": "リビングとキッチン"
      },
      {
        "card_id": "32b49316-3525-491b-a2d5-4c38adf72b4d",
        "card_pos": 10,
        "col_id": "7414208f-560c-4641-8d08-f7ea576d4f6f",
        "card_name": "植物に水をやる",
        "input_date": "2024-01-30",
        "due_date": "2024-01-31",
        "color": "color10",
        "description": "すべての室内植物"
      }
    ]
  };

  return dummyJson
}

export const dummyFetchCategory = async () => {
  const dummyJson = {
    items: [
      {
        "col_pos": 1,
        "col_id": "76cfdd6b-32d9-4938-9c03-32905e50f7ac",
        "col_name": "未着手",
        "description": "まだ手を付けていないもの"
      },
      {
        "col_pos": 2,
        "col_id": "734c5844-7cba-4c51-8d0c-9830d09bb562",
        "col_name": "進行中",
        "description": "現在進行中"
      },
      {
        "col_pos": 3,
        "col_id": "7414208f-560c-4641-8d08-f7ea576d4f6f",
        "col_name": "完了",
        "description": "完了しました"
      },
      {
        "col_pos": 4,
        "col_id": "bf7e0b03-ecd8-415a-8f6b-36ae8c4154ed",
        "col_name": "未分類",
        "description": "まだよくわからない"
      },
    ]
  };

  return dummyJson
}