import React, { useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { Navigate } from "react-router";
import { IPrivateRouteProps } from "./IPrivateRouteProps";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";

export const PrivateRoute = ({ Component }: IPrivateRouteProps) => {
  const { user } = useContext(UserContext);
  const [storedUser] = useLocalStorage("websiteUser");

  if (!user && !storedUser) {
    return <Navigate to={"/login"} />;
  }

  return <Component />;
};
