import React, { useContext, useEffect } from "react";
import { IFollowedState } from "../interfaces/IFollowedState";
import { IFollowedActions } from "../interfaces/IFollowedActions";
import { FollowedReducer } from "../reducers/FollowedReducer";
import { FollowedActions } from "../enums/FollowedActions";
import { getAllRentals } from "../firebase/dataService";
import { UserContext } from "./UserProvider";

interface IFollowedInitialState {
  state: IFollowedState;
  dispatch: React.Dispatch<IFollowedActions>;
}

export const FollowedContext = React.createContext<IFollowedInitialState>({
  state: {} as IFollowedState,
  dispatch: () => null,
});

export const FollowedProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(FollowedReducer, {
    followedRentalAds: [],
  });

  const { user } = useContext(UserContext);

  const getRentals = async () => {
    if (!user) return [];
    return await getAllRentals(user?.uid);
  };

  useEffect(() => {
    getRentals().then((rentals) => {
      rentals.forEach((rental) => {
        dispatch({
          type: FollowedActions.AddFollowedRental,
          payload: rental,
        });
      });
    });
  }, [user]);

  return (
    <FollowedContext.Provider value={{ state, dispatch }}>
      {children}
    </FollowedContext.Provider>
  );
};
