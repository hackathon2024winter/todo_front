// import { FC, useState } from "react";
// import { AddContainerItem } from "../utilities/types";

// const AddContainerModal: FC<AddContainerItem> = (props) => {
//   // テキストボックスの状態を管理するための状態変数とセッター関数
//   const [colName, setColName] = useState('');

//   const addContainer = () => {
//     props.addContainer({
//       col_id: 0,
//       col_name: colName
//     });
//     props.closeAddContainer();
//   }

//   return (
//     <>
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//         <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//           <input
//             type="text"
//             value={colName}
//             onChange={(e) => setColName(e.target.value)}
//             className="w-full p-2 border-2 rounded-md mb-4"
//             placeholder="カテゴリ名を入力"
//           />
//           <div className="mt-3 flex justify-center space-x-12">
//             <button onClick={addContainer} className="w-20 px-4 py-2 bg-blue-500 text-white rounded">追加</button>
//             <button onClick={props.closeAddContainer} className="w-20 px-4 py-2 bg-blue-500 text-white rounded">閉じる</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default AddContainerModal