"use client";
import React from "react";
import styles from "./card.module.css";

const Card = ({ cardTitle, cardValue }) => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={`${styles.cardTitle} ${styles.reset}`}>{cardTitle}</h2>
      <p className={`${styles.cardValue} ${styles.reset}`}>{cardValue}</p>
    </div>
  );
};

export default Card;
