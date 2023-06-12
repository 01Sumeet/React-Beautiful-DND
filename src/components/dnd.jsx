import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DATA from "../data/status";
import { useState } from "react";

const DragApp = () => {
  const [item, setItem] = useState(DATA);
  const handleEnd = (result) => {
    console.log("❌", result);
    if (!result.destination) return;
    const newItem = [...item];
    const [remove] = newItem.splice(result.source.index, 1);
    newItem.splice(result.destination.index, 0, remove);
    setItem(newItem);
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <div style={{ display: "flex" }}>
        <Droppable droppableId="list1">
          {(Provider) => (
            <ul {...Provider.droppableProps} ref={Provider.innerRef}>
              {item.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {(Provider) => (
                    <li
                      {...Provider.draggableProps}
                      {...Provider.dragHandleProps}
                      ref={Provider.innerRef}
                    >
                      {data.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {Provider.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragApp;
