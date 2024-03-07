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

  const selectedCharacter = filteredQuotes.find((el) => el.id >= selectedId);

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
              selectedId={selectedCharacter.id}
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
