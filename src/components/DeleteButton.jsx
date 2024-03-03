import React from "react";

import { TbTrash } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";

import styles from "../styles/DeleteButton.module.css";

import { useDispatch } from "react-redux";

const DeleteButton = ({ deleteConfirm, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className={
          !deleteConfirm ? styles.deleteButton : styles.deleteConfirmButton
        }
        onClick={() => {
          if (!deleteConfirm) {
            dispatch({ type: DELETE, payload: id });

            const timeoutId = setTimeout(() => {
              dispatch({ type: DELETE, payload: id });
            }, 3000);
          } else {
            dispatch({ type: DELETE_CONFIRM, payload: id });
          }
        }}
      >
        {!deleteConfirm ? <TbTrash /> : <TbTrashX />}
      </button>
    </>
  );
};

export default DeleteButton;
