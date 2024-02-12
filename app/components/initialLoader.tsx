import React from "react";
import styles from "./initialLoader.module.css";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`${styles.initialLoaderWrapper} ${isLoading ? "" : styles.done}`}
    >
      <div className={styles.initialLoader}></div>
      <p className={styles.subtitle}>Loading teams data...</p>
    </div>
  );
};

export default Loader;
