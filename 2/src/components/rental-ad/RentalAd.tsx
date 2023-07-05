import React from "react";
import styles from "./RentalAd.module.scss";
import { IRentalAdProps } from "./IRentalAdProps";
import { Link } from "react-router-dom";
import { FollowedContext } from "../../common/providers/FollowedProvider";
import { FollowedActions } from "../../common/enums/FollowedActions";
import { useUser } from "../../common/firebase/authService";
import { addRental, removeRental } from "../../common/firebase/dataService";

export const RentalAd = (props: IRentalAdProps) => {
  const { state, dispatch } = React.useContext(FollowedContext);

  const firebaseUser = useUser();

  const handleSave = () => {
    if (state.followedRentalAds.includes(props.rental)) {
      dispatch({
        type: FollowedActions.RemoveFollowedRental,
        payload: props.rental,
      });
      removeRental(firebaseUser, props.rental);
    } else {
      dispatch({
        type: FollowedActions.AddFollowedRental,
        payload: props.rental,
      });
      addRental(firebaseUser, props.rental);
    }
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          backgroundImage: `url(${props.rental.image})`,
          backgroundSize: `cover`,
        }}
        className={styles.image}
      ></div>
      <div className={styles.wrapper}>
        <div className={styles.title}>{props.rental.title}</div>
        <div>Bedroom No: {props.rental.bedrooms}</div>
        <div>City: {props.rental.address.city}</div>
        <div>${props.rental.price} per month</div>
      </div>
      <div>{props.rental.description}</div>
      <div className={styles.buttonContainer}>
        <Link
          to={"book-meeting"}
          state={props.rental}
          className={styles.button}
        >
          Book meeting
        </Link>
        <button className={styles.button} onClick={handleSave}>
          {state.followedRentalAds.includes(props.rental)
            ? "Unfollow"
            : "Follow"}
        </button>
      </div>
    </div>
  );
};
