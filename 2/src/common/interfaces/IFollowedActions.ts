import { FollowedActions } from "../enums/FollowedActions";
import { IRentalAd } from "./IRentalAd";

export interface IFollowedActions {
  type: FollowedActions;
  payload: IRentalAd;
}
