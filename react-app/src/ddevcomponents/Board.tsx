import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FC, useCallback, useEffect, useState } from "react";
import { CardType, CategoryType } from "../utilities/ttypes";
import Category from "./Category";
import AddCategoryModal from "./AddCategoryModal";

const Board: FC = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [cards, setCards] = useState<CardType[]>([]);
    const [dnds, setDnds] = useState<CategoryType[] | CardType[]>([]);

    const [draggedCategory, setdraggedCategory] = useState<CategoryType | null>(
        null
    );
    const [draggedCard, setdraggedCard] = useState<CardType | null>(null);

    // ドラッグ&ドロップする時に許可する入力
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // カテゴリ追加の表示状態を管理するstate
    const [isAddCategoryModal, setAddCategoryModal] = useState(false);

    useEffect(() => {
        // ここで商品データを初期化
        // 実際のアプリではAPIからデータをフェッチすることが多いですが、例示のために静的なデータを使用
        const initialCategories: CategoryType[] = [
            {
                col_pos: 1,
                id: "category-76cfdd6b-32d9-4938-9c03-32905e50f7ac",
                col_name: "未着手",
                description: "まだ手を付けていないもの",
            },
            {
                col_pos: 2,
                id: "category-734c5844-7cba-4c51-8d0c-9830d09bb562",
                col_name: "進行中",
                description: "現在進行中",
            },
            {
                col_pos: 3,
                id: "category-7414208f-560c-4641-8d08-f7ea576d4f6f",
                col_name: "完了",
                description: "完了しました",
            },
            {
                col_pos: 4,
                id: "category-bf7e0b03-ecd8-415a-8f6b-36ae8c4154ed",
                col_name: "未分類",
                description: "まだよくわからない",
            },
        ];
        setCategories(initialCategories);

        const initialCards: CardType[] = [
            {
                id: "card-5fa25678-4df3-458b-87a8-df45397daba3",
                card_pos: 1,
                col_id: "category-76cfdd6b-32d9-4938-9c03-32905e50f7ac",
                card_name: "朝ごはんを作る",
                input_date: "2024-01-30",
                due_date: "2024-01-31",
                color: "color1",
                description: "昨日のカレー",
            },
            {
                id: "card-b2c04f39-66d7-4eaf-af36-d52a23492e94",
                card_pos: 2,
                col_id: "category-734c5844-7cba-4c51-8d0c-9830d09bb562",
                card_name: "レポートを書く",
                input_date: "2024-01-30",
                due_date: "2024-02-05",
                color: "color2",
                description: "市場分析に関するレポート",
            },
            {
                id: "card-7e26623f-2903-4e60-b146-0075d38e7503",
                card_pos: 3,
                col_id: "category-76cfdd6b-32d9-4938-9c03-32905e50f7ac",
                card_name: "ジムに行く",
                input_date: "2024-01-30",
                due_date: "2024-01-31",
                color: "color3",
                description: "新しいトレーニングプランを試す",
            },
        ];
        setCards(initialCards);

        setDnds([...initialCategories, ...initialCards])
    }, []); // 空の依存配列を渡して、マウント時にのみ実行

    const onDragStart = useCallback(
        (e: DragStartEvent) => {
            const { active } = e;
            const activeType = active.id.toString().split("-")[0]; // "category" または "card"
            if (activeType === "card") {
                const activeCard = cards.find((card) => card.id === active.id);
                // console.log(`Start: ${activeCard?.card_name}`);
                setdraggedCard(activeCard || null);
            } else if (activeType === "category") {
                const activeCategory = categories.find(
                    (category) => category.id === active.id
                );
                // console.log(`Start: ${activeCategory?.col_name}`);
                setdraggedCategory(activeCategory || null);
            }
        },
        [cards, categories]
    );

    const onDragEnd = useCallback(
        (e: DragEndEvent) => {
            const { active, over } = e;
            const overeType = over?.id.toString().split("-")[0]; // "category" または "card"
            if (overeType === "card") {
                const overCard = cards.find((card) => card.id === over?.id);
                // console.log(`End: ${overCard?.card_name}`);
            } else if (overeType === "category") {
                const overCategory = categories.find(
                    (category) => category.id === over?.id
                );
                // console.log(`End: ${overCategory?.col_name}`);
            }
        },
        [cards, categories]
    );

    const onDragMove = useCallback(
        (e: DragMoveEvent) => {
            const { active, over } = e;
            const overeType = over?.id.toString().split("-")[0]; // "category" または "card"
            if (overeType === "card") {
                const overCard = cards.find((card) => card.id === over?.id);
                console.log(`Move: ${overCard?.card_name}`);
            } else if (overeType === "category") {
                const overCategory = categories.find(
                    (category) => category.id === over?.id
                );
                console.log(`Move: ${overCategory?.col_name}`);
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
        <>
            <div className=" m-auto flex flex-row gap-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
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
                    </DragOverlay>
                </DndContext>
                <button
                    onClick={openAddCategory}
                    className="
                        h-[60px] border-2 rounded-lg p-2 bg-[#ECDED5] border-orange-400 
                        cursor-pointer shadow-custom active:shadow-none active:scale-95 
                        focus:outline-none  select-none"
                >
                    カテゴリの追加
                </button>
            </div>
            {isAddCategoryModal && (
                <AddCategoryModal
                    closeAddCategory={closeAddCategory}
                    setCategories={setCategories}
                />
            )}
        </>
    );
};

export default Board;
