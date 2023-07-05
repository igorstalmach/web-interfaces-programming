import React from "react";
import styles from "./LandingPage.module.scss";
import { joinClasses } from "../../common/utils/joinClasses";
import { KeyIcon } from "../../assets/icons/KeyIcon";

export const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>RENT A PERFECT</div>
      <div className={joinClasses(styles.header, styles.afterKey)}>
        APARTMENT
      </div>
      <div className={styles.key}>
        <KeyIcon />
      </div>
    </div>
  );
};
