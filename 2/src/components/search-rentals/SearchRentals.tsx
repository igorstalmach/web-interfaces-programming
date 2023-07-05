import React from "react";
import Form from "react-bootstrap/Form";
import { ISearchRentalsProps } from "./ISearchRentalsProps";
import styles from "./SearchRentals.module.scss";

export const SearchRentals = (props: ISearchRentalsProps) => {
  const populateBedrooms = () => {
    let bedroomData: Set<number> = new Set();
    props.rentalAdsData.forEach((rentalAd) => {
      bedroomData.add(rentalAd.bedrooms);
    });

    let bedroomSelect = [];
    bedroomData.forEach((bedroom, key) => {
      bedroomSelect.push(
        <option value={key} key={key + 1}>
          {bedroom}
        </option>
      );
    });
    bedroomSelect.unshift(
      <option value={0} key={0}>
        ---
      </option>
    );

    return bedroomSelect.sort((a, b) => {
      if (a.key && b.key) {
        return parseInt(a.key.toString()) - parseInt(b.key.toString());
      } else {
        return 0;
      }
    });
  };

  const populateCities = () => {
    let cityData: Set<string> = new Set();
    props.rentalAdsData.forEach((rentalAd) => {
      cityData.add(rentalAd.address.city);
    });

    let citySelect = [];
    cityData.forEach((city, key) => {
      citySelect.push(
        <option value={city} key={key + 1}>
          {city}
        </option>
      );
    });
    citySelect.unshift(
      <option value={""} key={0}>
        ---
      </option>
    );

    return citySelect;
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>Bedrooms:</div>
      <Form.Select
        defaultValue={0}
        onChange={(e) => props.setBedrooms(parseInt(e.target.value))}
      >
        {populateBedrooms()}
      </Form.Select>
      <div className={styles.text}>City:</div>
      <Form.Select
        defaultValue={""}
        onChange={(e) => props.setCity(e.target.value)}
      >
        {populateCities()}
      </Form.Select>
      <div className={styles.text}>Description:</div>
      <Form.Control
        type="email"
        placeholder="Search..."
        onChange={(e) => props.setDescription(e.target.value)}
      />
      <div className={styles.text}>Price:</div>
      <Form.Select
        defaultValue={"default"}
        onChange={(e) => props.setSortBy(e.target.value)}
      >
        <option value={"default"}>Default</option>
        <option value={"lowToHigh"}>Low to high</option>
        <option value={"highToLow"}>High to low</option>
      </Form.Select>
    </div>
  );
};
