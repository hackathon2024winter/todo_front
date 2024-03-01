import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
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
                        const overCardIndex = cards.findIndex(
                            (card) => card.id === over?.id
                        );

                        // Categoryを跨ぐ・跨がないに関わらず、activeをoverのcol_idに変更
                        if (activeCardIndex !== -1 && overCardIndex !== -1) {
                            // 新しいカード配列を作成し、col_idを更新
                            const newCards = cards.map((card, index) => {
                                if (index === activeCardIndex) {
                                    return { ...card, col_id: cards[overCardIndex].col_id };
                                }
                                return card;
                            });
                            // カードの順番を更新
                            const reorderedCards = arrayMove(
                                newCards,
                                activeCardIndex,
                                overCardIndex
                            );

                            // ステートを更新
                            setCards(reorderedCards);
                        }
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

                            // ここでエラーが発生していた reorderedCards の定義と使用を修正
                            const reorderedCards = arrayMove(
                                updatedCards,
                                activeCardIndex,
                                updatedCards.length
                            );

                            // ステートを更新
                            setCards(reorderedCards);
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

                        // ステートを更新
                        setCategories(newCategories);
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

    const onDragMove = useCallback(
        (e: DragMoveEvent) => {
            const { active, over } = e;

            const activePrefix = active.id.toString().split("-")[0];
            const overPrefix = over?.id.toString().split("-")[0];
            switch (activePrefix) {
                case "card": {
                    const activeCard = cards.find((card) => card.id === active.id);
                    if (activeCard) {
                        console.log(
                            `Move: ${activeCard.id.toString().slice(0, 15)} Over: ${over?.id
                                .toString()
                                .slice(0, 15)}`
                        );
                    }
                    break;
                }
                case "category": {
                    const activeCategory = categories.find(
                        (category) => category.id === active.id
                    );
                    if (activeCategory && activePrefix === overPrefix) {
                        console.log(
                            `Move: ${activeCategory.id
                                .toString()
                                .slice(0, 15)} Over: ${over?.id.toString().slice(0, 15)}`
                        );
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
                    onDragMove={onDragMove}
                >
                    <div className=" flex flex-row gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="">
                                <Category
                                    category={category}
                                    setCategories={setCategories} //状態categoriesとそのアクセッサーsetCategoriesは個別のプロパティで渡すべき。
                                    setCards={setCards} //状態cardsとそのアクセッサーsetCardsは個別のプロパティで渡すべき。
                                    cards={cards}
                                    className="bg-[#ECDED5] w-[230px] h-[300px] max-h-[500px] rounded-md"
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
                                className="bg-[#ECDED5] w-[230px] h-[300px] max-h-[500px] rounded-md"
                            />
                        ) : null}

                        {draggedCard ? (
                            <Card
                                card={draggedCard}
                                className={
                                    classnames("my-2", "mx-1", "py-2", "bg-[#F0EFEE]", "flex", "flex-row",
                                        "justify-between", "items-center", "rounded-sm",
                                        draggedCard.color === "red" ? "border-l-[18px] border-solid border-PoulRed" :
                                            draggedCard.color === "blue" ? "border-l-[18px] border-solid border-PoulBlue" :
                                                draggedCard.color === "yellow" ? "border-l-[18px] border-solid border-PoulYellow" :
                                                    "bg-white")
                                }
                                setCards={setCards}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
                <button
                    onClick={openAddCategory}
                    className="
                    ml-4
                    h-[60px]
                    rounded-lg p-2 
                    bg-PoulOrange 
                    cursor-pointer active:scale-95 focus:outline-none
                    select-none
                    hover:text-white hover:bg-opacity-50"
                >
                    <div className="flex justify-between">
                        <div className="w-6 h-6">
                            <img src={"/add-icon.svg"} alt="Description" />
                        </div>
                        カテゴリの追加
                    </div>
                </button>
            </div>
            {isAddCategoryModal && (
                <AddCategoryModal
                    closeAddCategory={closeAddCategory}
                    setCategories={setCategories}
                />
            )}
        </div>
    );
};

export default Board;
