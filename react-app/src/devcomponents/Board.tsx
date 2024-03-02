import {
    DndContext,
    DragEndEvent,
    // DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    rectIntersection,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FC, useCallback, useEffect, useState } from "react";
import {
    CardFetchType,
    CardType,
    CategoryFetchType,
    CategoryType,
} from "../utilities/ttypes";
import Category from "./Category";
import AddCategoryModal from "./AddCategoryModal";
import Card from "./Card";
import { BaseURL } from "../utilities/base_url";
import MenuBar from "./MenuBar";
import classnames from "classnames";

const Board: FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [cards, setCards] = useState<CardType[]>([]);
    const [draggedCard, setDraggedCard] = useState<CardType | null>(null);
    const [draggedCategory, setDraggedCategory] = useState<CategoryType | null>(
        null
    );
    // カテゴリ追加の表示状態を管理するstate
    const [isAddCategoryModal, setAddCategoryModal] = useState(false);
    // categories cardsが更新されたかを管理するstate
    const [isUpdated, setIsUpdated] = useState(false);
    // categoryが追加されたかを管理するstate
    const [addCategory, setAddCategory] = useState<CategoryType | null>(null);
    // cardが追加されたかを管理するstate
    const [addCard, setAddCard] = useState<CardType | null>(null);
    // cardが削除されたかを管理するstate
    const [delCard, setDelCard] = useState<CardType | null>(null);
    // categoryが削除されたかを管理するstate
    const [delCategory, setDelCategory] = useState<CategoryType | null>(null);

    // ドラッグ&ドロップする時に許可する入力
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`${BaseURL()}/getcategories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();
            // 解析したJSONからitems配列を取得します
            const items = resData.data;

            // `categoryMap` はオブジェクトであり、キーに基づいてユニークな値を保持します。
            // これは配列と異なり、JSONオブジェクトではキーがユニークであるため、
            // 新しい要素を追加する際に "append"（末尾に追加する操作）は不要です。
            // 既存のキーに新しい値を割り当てると、自動的にそのキーの値が更新されます。
            const categoryMap: { [key: string]: CategoryType } = {};

            // `items` 配列をforEachでループし、重複がないように `categoryMap` に要素を追加します。
            // ここでのキーは `col_id` であり、これがJSONオブジェクトのユニークなプロパティとなります。
            items.forEach((item: CategoryFetchType) => {
                if (!categoryMap[item.col_id]) {
                    // ここでの割り当ては、対応するキーが既に存在しない場合にのみ行われます。
                    // キーが既に存在する場合、新しい割り当ては無視され、値は保持されます。
                    categoryMap[item.col_id] = {
                        col_pos: item.col_pos,
                        id: item.col_id,
                        col_name: item.col_name,
                        description: item.description,
                    };
                }
            });

            // マップからソートされた配列を作成し、状態を更新
            const categories = Object.values(categoryMap).sort(
                (a, b) => a.col_pos - b.col_pos
            );
            setCategories(categories);
        };

        const fetchCard = async () => {
            const response = await fetch(`${BaseURL()}/getcards`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();
            // 解析したJSONからitems配列を取得します
            const items = resData.data;

            const cardMap: { [key: string]: CardType } = {};

            items.forEach((item: CardFetchType) => {
                // カードのMapの重複を除いて更新
                if (!cardMap[item.card_id]) {
                    cardMap[item.card_id] = {
                        card_pos: item.card_pos,
                        id: item.card_id,
                        col_id: item.col_id,
                        card_name: item.card_name,
                        input_date: item.input_date,
                        due_date: item.due_date,
                        color: item.color,
                        description: item.description,
                    };
                }
            });

            // マップからソートされた配列を作成し、状態を更新
            const cards = Object.values(cardMap).sort(
                (a, b) => a.card_pos - b.card_pos
            );
            setCards(cards);
        };

        fetchCategory();
        fetchCard();
    }, []); // 依存配列を空に設定して、コンポーネントのマウント時にのみ実行

    // categoryが更新されたら並び替え
    useEffect(() => {
        categories.forEach((category, index) => {
            category.col_pos = index;
        });
    }, [categories]);

    useEffect(() => {
        cards.forEach((card, index) => {
            card.card_pos = index;
        });
    }, [cards]);

    // isUpdateが変化したらupdateのfetch
    useEffect(() => {
        if (isUpdated) {
            // cards.map((card) => {
            //     console.log(`Card:${card.card_name} Col:${card.col_id} Pos:${card.card_pos} `)
            // })

            // console.log("以下でfetch投げる");
            categories.forEach(async (category) => {
                const categoryInfo: CategoryFetchType = {
                    col_id: category.id,
                    col_pos: category.col_pos,
                    col_name: category.col_name,
                    description: category.description,
                };

                try {
                    const response = await fetch(`${BaseURL()}/updatecategory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(categoryInfo),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${category.col_name}の更新成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            });

            cards.forEach(async (card) => {
                const cardInfo: CardFetchType = {
                    card_id: card.id,
                    card_pos: card.card_pos,
                    col_id: card.col_id,
                    card_name: card.card_name,
                    input_date: new Date().toISOString().split("T")[0],
                    due_date: card.due_date,
                    color: card.color,
                    description: card.description,
                };

                try {
                    const response = await fetch(`${BaseURL()}/updatecard`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cardInfo),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${card.card_name}の更新成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }, [cards, categories, isUpdated]);

    useEffect(() => {
        // 非同期処理を行うための内部関数を定義
        const fetchData = async () => {
            if (addCategory) {
                const newCat: CategoryFetchType = {
                    col_id: addCategory.id,
                    col_pos: addCategory.col_pos,
                    col_name: addCategory.col_name,
                    description: addCategory.description,
                };
                try {
                    const response = await fetch(`${BaseURL()}/addcategory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newCat),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${addCategory?.col_name}の追加成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData(); // 定義した非同期関数を呼び出し
    }, [addCategory]);

    useEffect(() => {
        // 非同期処理を行うための内部関数を定義
        const fetchData = async () => {
            if (addCard) {
                const newCard: CardFetchType = {
                    card_id: addCard.id,
                    card_pos: addCard.card_pos,
                    col_id: addCard.col_id,
                    card_name: addCard.card_name,
                    input_date: addCard.input_date,
                    due_date: addCard.due_date,
                    color: addCard.color,
                    description: addCard.description,
                };
                try {
                    const response = await fetch(`${BaseURL()}/addcard`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newCard),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${addCard?.card_name}の追加成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData(); // 定義した非同期関数を呼び出し
    }, [addCard]);

    useEffect(() => {
        // 非同期処理を行うための内部関数を定義
        const fetchData = async () => {
            if (delCard) {
                try {
                    const response = await fetch(`${BaseURL()}/delcard`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            card_id: delCard.id,
                        }),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${addCard?.card_name}の追加成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData(); // 定義した非同期関数を呼び出し
    }, [delCard]);

    useEffect(() => {
        // 非同期処理を行うための内部関数を定義
        const fetchData = async () => {
            if (delCategory) {
                try {
                    const response = await fetch(`${BaseURL()}/delcategory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            col_id: delCategory.id,
                        }),
                    });

                    const responseData = await response.json(); // レスポンスのJSONを解析
                    if (response.ok) {
                        // console.log(`${addCard?.card_name}の追加成功`);
                    } else {
                        console.log(responseData.detail);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData(); // 定義した非同期関数を呼び出し
    }, [delCategory]);

    // Drag中のマウスに追随させるコンポーネントの表示フラグ
    const onDragStart = useCallback(
        (e: DragStartEvent) => {
            const { active } = e;

            const activePrefix = active.id.toString().split("-")[0];
            switch (activePrefix) {
                case "card": {
                    setDraggedCard(cards.find((card) => card.id === active.id) || null);
                    break;
                }
                case "category": {
                    setDraggedCategory(
                        categories.find((category) => category.id === active.id) || null
                    );
                    break;
                }
                default:
                    // ここには到達しないはずだが、プレフィックスが想定外の値の場合。
                    console.log("Unknown prefix:", activePrefix);
                    break;
            }
        },
        [cards, categories]
    );

    const onDragEnd = useCallback(
        (e: DragEndEvent) => {
            const { active, over } = e;
            setDraggedCard(null);
            setDraggedCategory(null);
            const activePrefix = active.id.toString().split("-")[0];
            const overPrefix = over?.id.toString().split("-")[0];

            switch (activePrefix) {
                case "card": {
                    const activeCardIndex = cards.findIndex(
                        (card) => card.id === active.id
                    );
                    if (overPrefix === "card") {
                        // Categoryを跨ぐ・跨がないに関わらず、activeをoverのcol_idに変更
                        const overCardIndex = cards.findIndex(
                            (card) => card.id === over?.id
                        );

                        // undefinedの処理が面倒なので、ここで弾く
                        const colId = over ? cards[overCardIndex].col_id : "";
                        if (activeCardIndex !== -1 && colId !== "") {
                            // 新しいカード配列を作成する。元の配列は変更しない。
                            const updatedCards = cards.map((card, index) => {
                                if (index === activeCardIndex) {
                                    // 新しい col_id を持つ新しいオブジェクトを返す
                                    return { ...card, col_id: colId };
                                }
                                // その他のカードはそのまま返す
                                return card;
                            });

                            // reorderedCards の定義と使用
                            const reorderedCards = arrayMove(
                                updatedCards,
                                activeCardIndex,
                                overCardIndex
                            );

                            // ステートを更新する。新しい配列で更新するので、不変性が保たれる。
                            setCards(reorderedCards);
                            setIsUpdated(true);
                        }
                        // // 新しいカード配列を作成し、col_idを更新
                        // const newCards = cards.map((card, index) => {
                        //     if (index === activeCardIndex) {
                        //         return { ...card, col_id: colId };
                        //     }
                        //     return card;
                        // });
                        // // カードの順番を更新
                        // const reorderedCards = arrayMove(
                        //     newCards,
                        //     activeCardIndex,
                        //     overCardIndex
                        // );

                        // // ステートを更新
                        // setCards(reorderedCards);
                        // setIsUpdated(true);
                    } else if (overPrefix === "category") {
                        const overCategoryId = over?.id.toString(); // ドロップ先のカテゴリIDをstring型に変換
                        if (activeCardIndex !== -1 && overCategoryId) {
                            // 新しいカード配列を作成し、col_idを更新
                            const updatedCards = cards.map((card, index) => {
                                if (index === activeCardIndex) {
                                    // overのカテゴリIDにcol_idを更新（string型）
                                    return { ...card, col_id: overCategoryId };
                                }
                                return card;
                            });

                            // activeのcol_idを更新
                            cards[activeCardIndex].col_id = overCategoryId;

                            // reorderedCards の定義と使用を修正
                            const reorderedCards = arrayMove(
                                updatedCards,
                                activeCardIndex,
                                updatedCards.length
                            );

                            // ステートを更新
                            setCards(reorderedCards);
                            setIsUpdated(true);
                        }
                    }
                    break;
                }
                case "category": {
                    const activeCategory = categories.find(
                        (category) => category.id === active.id
                    );
                    if (activeCategory && activePrefix === overPrefix) {
                        const oldIndex = categories.findIndex(
                            (category) => category.id === active.id
                        );

                        const newIndex = categories.findIndex(
                            (category) => category.id === over?.id
                        );

                        // `arrayMove`で新しい配列を作成
                        const newCategories = arrayMove(categories, oldIndex, newIndex);

                        // 各category.col_posを更新後のindexと一致させる
                        categories.forEach((category, index) => {
                            category.col_pos = index;
                        });

                        categories.forEach((category) => {
                            const targetCards = cards.filter(
                                (card) => card.col_id === category.id
                            );
                            targetCards?.forEach((card, index) => {
                                card.card_pos = index;
                            });
                        });

                        // ステートを更新
                        setCategories(newCategories);
                        setIsUpdated(true);
                    }
                    break;
                }
                default:
                    // ここには到達しないはずだが、プレフィックスが想定外の値の場合。
                    console.log("Unknown prefix:", activePrefix);
                    break;
            }
        },
        [cards, categories]
    );

    // const onDragMove = useCallback(
    //     (e: DragMoveEvent) => {
    //         const { active, over } = e;

    //         const activePrefix = active.id.toString().split("-")[0];
    //         const overPrefix = over?.id.toString().split("-")[0];
    //         switch (activePrefix) {
    //             case "card": {
    //                 const activeCard = cards.find((card) => card.id === active.id);
    //                 if (activeCard) {
    //                     // console.log(
    //                     //     `Move: ${activeCard.id.toString().slice(0, 15)} Over: ${over?.id
    //                     //         .toString()
    //                     //         .slice(0, 15)}`
    //                     // );
    //                 }
    //                 break;
    //             }
    //             case "category": {
    //                 const activeCategory = categories.find(
    //                     (category) => category.id === active.id
    //                 );
    //                 if (activeCategory && activePrefix === overPrefix) {
    //                     // console.log(
    //                     //     `Move: ${activeCategory.id
    //                     //         .toString()
    //                     //         .slice(0, 15)} Over: ${over?.id.toString().slice(0, 15)}`
    //                     // );
    //                 }
    //                 break;
    //             }
    //             default:
    //                 // ここには到達しないはずだが、プレフィックスが想定外の値の場合。
    //                 console.log("Unknown prefix:", activePrefix);
    //                 break;
    //         }
    //     },
    //     [cards, categories]
    // );

    // カテゴリ追加を開く関数
    const openAddCategory = () => {
        setAddCategoryModal(true);
    };

    // カテゴリ追加を閉じる関数
    const closeAddCategory = () => {
        setAddCategoryModal(false);
    };

    return (
        <div className="bg-PoulGray h-full">
            <MenuBar />
            <div className=" m-auto flex flex-row bg-PoulGray">
                <DndContext
                    sensors={sensors}
                    collisionDetection={rectIntersection}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                // onDragMove={onDragMove}
                >
                    <div className=" flex flex-row gap-4 ml-[15px] mt-[75px]">
                        {categories.map((category) => (
                            <div key={category.id} className="">
                                <Category
                                    category={category}
                                    setCategories={setCategories} //状態categoriesとそのアクセッサーsetCategoriesは個別のプロパティで渡すべき。
                                    setCards={setCards} //状態cardsとそのアクセッサーsetCardsは個別のプロパティで渡すべき。
                                    cards={cards}
                                    setAddCard={setAddCard}
                                    setDelCard={setDelCard}
                                    categories={categories}
                                    setDelCategory={setDelCategory}
                                    className="bg-[#ECDED5] w-[230px] max-h-[500px] overflow-y-auto rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    <DragOverlay>
                        {draggedCategory ? (
                            <Category
                                category={draggedCategory}
                                setCategories={setCategories}
                                setCards={setCards}
                                cards={cards}
                                setAddCard={setAddCard}
                                setDelCard={setDelCard}
                                categories={categories}
                                setDelCategory={setDelCategory}
                                className="bg-[#ECDED5] w-[230px] h-[300px] max-h-[500px] rounded-md"
                            />
                        ) : null}

                        {draggedCard ? (
                            <Card
                                card={draggedCard}
                                className={classnames(
                                    "my-2",
                                    "mx-1",
                                    "py-2",
                                    "bg-[#F0EFEE]",
                                    "flex",
                                    "flex-row",
                                    "justify-between",
                                    "items-center",
                                    "rounded-sm",
                                    draggedCard.color === "red"
                                        ? "border-l-[18px] border-solid border-PoulRed"
                                        : draggedCard.color === "blue"
                                            ? "border-l-[18px] border-solid border-PoulBlue"
                                            : draggedCard.color === "yellow"
                                                ? "border-l-[18px] border-solid border-PoulYellow"
                                                : "bg-white"
                                )}
                                setCards={setCards}
                                cards={cards}
                                setDelCard={setDelCard}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
                <button
                    onClick={openAddCategory}
                    className="ml-4 h-[60px] w-auto min-w-[120px] rounded-lg p-2 bg-PoulOrange cursor-pointer active:scale-95 focus:outline-none select-none mt-[75px] hover:text-white hover:bg-opacity-50 "
                >
                    <div className="flex justify-between items-center">
                        <div className="w-6 h-6 ">
                            <img src={"/add-icon.svg"} alt="追加" />
                        </div>
                        <span className="whitespace-normal break-words">
                            カテゴリの追加
                        </span>
                    </div>
                </button>
            </div>
            {isAddCategoryModal && (
                <AddCategoryModal
                    closeAddCategory={closeAddCategory}
                    setCategories={setCategories}
                    categories={categories}
                    setAddCategory={setAddCategory}
                />
            )}
        </div>
    );
};

export default Board;
