export interface IRentalAd {
  id: number;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  address: {
    country: string;
    city: string;
    street: string;
  };
  image: typeof Image;
  seller: {
    name: string;
    phoneNumber: string;
    email: string;
  };
}
