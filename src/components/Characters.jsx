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
  selectQuotes,
  selectSearchError,
  selectSearchString,
  selectSelectedIndex,
  selectedItem,
} from "../redux/quotesSlice.js";

const Characters = () => {
  const dispatch = useDispatch();

  const quotes = useSelector(selectQuotes);
  const searchError = useSelector(selectSearchError);
  const searchString = useSelector(selectSearchString);
  const selectedIndex = useSelector(selectSelectedIndex);

  useEffect(() => {
    if (selectedElement.current) {
      selectedElement.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  const filteredQuotes = searchError
    ? quotes
    : quotes.filter((el) => {
        const name = el.character.toLowerCase();
        return name.includes(searchString.toLowerCase());
      });

  // if (filteredQuotes.length > 0) {
  //   switch (filteredQuotes.filter((el) => el.selected).length) {
  //     case 0:
  //       const newSelectedIndex = quotes.findIndex(
  //         (el) => el === filteredQuotes[0]
  //       );
  //       // dispatch(selectedItem(newSelectedIndex));
  //       filteredQuotes[0].selected = true;

  //       break;
  //     case 1:
  //       break;
  //     default: // More than one selected
  //       filteredQuotes = filteredQuotes.map((el) => {
  //         el.selected = false;
  //         return el;
  //       });

  //       filteredQuotes[selectedIndex].selected = true;
  //   }
  // }

  const selectedElement = useRef();

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
      {selectedIndex ? <ScrollButtom direction="left" /> : null}
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
      {selectedIndex === filteredQuotes.length - 1 ? null : (
        <ScrollButtom direction="right" />
      )}
    </>
  );
};

export default Characters;
