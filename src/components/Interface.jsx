import React from "react";

import styles from "../styles/Interface.module.css";

import LoadingComponent from "./LoadingComponent";
import Controls from "./Controls";
import Characters from "./Characters";

import { useSelector } from "react-redux";
import { selectQuotes } from "../redux/quotesSlice";

const Interface = () => {
  const quotes = useSelector(selectQuotes);

  if (!quotes) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <div className={styles.interface}>
        <Controls />
        <Characters />
      </div>
    </>
  );
};

export default Interface;
