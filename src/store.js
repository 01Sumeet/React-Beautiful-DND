import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage implementation

// Configuration for local storage persistence
const persistConfig = {
  key: "Tasks",
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Here we set data to the local storage implementation
export const store = createStore(
  persistedReducer
);
export const persistor = persistStore(store);

  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()