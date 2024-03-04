import Joi from "joi";
import { searchSchema } from "../functions/validationSchemas.js";

import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuotes: (state, action) => {
      const quotes = action.payload;

      quotes[0].selected = true;

      state.quotes = quotes;
      state.selectedIndex = 0;
    },
    filterQuotes: (state, action) => {
      const searchValue = action.payload;

      const valObj = Joi.object(searchSchema).validate({
        "Search string": searchValue,
      });

      if (valObj.error) {
        state.filter.searchString = searchValue;
        state.filter.searchError = valObj.error.details[0].message;
        return;
      }

      if (!state.quotes) {
        return;
      }

      state.filter.searchString = searchValue;
      state.filter.searchError = "";
    },
    likeItem: (state, action) => {
      const quotes = state.quotes;
      const idToLike = action.payload;
      const index = quotes.findIndex((el) => el.id === idToLike);

      quotes[index].like = !quotes[index].like;

      state.quotes = quotes;
    },
    scroll: (state, action) => {
      const quotes = state.quotes;
      const scrollOffset = action.payload;

      const index = quotes.findIndex((el) => el.selected);

      if (index + scrollOffset < 0 || index + scrollOffset >= quotes.length) {
        // No changes.
        return;
      }

      quotes.forEach((el) => {
        el.selected = false;
      });

      quotes[index + scrollOffset].selected = true;

      state.selectedIndex = index + scrollOffset;
    },
    deleteItem: (state, action) => {
      const idToDelete = action.payload;

      const quotes = state.quotes;
      const index = quotes.findIndex((el) => el.id === idToDelete);

      if (index < 0) {
        // Item has been deleted already
        return;
      }

      quotes[index].deleteConfirm = !quotes[index].deleteConfirm;

      state.quotes = quotes;
    },
    deleteItemConfirm: (state, action) => {
      const idToDeleteConfirm = action.payload;

      const quotes = state.quotes;

      const indexInQuotes = quotes.findIndex(
        (el) => el.id === idToDeleteConfirm
      );

      quotes.splice(indexInQuotes, 1);

      if (quotes.length) {
        if (indexInQuotes === quotes.length) {
          quotes[indexInQuotes - 1].selected = true;
        } else {
          quotes[indexInQuotes].selected = true;
        }
      }

      state.quotes = quotes;
    },
    resetQuotes: (state) => {
      state = initialState;
    },
    selectedItem: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const {
  setQuotes,
  filterQuotes,
  likeItem,
  scroll,
  deleteItem,
  deleteItemConfirm,
  resetQuotes,
  selectedItem,
} = quotesSlice.actions;

export const selectQuotes = (state) => state.quotes.quotes;
export const selectSearchString = (state) => state.quotes.filter.searchString;
export const selectSearchError = (state) => state.quotes.filter.searchError;
export const selectSelectedIndex = (state) => state.quotes.selectedIndex;

export default quotesSlice.reducer;
