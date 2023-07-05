import React, { useContext, useEffect } from "react";
import styles from "./AddRental.module.scss";
import Form from "react-bootstrap/Form";
import image from "../../assets/images/house.jpeg";
import { useNavigate } from "react-router";
import { RentalsContext } from "../../common/providers/RentalsProvider";
import { toast } from "react-toastify";

export const AddRental = () => {
  const navigate = useNavigate();

  const { rentalAds, setRentalAds } = useContext(RentalsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    const data = {
      title: (document.getElementById("rentalTitle") as HTMLInputElement).value,
      description: (
        document.getElementById("rentalDescription") as HTMLInputElement
      ).value,
      price: (document.getElementById("rentalPrice") as HTMLInputElement).value,
      bedrooms: (document.getElementById("rentalBedrooms") as HTMLInputElement)
        .value,
      bathrooms: (
        document.getElementById("rentalBathrooms") as HTMLInputElement
      ).value,
      squareMeters: (
        document.getElementById("rentalSquareMeters") as HTMLInputElement
      ).value,
      country: (document.getElementById("rentalCountry") as HTMLInputElement)
        .value,
      city: (document.getElementById("rentalCity") as HTMLInputElement).value,
      street: (document.getElementById("rentalStreet") as HTMLInputElement)
        .value,
      seller: (document.getElementById("rentalSeller") as HTMLInputElement)
        .value,
      email: (document.getElementById("rentalEmail") as HTMLInputElement).value,
      phoneNumber: (
        document.getElementById("rentalPhoneNumber") as HTMLInputElement
      ).value,
    };

    setRentalAds((prevRentalAds) => [
      ...prevRentalAds,
      {
        id: rentalAds.length + 1,
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        squareMeters: parseInt(data.squareMeters),
        address: {
          country: data.country,
          city: data.city,
          street: data.street,
        },
        image: image,
        seller: {
          name: data.seller,
          phoneNumber: data.phoneNumber,
          email: data.email,
        },
      },
    ]);

    toast.success("Rental successfully added.");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>Create a new rental</div>
        <div className={styles.divider}></div>
        <Form className={styles.formContainer}>
          <Form.Group className="mb-3" controlId="rentalTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="1"
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="1"
              placeholder="Enter bedrooms no."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalBathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="1"
              placeholder="Enter bathrooms no."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalSquareMeters">
            <Form.Label>Square meters</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="1"
              placeholder="Enter square meters"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter country" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" placeholder="Enter street" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalSeller">
            <Form.Label>Seller</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rentalPhoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone" placeholder="Enter your phone number" />
          </Form.Group>
          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};
