import { FC, useState } from "react";
import { ToDoItem } from "../utilities/types";
import Draggable from "./Draggable";
import EditToDoModal from "./EditToDoModal";

const Todo: FC<{ item: ToDoItem }> = ({ item }) => {

  // モーダル表示の状態を管理するstate
  const [isModalOpen, setModalOpen] = useState(false);

  // モーダルを開く関数
  const openModal = () => {
    setModalOpen(true);
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Draggable key={item.card_id} id={Number(item.card_id)}>
        <div
          onClick={openModal}
          className="m-1 rounded-lg bg-blue-400">
          <div className="ml-2 bg-white border-t-2 border-r-2 border-b-2 border-gray-400 rounded-r-lg p-2">
            {item.card_name}
          </div>
        </div>
      </Draggable>
      {isModalOpen && <EditToDoModal item={item} closeModal={closeModal} />}
    </>
  )
};

export default Todo;