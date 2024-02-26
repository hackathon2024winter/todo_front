import {
    DndContext,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    KeyboardSensor,
    PointerSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    rectSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentProps, FC, ReactNode, useMemo } from "react";

// idを含むインターフェイス
interface HasId {
    id: UniqueIdentifier;
}

// Reactのtypescriptはジェネリック型が備えるプロパティを推測できないので
// 
interface DraggableListProps<T extends HasId> {
    items: T[];
    onDragStart: ComponentProps<typeof DndContext>["onDragStart"];
    onDragEnd: ComponentProps<typeof DndContext>["onDragEnd"];
    layout: "horizontal" | "vertical" | "grid";
    children: ReactNode;
}

// ドラッグ&ドロップ可能なリストアイテム FC型はジェネリック型を受け付けるが
// ジェネリック型が備えるプロパティを扱えないので、関数型でコンポーネントを返す。
export const DraggableList = <T extends HasId>({
    items,
    onDragStart,
    onDragEnd,
    layout,
    children,
}: DraggableListProps<T>) => {
    // ドラッグ&ドロップする時に許可する入力
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <SortableContext items={items} strategy={strategy}>
                <ul>{children}</ul>
            </SortableContext>
        </DndContext>
    );
};


// ドラッグ&ドロップ可能なリストアイテム
export const DraggableItem: FC<{ id: HasId['id']; children: ReactNode; }> =
    ({ id, children }) => {
        const { setNodeRef } = useSortable({ id });

        return (
            <li ref={setNodeRef}>
                {children}
            </li>
        )
    }

// DraggableItemをドラッグ&ドロップするためのハンドル
// children全体にドラッグ&ドロップ機能を付与する。
// export const DraggableHandle: FC<{ id: HasId['id']; children: ReactNode; }> =
//   ({ id, children }) => {
//     const { attributes, listeners } = useSortable({ id });

//     return (
//       <div {...attributes} {...listeners}>
//         {children}
//       </div>
//     )
//   }

// DraggableItemをドラッグ&ドロップするためのハンドル
// svgファイルのみにドラッグ&ドロップ機能を持たせる。
export const DraggableHandle: FC<{ id: HasId['id']; }> =
    ({ id }) => {
        const { attributes, listeners } = useSortable({ id });

        return (
            <div className="w-8 h-8" {...attributes} {...listeners}>
                <img src="/drag-handle-dots-1-svgrepo-com.svg" alt="Description" />
            </div>
        )
    }