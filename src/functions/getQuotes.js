import axios from "axios";
import offlineData from "../offlineData";

import { setQuotes } from "../redux/quotesSlice";

export const getQuotes = async (dispatch, count = 50) => {
  const response = await axios.get(
    `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`
  );

  if (!response.data.length) {
    console.log("Using offline data");
    response.data = offlineData;
  }

  response.data.map((el, idx) => {
    el.id = idx;
    return el;
  });

  dispatch(setQuotes(response.data));
};
