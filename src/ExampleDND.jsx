// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const initialItems = [
//   { id: "item-1", content: "Item 1" },
//   { id: "item-2", content: "Item 2" },
//   { id: "item-3", content: "Item 3" },
//   { id: "item-4", content: "Item 4" },
// ];

// const ExampleDND = () => {
//   const [items, setItems] = useState(initialItems);

//   const handleDragEnd = (result) => {
//     debugger;
//     if (!result.destination) return;

//     const newItems = [...items];
//     const [removed] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, removed);

//     setItems(newItems);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided) => (
//                   <div
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     ref={provided.innerRef}
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//       <div
//         style={{
//           color: "red",
//           fontSize: "14px",
//           fontWeight: "bold",
//           padding: "50px",
//         }}
//       >
//         Cool
//       </div>
//       <Droppable droppableId="2nd">
//         {(provider) => (
//           <div {...provider.droppableProps} ref={provider.innerRef}>
//             {" "}
//             {provider.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default ExampleDND;

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialList1 = ["Item 1", "Item 2", "Item 3"];
const initialList2 = ["Item 4", "Item 5", "Item 6"];

const App = () => {
  const [list1, setList1] = useState(initialList1);
  const [list2, setList2] = useState(initialList2);

  const handleDragEnd = (result) => {
    debugger;
    console.log("🚀 ~ file: ExampleDND.jsx:84 ~ handleDragEnd ~ ̥:", result);
    if (!result.destination) return;

    if (result.source.droppableId === result.destination.droppableId) {
      // Reorder items within the same list
      const list = result.source.droppableId === "list1" ? list1 : list2;
      const reorderedList = [...list];
      const [removed] = reorderedList.splice(result.source.index, 1);
      reorderedList.splice(result.destination.index, 0, removed);

      if (result.source.droppableId === "list1") {
        setList1(reorderedList);
      } else {
        setList2(reorderedList);
      }
    } else {
      // Move items between lists
      const sourceList = result.source.droppableId === "list1" ? list1 : list2;
      const destinationList =
        result.destination.droppableId === "list1" ? list1 : list2;

      const sourceListCopy = sourceList;
      const destinationListCopy = destinationList;

      const [removed] = sourceListCopy.splice(result.source.index, 1);
      destinationListCopy.splice(result.destination.index, 0, removed);

      setList1(sourceListCopy);
      setList2(destinationListCopy);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex" }}>
        <Droppable droppableId="list1">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {list1.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <Droppable droppableId="list2">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {list2.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {item}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;

// <DragDropContext onDragEnd={handleEnd}>
//   <div style={{ display: "flex" }}>
//     <Droppable droppableId="list1">
//       {(Provider) => (
//         <ul {...Provider.droppableProps} ref={Provider.innerRef}>
//           {data?.map((data, index) => (
//             <Draggable key={data.id} draggableId={data.id} index={index}>
//               {(Provider) => (
//                 <li
//                   {...Provider.draggableProps}
//                   {...Provider.dragHandleProps}
//                   ref={Provider.innerRef}
//                 >
//                   {data.name}
//                 </li>
//               )}
//             </Draggable>
//           ))}
//           {Provider.placeholder}
//         </ul>
//       )}
//     </Droppable>
//   </div>
// </DragDropContext>
