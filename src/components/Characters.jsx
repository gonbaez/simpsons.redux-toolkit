import React, { useRef, useEffect } from "react";

import styles from "../styles/Characters.module.css";

import { IoRefreshCircle } from "react-icons/io5";
import { LuSearchX } from "react-icons/lu";

import Character from "./Character";
import ScrollButtom from "./ScrollButton";
import { useDispatch, useSelector } from "react-redux";

import { getQuotes } from "../functions/getQuotes.js";

import {
  filterQuotes,
  resetQuotes,
  selectFilteredQuotes,
  selectQuotes,
  selectSelectedId,
  selectedItem,
} from "../redux/quotesSlice.js";

const Characters = () => {
  const dispatch = useDispatch();
  const selectedElement = useRef();

  const quotes = useSelector(selectQuotes);
  const selectedId = useSelector(selectSelectedId);

  useEffect(() => {
    if (selectedElement.current) {
      selectedElement.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedId]);

  const filteredQuotes = useSelector(selectFilteredQuotes);

  const selectedQuote = filteredQuotes.findIndex((el) => el.id === selectedId);

  console.log(selectedQuote);
  if (selectedQuote < 0) {
    // Selected quote not in filtered results
    dispatch(selectedItem(filteredQuotes[0].id));
  }

  if (quotes.length === 0) {
    return (
      <>
        <IoRefreshCircle
          onClick={() => {
            dispatch(resetQuotes());
            getQuotes();
          }}
          className={styles.refreshButton}
        />
      </>
    );
  }

  if (!filteredQuotes.length) {
    return (
      <LuSearchX
        onClick={() => dispatch(filterQuotes(""))}
        style={{ cursor: "pointer" }}
        className={styles.refreshButton}
      />
    );
  }

  return (
    <>
      {<ScrollButtom direction="left" />}
      <ul className={styles.characterList}>
        <div className={styles.emptyListItem}></div>
        {filteredQuotes.map((element) => {
          return (
            <Character
              {...element}
              selectedElement={selectedElement}
              key={element.id}
            />
          );
        })}
        <div className={styles.emptyListItem}></div>
      </ul>
      {<ScrollButtom direction="right" />}
    </>
  );
};

export default Characters;
