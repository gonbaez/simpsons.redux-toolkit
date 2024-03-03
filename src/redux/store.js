import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import quotesReducer from "./quotesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quotes: quotesReducer,
  },
});
