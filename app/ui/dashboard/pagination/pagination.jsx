import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ startIndex, setStartIndex, maxlength }) => {
  const handleLeftArrowClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  const handleRightArrowClick = () => {
    if (startIndex < maxlength - 10) {
      setStartIndex(startIndex + 10);
    }
  };
  return (
    <div className={styles.container}>
      {startIndex == 0 ? (
        <button className={styles.button} disabled>
          Previous
        </button>
      ) : (
        <button className={styles.button} onClick={handleLeftArrowClick}>
          Previous
        </button>
      )}

      {/* next button */}
      {startIndex + 10 > maxlength ? (
        <button className={styles.button} disabled>
          Next
        </button>
      ) : (
        <button className={styles.button} onClick={handleRightArrowClick}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
