import React, { createContext, PropsWithChildren, useEffect } from "react";
import { IUser } from "../interfaces/IUser";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface InitialState {
  user: IUser | undefined;
  setUser: React.Dispatch<IUser | undefined>;
}

export const UserContext = createContext<InitialState>({
  user: undefined,
  setUser: () => null,
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [storedUser] = useLocalStorage("websiteUser");

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
