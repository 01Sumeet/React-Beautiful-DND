const initialState = {
  tasks: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    case "ADD":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "COMPLETE":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task
        ),
      };
    case "DELETE":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case "EDIT":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
