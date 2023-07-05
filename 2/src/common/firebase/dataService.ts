import { firestore } from "./init";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { User } from "firebase/auth";
import { IRentalAd } from "../interfaces/IRentalAd";

export const addRental = async (
  user: User | null | undefined,
  content: IRentalAd
) => {
  try {
    await addDoc(collection(firestore, "rental-ads"), {
      uid: user?.uid,
      content: content,
      completed: false,
      created: Timestamp.now(),
    });
    toast.success("Rental followed successfully.");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
    toast.error(message);
  }
};

export const removeRental = async (
  user: User | null | undefined,
  content: IRentalAd
) => {
  try {
    const allRentalIds = await getAllRentalIds(user);
    const rentalAdsToDelete = allRentalIds.filter((rentalAd) => {
      return rentalAd.rentalAd !== content;
    });

    for (const rentalAdToDelete of rentalAdsToDelete) {
      await deleteDoc(
        doc(firestore, "rental-ads", rentalAdToDelete.rentalAdId)
      );
    }
    toast.success("Rental unfollowed successfully.");
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
    toast.error(message);
  }
};

export const getAllRentals = async (userId: string | undefined) => {
  const rentalAdsQuery = query(
    collection(firestore, "rental-ads"),
    where("uid", "==", userId)
  );
  const rentalAds: IRentalAd[] = [];

  try {
    const querySnapshot = await getDocs(rentalAdsQuery);
    querySnapshot.forEach((doc) => {
      rentalAds.push(doc.data().content);
    });
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
    toast.error(message);
  }

  return rentalAds;
};

export const getAllRentalIds = async (user: User | null | undefined) => {
  const rentalAdsQuery = query(
    collection(firestore, "rental-ads"),
    where("uid", "==", user?.uid)
  );
  const rentalAds: {
    rentalAdId: string;
    rentalAd: IRentalAd;
  }[] = [];

  try {
    const querySnapshot = await getDocs(rentalAdsQuery);
    querySnapshot.forEach((doc) => {
      rentalAds.push({
        rentalAdId: doc.id,
        rentalAd: doc.data().content,
      });
    });
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
    toast.error(message);
  }

  return rentalAds;
};
