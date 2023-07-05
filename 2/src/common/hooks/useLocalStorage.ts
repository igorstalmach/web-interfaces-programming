import { useState } from "react";
import { IUser } from "../interfaces/IUser";

export const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });

  const setValue = (value: string | IUser) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
