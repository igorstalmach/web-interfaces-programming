import { IRentalAd } from "../../common/interfaces/IRentalAd";

export interface ISearchRentalsProps {
  setCity: (city: string) => void;
  setBedrooms: (bedrooms: number) => void;
  setDescription: (description: string) => void;
  setSortBy: (sortBy: string) => void;
  rentalAdsData: IRentalAd[];
}
