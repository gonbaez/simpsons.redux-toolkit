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

      state.quotes = quotes;
      state.selectedId = quotes[0].id;
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
      const searchError = state.filter.searchError;
      const searchString = state.filter.searchString;

      const selectedId = state.selectedId;

      const filteredQuotes = searchError
        ? quotes
        : quotes.filter((el) => {
            const name = el.character.toLowerCase();
            return name.includes(searchString.toLowerCase());
          });

      const index = filteredQuotes.findIndex((el) => el.id === selectedId);

      if (
        index + scrollOffset < 0 ||
        index + scrollOffset >= filteredQuotes.length
      ) {
        // No changes.
        return;
      }

      state.selectedId = filteredQuotes[index + scrollOffset].id;
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
      state.selectedId = action.payload;
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
export const selectSelectedId = (state) => state.quotes.selectedId;
export const selectFilteredQuotes = (state) => {
  const quotes = state.quotes.quotes;
  const searchError = state.quotes.filter.searchError;
  const searchString = state.quotes.filter.searchString;

  return searchError
    ? quotes
    : quotes.filter((el) => {
        const name = el.character.toLowerCase();
        return name.includes(searchString.toLowerCase());
      });
};
export const selectLikes = (state) => {
  const filteredQuotes = selectFilteredQuotes(state);

  return filteredQuotes.filter((el) => el.like).length;
};
export const selectCharacters = (state) => {
  const filteredQuotes = selectFilteredQuotes(state);

  return filteredQuotes.length;
};

export default quotesSlice.reducer;
