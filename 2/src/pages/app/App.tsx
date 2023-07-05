import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "../../components/navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../home/Home";
import { AddRental } from "../add-rental/AddRental";
import { BookMeeting } from "../book-meeting/BookMeeting";
import { RentalsProvider } from "../../common/providers/RentalsProvider";
import { UserProvider } from "../../common/providers/UserProvider";
import { PrivateRoute } from "../../components/private-route/PrivateRoute";
import { Login } from "../login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FollowedProvider } from "../../common/providers/FollowedProvider";
import { Followed } from "../followed/Followed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <PrivateRoute Component={Home} />,
      },
      {
        path: "add-rental",
        element: <PrivateRoute Component={AddRental} />,
      },
      {
        path: "book-meeting",
        element: <PrivateRoute Component={BookMeeting} />,
      },
      {
        path: "followed",
        element: <PrivateRoute Component={Followed} />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <UserProvider>
      <RentalsProvider>
        <FollowedProvider>
          <RouterProvider router={router} />;
          <ToastContainer />
        </FollowedProvider>
      </RentalsProvider>
    </UserProvider>
  );
};
