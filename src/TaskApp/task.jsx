import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useRef } from "react";
import "./task.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateStatus, deletedTask, editTask } from "../action/action";
import { useEffect } from "react";
import InputConatiner from "../Asset/InputConatiner";
import Initialtext from "../Asset/InitialText";
import { Plus } from "phosphor-icons";
const TaskApp = () => {
  const taskState = useSelector((state) => state?.todoReducer?.tasks);
  const [tasks, setTaskState] = useState(taskState);
  console.log(tasks, "🛑");
  // const { assign, pending, complete } = taskState;
  const Update = () => {
    setTaskState(taskState);
  };
  const dispatch = useDispatch();
  const [task, setTask] = useState({ task: "" });
  const [buttonType, setButtonType] = useState(false);
  const textareaRef = useRef(null);
  // all columns data
  useEffect(() => {
    Update();
    if (textareaRef.current !== null) {
      resizeTextarea();
    }
  }, [taskState]);
  // This function will add new task to the assign stage
  const handleClick = () => {
    if (task.task !== "") {
      dispatch(addTask(task));
      setTask({ task: "" });
    }
    setButtonType(false);
    // else alert("Enter task details")
  };
  // this function will call editable task and set its value to input field
  const handleEditTask = (taskID, value) => {
    setButtonType(true);
    setTask({ task: value });
    console.log("Edit task", value, "id===", taskID);
    dispatch(editTask(taskID, task));
  };
  const handleUpdate = () => {
    alert("Update task");
  };
  // To auto set the text area of input height
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  // this fun will filter excpet the current task id and assign filtered array to the task
  const handleDeleteTask = (taskId) => {
    dispatch(deletedTask(taskId));
  };
  // fun once the task is picked to drag
  const DragEndHandler = (result) => {
    console.log(result);
    if (!result.destination) return;

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;

    const draggedTask = tasks.find((task) => task.id === result.draggableId);

    const newStatus = destinationListId.charAt(0) + destinationListId.slice(1);

    dispatch(updateStatus(draggedTask.id, newStatus));

    if (sourceListId === destinationListId) {
      const updatedList = [...tasks];
      const [removed] = updatedList.splice(result.source.index, 1);
      updatedList.splice(result.destination.index, 0, removed);

      setTask(updatedList);
    } else {
      const sourceList = [
        ...tasks.filter((task) => task.status === sourceListId),
      ];
      const destinationList = [
        ...tasks.filter((task) => task.status === destinationListId),
      ];
      const [removed] = sourceList.splice(result.source.index, 1);
      destinationList.splice(result.destination.index, 0, removed);

      const updatedTasks = tasks.filter(
        (task) =>
          task.status !== sourceListId && task.status !== destinationListId
      );
      setTask([...updatedTasks, ...sourceList, ...destinationList]);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="header">
          {" "}
          <div className="header-toggel">
            <span className="icons close">x</span>
            <span className="icons minus">-</span>
            <span className="icons dot">.</span>
          </div>{" "}
          <span className="head">Ticket Status 📝</span>
        </div>
        <DragDropContext onDragEnd={DragEndHandler}>
          <div className="content-main-container">
            <Droppable droppableId="assign">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="column assign"
                >
                  {tasks
                    ?.filter((x) => x?.status === "assign")
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={item.id}
                      >
                        {(provider) => (
                          <div
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            ref={provider.innerRef}
                            className="draggable"
                            style={{
                              ...provider.draggableProps.style,
                              zIndex: "9999",
                              position: !provider.isDragging
                                ? "relative"
                                : "absolute",
                            }}
                          >
                            <div className="task-header">
                              <span
                                className="icons close"
                                title="Delete krdu..? 😒"
                                onClick={() => handleDeleteTask(item.id)}
                              >
                                x
                              </span>
                              <span
                                className="icons minus"
                                title="Wanna edit something..? 📝"
                              >
                                -
                              </span>
                              <span className="icons dot">{index + 1}</span>
                              <span className="status">{item.status}</span>
                            </div>
                            <div className="list-content">{item.text.task}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {buttonType ? (
                    <InputConatiner
                      r={textareaRef}
                      style={{ overflow: "hidden" }}
                      onInput={resizeTextarea}
                      onBlur={handleClick}
                      value={task.task}
                      onChange={(e) => setTask({ task: e.target.value })}
                      close={() => setButtonType(false)}
                    />
                  ) : (
                    <Initialtext onClick={() => setButtonType(true)} />
                  )}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="pending">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="column pending"
                >
                  {tasks
                    ?.filter((x) => x?.status === "pending")
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={item.id}
                      >
                        {(provider) => (
                          <div
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            ref={provider.innerRef}
                            className="draggable"
                          >
                            <div className="task-header">
                              <span
                                className="icons close"
                                onClick={() => handleDeleteTask(item.id)}
                              >
                                x
                              </span>
                              <span className="icons minus">-</span>
                              <span className="icons dot">{index + 1}</span>
                              <span className="status">{item.status}</span>
                            </div>
                            <div className="list-content">{item.text.task}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="complete">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="column complete"
                >
                  {tasks
                    ?.filter((x) => x?.status === "complete")
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={item.id}
                      >
                        {(provider) => (
                          <div
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            ref={provider.innerRef}
                            className="draggable"
                          >
                            <div className="task-header">
                              <span
                                className="icons close"
                                onClick={() => handleDeleteTask(item.id)}
                              >
                                x
                              </span>
                              <span className="icons minus">-</span>
                              <span className="icons dot">{index + 1}</span>
                            </div>
                            <div
                              className="list-content"
                              style={{ opacity: "0.2", fontSize: "41px" }}
                            >
                              {item.status}✔️
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default TaskApp;
