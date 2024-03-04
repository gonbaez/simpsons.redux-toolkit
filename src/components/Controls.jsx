import React from "react";

import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import styles from "../styles/Controls.module.css";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import {
  filterQuotes,
  selectQuotes,
  selectSearchError,
  selectSearchString,
} from "../redux/quotesSlice";

const Controls = () => {
  const dispatch = useDispatch();

  const searchError = useSelector(selectSearchError);
  const searchString = useSelector(selectSearchString);
  const quotes = useSelector(selectQuotes);

  const filteredQuotes = searchError
    ? quotes
    : quotes.filter((el) => {
        const name = el.character.toLowerCase();
        return name.includes(searchString.toLowerCase());
      });

  const likes = filteredQuotes.filter((el) => el.like).length;
  const characters = filteredQuotes.length;

  return (
    <>
      <div className={styles.controlsContainer}>
        <div style={{ position: "relative" }}>
          <input
            className={classNames(
              styles.searchInput,
              searchError ? styles.error : ""
            )}
            type="text"
            placeholder="Search character"
            onInput={(e) => dispatch(filterQuotes(e.target.value))}
            value={searchString}
          />
          <span className={styles.errorMessage}>{searchError}</span>
        </div>
        <div className={styles.counterContainer}>
          <div className={styles.likesContainer}>
            <IoMdHeart /> <span>{likes}</span>
          </div>
          <div className={styles.characterContainer}>
            <FaUser /> <span>{characters}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
