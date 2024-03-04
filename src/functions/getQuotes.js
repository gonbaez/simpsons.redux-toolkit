import axios from "axios";
import offlineData from "../offlineData";

import { setQuotes } from "../redux/quotesSlice";
import { store } from "../redux/store";

export const getQuotes = async (count = 50) => {
  const response = await axios.get(
    `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`
  );

  if (!response.data.length) {
    console.log("Using offline data");
    response.data = offlineData;
  }

  response.data.map((el, idx) => {
    el.id = idx;
    el.selected = false;
    return el;
  });

  store.dispatch(setQuotes(response.data));
};
