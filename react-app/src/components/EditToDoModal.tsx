import { FC } from "react"
import { EditToDoItem } from "../utilities/types";

const EditToDoModal: FC<EditToDoItem> = ({ item, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item.card_name}</h3>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item.col_name}</h3>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item.due_date}</h3>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item.color}</h3>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item.description}</h3>
          <button onClick={closeModal} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">閉じる</button>
        </div>
      </div>
    </div>
  );
}
export default EditToDoModal