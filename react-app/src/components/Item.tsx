
import { useSortable } from "@dnd-kit/sortable";

export type UniqueIdentifier = number;

export type Todo = {
  card_id: UniqueIdentifier;
  card_position: number;
  col_id: number;
  col_position: number;
  col_name: string;
  title: string;
  content: string;
  border_Color: string;
};

const TodoItem = (props: Todo): JSX.Element => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: props.card_id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex w-full m-1 border border-gray-300 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ${props.border_Color}`}
    >
      <div className={`px-4 py-2 w-80 border-l-8 ${props.border_Color}`}>
        <div className="mx-3">
          <p className="me-1 mb-0 text-gray-700">{props.title}</p>
          <span className="text-sm  text-gray-600 dark:text-gray-200 me-1">
            {props.content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;