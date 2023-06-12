import { useState, useRef } from "react";
import "./ToDo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completedTask,
  deletedTask,
  editTask,
} from "../action/action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ToDo = ({ id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [task, setTask] = useState({ task: "" });
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state?.todoReducer?.tasks);
  const assignDroppableRef = useRef(null);
  const inProgressDroppableRef = useRef(null);
  const completedDroppableRef = useRef(null);

  const handleDragAndDrop = (results) => {
    debugger;
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "DEFAULT") {
      const reorderedTasks = [...tasks];

      const taskSourceIndex = source.index;
      const tasksDestinationIndex = destination.index;

      const [removedTask] = reorderedTasks.splice(taskSourceIndex, 1);
      reorderedTasks.splice(tasksDestinationIndex, 0, removedTask);

      setTask(reorderedTasks);
      return;
    }

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const taskSourceIndex = tasks.findIndex(
      (task) => task.id === source.droppableId
    );
    const tasksDestinationIndex = tasks.findIndex(
      (task) => task.id === destination.droppableId
    );

    const newSourceItems = [...tasks[taskSourceIndex]?.text?.task];
    console.log(...tasks[taskSourceIndex].text?.task);
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...tasks[tasksDestinationIndex]?.text?.task]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newTasks = [...tasks];

    newTasks[taskSourceIndex] = {
      ...tasks[taskSourceIndex],
      text: newSourceItems,
    };
    newTasks[tasksDestinationIndex] = {
      ...tasks[tasksDestinationIndex],
      text: newDestinationItems,
    };

    setTask(newTasks);
  };

  const handleClick = () => {
    dispatch(addTask(task));
    setTask({ task: "" });
  };

  const handleCompletedTask = (taskID) => {
    dispatch(completedTask(taskID));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deletedTask(taskId));
  };

  const handleEditTask = (taskID, value) => {
    console.log("Edit task", value, "id===", taskID);
    dispatch(editTask(taskID, value));
  };

  return (
    <div className="card">
      <div className="main">
        <div className="header">TODO APP 📝</div>
        <div className="input-container">
          <input
            type="text"
            name="task"
            className="input-field"
            placeholder="Add your task here...!!!"
            value={task.task}
            onChange={(e) => setTask({ task: e.target.value })}
          />
          <button className="btn" onClick={handleClick}>
            +
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <div className="content">
          <Droppable droppableId="assign" ref={assignDroppableRef}>
            {(provide) => (
              <div
                ref={provide.innerRef}
                {...provide.droppableProps}
                className="status task"
                id="task"
              >
                {provide.placeholder}
                <p>Today's task:</p>
                {tasks?.map((value, index) => (
                  <Draggable
                    draggableId={`${value.id}draggable`}
                    index={index}
                    key={value.id}
                    // isDragDisabled={isDragging}
                  >
                    {(provide) => (
                      <div
                        {...provide.dragHandleProps}
                        {...provide.draggableProps}
                        ref={provide.innerRef}
                      >
                        <div
                          id={value.id}
                          onClick={() => handleCompletedTask(value.id)}
                          className={value.completed ? "list markDone" : "list"}
                        >
                          {value?.text?.task}
                          <span>
                            <button
                              className="btns"
                              onClick={() => handleDeleteTask(value.id)}
                            >
                              ❌
                            </button>{" "}
                            <button
                              className="btns"
                              onClick={() =>
                                handleEditTask(value.id, value.text?.task)
                              }
                            >
                              ✏️
                            </button>{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
          <Droppable
            droppableId="inprogress"
            ref={inProgressDroppableRef}
            type="group"
          >
            {(provider) => (
              <div
                ref={provider.innerRef}
                {...provider.droppableProps}
                className="status inprogress"
                id="inprogress"
              >
                <p>In Progress task:</p>
                {provider.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="completed" ref={completedDroppableRef}>
            {(provider) => (
              <div
                ref={provider.innerRef}
                {...provider.droppableProps}
                className="status completed"
                id="completed"
              >
                <p>Completed task:</p>
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDo;
