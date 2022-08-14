import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
} from "@reduxjs/toolkit";

import appReducer from "./slice";

const persistStateMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("appState", JSON.stringify(getState()));
    return result;
  };
};

const retrieveState = () => {
  const data = localStorage.getItem("appState");
  if (data !== null) {
    return JSON.parse(data);
  }
};

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    persistStateMiddleware,
  ],
  preloadedState: retrieveState(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
