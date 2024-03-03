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
      state.filteredQuotes = quotes;
    },
    filterQuotes: (state) => {
      const searchValue = value;

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

      filteredQuotes = quotes;

      filteredQuotes = quotes.filter((el) => {
        const name = el.character.toLowerCase();
        return name.includes(searchValue.toLowerCase());
      });

      if (filteredQuotes.length > 0) {
        switch (filteredQuotes.filter((el) => el.selected).length) {
          case 0:
            selectedIndex = quotes.findIndex((el) => el === filteredQuotes[0]);
            filteredQuotes[0].selected = true;

            break;
          case 1:
            break;
          default:
            filteredQuotes = filteredQuotes.map((el) => {
              el.selected = false;
              return el;
            });

            filteredQuotes[selectedIndex].selected = true;
        }
      }

      state.filteredQuotes = filteredQuotes;
      state.filter.searchString = searchValue;
      state.filter.searchError = "";
      state.selectedIndex = selectedIndex;
    },
    reset: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { setQuotes, filterQuotes } = quotesSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectQuotes = (state) => state.quotes.quotes;
export const selectSearchString = (state) => state.quotes.filter.searchString;
export const selectSearchError = (state) => state.quotes.filter.searchError;
export const selectFilteredQuotes = (state) => state.quotes.filteredQuotes;
export const selectNonFilteredDataLength = (state) =>
  state.quotes.quotes.length;
export const selectSelectedIndex = (state) => state.quotes.selectedIndex;

export default quotesSlice.reducer;
