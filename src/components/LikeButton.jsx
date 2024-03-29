import React from "react";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import styles from "../styles/LikeButton.module.css";

import { useDispatch } from "react-redux";

import { likeItem } from "../redux/quotesSlice";

const LikeButton = ({ like, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(likeItem(id));
        }}
        className={styles.likeButton}
      >
        {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
      </button>
    </>
  );
};

export default LikeButton;
