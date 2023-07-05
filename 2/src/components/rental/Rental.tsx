import React, { useContext, useEffect } from "react";
import styles from "./Rental.module.scss";
import { RentalAd } from "../rental-ad/RentalAd";
import { SearchRentals } from "../search-rentals/SearchRentals";
import { IRentalAd } from "../../common/interfaces/IRentalAd";
import { RentalsContext } from "../../common/providers/RentalsProvider";

export const Rental = () => {
  const { rentalAds } = useContext(RentalsContext);

  const [city, setCity] = React.useState<string>("");
  const [bedrooms, setBedrooms] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");
  const [filteredRentalAds, setFilteredRentalAds] =
    React.useState<IRentalAd[]>(rentalAds);
  const [sortBy, setSortBy] = React.useState<string>("default");

  useEffect(() => {
    const newRentalAds = rentalAds.filter((rentalAd) => {
      if (bedrooms === 0) {
        return (
          rentalAd.address.city.includes(city) &&
          rentalAd.description.includes(description)
        );
      } else {
        return (
          rentalAd.address.city.includes(city) &&
          rentalAd.bedrooms === bedrooms &&
          rentalAd.description.includes(description)
        );
      }
    });

    if (sortBy === "default") {
      setFilteredRentalAds(
        newRentalAds.slice().sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else if (sortBy === "lowToHigh") {
      setFilteredRentalAds(
        newRentalAds.slice().sort((a, b) => {
          return a.price - b.price;
        })
      );
    } else if (sortBy === "highToLow") {
      setFilteredRentalAds(
        newRentalAds.slice().sort((a, b) => {
          return b.price - a.price;
        })
      );
    }
  }, [rentalAds, city, bedrooms, description, sortBy]);

  const getRentalAds = () => {
    return filteredRentalAds.map((rentalAd) => {
      return <RentalAd rental={rentalAd} key={rentalAd.id} />;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>Where do you want to travel today?</div>
        <div className={styles.divider}></div>
        <SearchRentals
          setCity={setCity}
          setBedrooms={setBedrooms}
          setDescription={setDescription}
          setSortBy={setSortBy}
          rentalAdsData={rentalAds}
        />
        {filteredRentalAds.length > 0 ? (
          <div className={styles.rentalWrapper}>{getRentalAds()}</div>
        ) : (
          <div className={styles.subheader}>No rentals found</div>
        )}
      </div>
    </div>
  );
};
