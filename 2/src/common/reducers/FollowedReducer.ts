import { Reducer } from "react";
import { FollowedActions } from "../enums/FollowedActions";
import { IFollowedActions } from "../interfaces/IFollowedActions";
import { IFollowedState } from "../interfaces/IFollowedState";

export const FollowedReducer: Reducer<IFollowedState, IFollowedActions> = (
  state,
  action
) => {
  switch (action.type) {
    case FollowedActions.AddFollowedRental: {
      return {
        followedRentalAds: [...state.followedRentalAds, action.payload],
      };
    }
    case FollowedActions.RemoveFollowedRental: {
      const newFollowedRentalAds = state.followedRentalAds.filter(
        (rentalAd) => rentalAd.id !== action.payload.id
      );
      return {
        followedRentalAds: newFollowedRentalAds,
      };
    }
    default:
      return state;
  }
};
