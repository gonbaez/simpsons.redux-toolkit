import React from "react";

import styles from "../styles/Character.module.css";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";

import classNames from "classnames";
import { useDispatch } from "react-redux";

const Character = ({
  quote,
  image,
  character,
  characterDirection,
  selected,
  like,
  id,
  deleteConfirm,
  selectedElement,
}) => {
  return (
    <li
      className={classNames(
        styles.characterListItem,
        selected ? styles.center : ""
      )}
      ref={selected ? selectedElement : null}
    >
      <div className={styles.characterContent}>
        <div className={styles.characterName}>{character}</div>
        <div className={styles.quote}>
          <FaQuoteLeft />
          {quote}
          <FaQuoteRight />
        </div>
        <div className={styles.characterFeedbackContainer}>
          <LikeButton like={like} id={id} />
          <DeleteButton deleteConfirm={deleteConfirm} id={id} />
        </div>
      </div>
      <div
        className={classNames(
          styles.imageContainer,
          styles[characterDirection.toLowerCase()]
        )}
      >
        <img className={styles.characterImage} src={image} alt={character} />
      </div>
    </li>
  );
};

export default Character;
