import React, { PropsWithChildren, useEffect } from "react";
import { IRentalAd } from "../interfaces/IRentalAd";
import axios from "axios";
import image from "../../assets/images/house.jpeg";

interface InitialState {
  rentalAds: IRentalAd[];
  setRentalAds: React.Dispatch<React.SetStateAction<IRentalAd[]>>;
}

export const RentalsContext = React.createContext<InitialState>({
  rentalAds: [],
  setRentalAds: () => null,
});

export const RentalsProvider = ({ children }: PropsWithChildren) => {
  const [rentalAds, setRentalAds] = React.useState<IRentalAd[]>([]);

  useEffect(() => {
    axios.get("data/rentalAdsData.json").then((response) => {
      setRentalAds(
        response.data.map((rentalAd: IRentalAd) => ({
          ...rentalAd,
          image: image,
        }))
      );
    });
  }, []);

  return (
    <RentalsContext.Provider value={{ rentalAds, setRentalAds }}>
      {children}
    </RentalsContext.Provider>
  );
};
