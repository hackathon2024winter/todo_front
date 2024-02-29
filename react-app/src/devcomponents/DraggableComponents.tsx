import {
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC, ReactNode, useMemo } from "react";

// idを含むインターフェイス
interface HasId {
    id: UniqueIdentifier;
}

// Reactのtypescriptはジェネリック型が備えるプロパティを推測できないので
//
interface DraggableListProps<T extends HasId> {
    items: T[];
    layout: "horizontal" | "vertical" | "grid";
    children: ReactNode;
}

// ドラッグ&ドロップ可能なリストアイテム FC型はジェネリック型を受け付けるが
// ジェネリック型が備えるプロパティを扱えないので、関数型でコンポーネントを返す。
export const DraggableList = <T extends HasId>({
    items,
    layout,
    children,
}: DraggableListProps<T>) => {
    // リストの種類
    const strategy = useMemo(() => {
        switch (layout) {
            case "horizontal":
                return horizontalListSortingStrategy;
            case "vertical":
                return verticalListSortingStrategy;
            case "grid":
            default:
                return rectSortingStrategy;
        }
    }, [layout]);

    return (
        <SortableContext items={items} strategy={strategy}>
            <ul>{children}</ul>
        </SortableContext>
    );
};

// ドラッグ&ドロップ可能なリストアイテム
export const DraggableItem: FC<{ id: HasId["id"]; children: ReactNode }> = ({
    id,
    children,
}) => {
    const { setNodeRef } = useSortable({ id });

    return <div ref={setNodeRef}>{children}</div>;
};

// DraggableItemをドラッグ&ドロップするためのハンドル
// svgファイルのみにドラッグ&ドロップ機能を持たせる。
interface DraggableHandleProps {
    id: HasId["id"];
    children?: ReactNode;
    imgPath: string;
}

export const DraggableHandle: FC<DraggableHandleProps> = ({
    id,
    children,
    imgPath,
}) => {
    const { attributes, listeners } = useSortable({ id });

    return (
        <div className="flex justify-between">
            <div {...attributes} {...listeners}>
                {/*DraggableHandleの本体。マウスカーソルが変わる */}
                <div className="w-8 h-8">
                    <img src={imgPath} alt="Description" />
                </div>
            </div>
            <div className="mt-1 ml-1">{children}</div>
        </div>
    );
};
