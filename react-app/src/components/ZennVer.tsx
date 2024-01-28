import { FC, useState } from "react";
import { DndContext, pointerWithin, useSensor, useSensors, MouseSensor, UniqueIdentifier } from "@dnd-kit/core";

import Card from "./Card";
import { Droppable } from "./Droppable2";

const ZennVer: FC = () => {
  // const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  const card = <Card id={"draggableA"} children={
    <div
      className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
    >
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => console.log("hello")}
      >
        Basic SetUp
      </button>
    </div>
  } />


  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Zenn Ver</h2>
      <div className="p-2 border-2 border-black">
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          // onDragStart={() => setIsDragging(true)}
          onDragEnd={({ over }) => {
            setParent(over ? over.id : null);
            // setIsDragging(false);
          }}
        // onDragCancel={() => setIsDragging(false)}
        >
          <div className="mb-5 border-black border-2">
            {parent === null ? card : null}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px'
          }}>
            <Droppable id="dropAreaA" >
              {parent === 'dropAreaA' ? card : null}
            </Droppable>
            <Droppable id="dropAreaB" >
              {parent === 'dropAreaB' ? card : null}
            </Droppable>
            <Droppable id="dropAreaC" >
              {parent === 'dropAreaC' ? card : null}
            </Droppable>
          </div>
        </DndContext>
      </div >
    </>
  );
}

export default ZennVer;

// import { FC, useState } from "react";
// import { DndContext, pointerWithin, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";

// import Card from "./Card";
// import { Droppable } from "./Droppable2";

// const ZennVer: FC = () => {
//   const sensors = useSensors(
//     useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
//   );
//   const [dropCountA, setDropCountA] = useState(0);
//   const [dropCountB, setDropCountB] = useState(0);
//   const [dropCountC, setDropCountC] = useState(0);
//   return (
//     <>
//       <h2 className="text-2xl font-semibold mt-3 mb-3">Zenn Ver</h2>
//       <div className="p-2 border-2 border-black">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={pointerWithin}
//           onDragEnd={(event) => {
//             const { over } = event;
//             if (over == null) {
//               return;
//             }
//             switch (over.id) {
//               case "dropAreaA":
//                 setDropCountA((x) => x + 1);
//                 break;
//               case "dropAreaB":
//                 setDropCountB((x) => x + 1);
//                 break;
//               case "dropAreaC":
//                 setDropCountC((x) => x + 1);
//             }
//           }}
//         >
//           <div className="mb-5 border-black border-2">
//             <Card id={"draggableA"} children={
//               <div
//                 className="w-fit h-fit p-4 m-2 border-2 rounded-lg border-green-900 bg-green-500 select-none"
//               >
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
//                   onClick={() => console.log("hello")}
//                 >
//                   Basic SetUp
//                 </button>
//               </div>
//             } />
//           </div>
//           <div style={{
//             display: 'flex',
//             flexDirection: 'row',
//             gap: '40px'
//           }}>
//             <Droppable id="dropAreaA" label="ドロップエリアA">
//               {dropCountA}回ドロップしたぜ
//             </Droppable>
//             <Droppable id="dropAreaB" label="ドロップエリアB">
//               {dropCountB}回ドロップしたぜ
//             </Droppable>
//             <Droppable id="dropAreaC" label="ドロップエリアC">
//               {dropCountC}回ドロップしたぜ
//             </Droppable>
//           </div>
//         </DndContext>
//       </div >
//     </>
//   );
// }

// export default ZennVer;