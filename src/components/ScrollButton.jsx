import React from "react";

import styles from "../styles/ScrollButton.module.css";
import { useDispatch } from "react-redux";

const ScrollButton = ({ direction, onScroll }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: SCROLL,
            payload: direction === "left" ? -1 : 1,
          })
        }
        className={styles.scrollButton}
        style={direction === "left" ? { left: "10%" } : { right: "10%" }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <polyline
            points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
          ></polyline>
        </svg>
      </button>
    </>
  );
};

export default ScrollButton;
