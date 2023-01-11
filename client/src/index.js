import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Entry from "./components/entry/Entry";
import FriendList from './components/friendList/FriendList';
import Initiate from './components/transactions/Initiate';
import All from "./components/transactions/All";
import Error from "./components/error/Error";
import Payback from "./components/payment/Payback";
import Report from  "./components/payment/Report";
import Logout from './components/entry/Logout';
import Budget from './components/budget/Budget';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/entry",
    element: <Entry/>
  },
  {
    path: "/friendList",
    element: <FriendList/>
  },
  {
    path: "/initiateTransaction",
    element: <Initiate/>
  },
  {
    path: "/allTransactions",
    element: <All/>
  },
  {
    path:"/payback",
    element: <Payback/>
  },
  {
    path: "/paymentReport",
    element: <Report/>
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/budget",
    element: <Budget/>
  },
  {
    path:"/*",
    element: <Error/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

