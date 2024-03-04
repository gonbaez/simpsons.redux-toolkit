import React from "react";

import { TbTrash } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";

import styles from "../styles/DeleteButton.module.css";

import { useDispatch } from "react-redux";
import { deleteItem, deleteItemConfirm } from "../redux/quotesSlice";

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
            dispatch(deleteItem(id));

            const timeoutId = setTimeout(() => {
              dispatch(deleteItem(id));
            }, 3000);
          } else {
            dispatch(deleteItemConfirm(id));
          }
        }}
      >
        {!deleteConfirm ? <TbTrash /> : <TbTrashX />}
      </button>
    </>
  );
};

export default DeleteButton;
