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
  const tasks = useSelector((state) => state?.todoReducer?.tasks);
  const [taskState, setTaskState] = useState({
    assign: tasks,
    pending: tasks,
    complete: tasks,
  });
  const { assign, pending, complete } = taskState;
  const Update = () => {
    setTaskState({
      assign: tasks,
      pending: tasks,
      complete: tasks,
    });
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
  }, [tasks]);
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
    debugger;
    if (!result.destination) return;
    // Determine the source and destination lists based on droppableIds
    let sourceList;
    if (result.source.droppableId === "assign") {
      sourceList = assign;
    } else if (result.source.droppableId === "pending") {
      sourceList = pending;
    } else if (result.source.droppableId === "complete") {
      sourceList = complete;
    }
    let destinationList;
    if (result.destination.droppableId === "assign") {
      destinationList = assign;
    } else if (result.destination.droppableId === "pending") {
      destinationList = pending;
    } else if (result.destination.droppableId === "complete") {
      destinationList = complete;
    }
    // Retrieve the dragged task object from the source list
    const draggedTask = sourceList[result.source.index];
    // Determine the new status based on the destination droppableId
    let newStatus;
    if (result.destination.droppableId === "assign") {
      newStatus = "Assign";
    } else if (result.destination.droppableId === "pending") {
      newStatus = "Pending";
    } else if (result.destination.droppableId === "complete") {
      newStatus = "Completed";
    }
    // Dispatch the updateStatus action
    dispatch(updateStatus(draggedTask.id, newStatus));
    //this fun will drag and drops the task within same container
    if (result.source.droppableId === result.destination.droppableId) {
      const list =
        result.source.droppableId === "assign"
          ? assign
          : result.source.droppableId === "pending"
          ? pending
          : complete;
      const reorderedList = [...list];
      const [removed] = reorderedList.splice(result.source.index, 1);
      reorderedList.splice(result.destination.index, 0, removed);
      if (result.source.droppableId === "assign") {
        setTaskState((prevState) => ({
          ...prevState,
          assign: reorderedList,
        }));
      } else if (result.source.droppableId === "pending") {
        setTaskState((prevState) => ({
          ...prevState,
          pending: reorderedList,
        }));
      } else if (result.source.droppableId === "complete") {
        setTaskState((prevState) => ({
          ...prevState,
          complete: reorderedList,
        }));
      }
      // this part is for drag and drop between columns
    } else {
      const sourceList =
        result.source.droppableId === "assign"
          ? assign
          : result.source.droppableId === "pending"
          ? pending
          : complete;
      const destinationList =
        result.destination.droppableId === "assign"
          ? assign
          : result.destination.droppableId === "pending"
          ? pending
          : complete;
      const sourceListCopy = [...sourceList];
      const destinationListCopy = [...destinationList];
      const [removed] = sourceListCopy.splice(result.source.index, 1);
      destinationListCopy.splice(result.destination.index, 0, removed);
      if (result.source.droppableId === "assign") {
        setTaskState((prevState) => ({
          ...prevState,
          assign: sourceListCopy,
        }));
        if (result.destination.droppableId === "pending") {
          setTaskState((prevState) => ({
            ...prevState,
            pending: destinationListCopy,
          }));
        } else {
          setTaskState((prevState) => ({
            ...prevState,
            complete: destinationListCopy,
          }));
        }
      } else if (result.source.droppableId === "pending") {
        setTaskState((prevState) => ({
          ...prevState,
          pending: sourceListCopy,
        }));
        if (result.destination.droppableId === "assign") {
          setTaskState((prevState) => ({
            ...prevState,
            assign: sourceListCopy,
          }));
        } else {
          setTaskState((prevState) => ({
            ...prevState,
            complete: destinationListCopy,
          }));
        }
      } else {
        setTaskState((prevState) => ({
          ...prevState,
          complete: sourceListCopy,
        }));
        if (result.destination.droppableId === "assign") {
          setTaskState((prevState) => ({
            ...prevState,
            assign: destinationListCopy,
          }));
        } else {
          setTaskState((prevState) => ({
            ...prevState,
            pending: destinationListCopy,
          }));
        }
      }
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
                  {assign
                    ?.filter((x) => x?.status === "Assign")
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
                  {assign
                    ?.filter((x) => x?.status === "Pending")
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
                  {assign
                    ?.filter((x) => x?.status === "Completed")
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
