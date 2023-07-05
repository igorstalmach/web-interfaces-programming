import React from "react";
import styles from "./Followed.module.scss";
import { FollowedContext } from "../../common/providers/FollowedProvider";
import { RentalAd } from "../../components/rental-ad/RentalAd";

export const Followed = () => {
  const { state } = React.useContext(FollowedContext);

  const getRentalAds = () => {
    return state.followedRentalAds.map((rentalAd) => {
      return <RentalAd rental={rentalAd} key={rentalAd.id} />;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>Your followed rentals</div>
        <div className={styles.divider}></div>
        {state.followedRentalAds.length > 0 ? (
          <div className={styles.rentalWrapper}>{getRentalAds()}</div>
        ) : (
          <div className={styles.subheader}>No rentals found</div>
        )}
      </div>
    </div>
  );
};
