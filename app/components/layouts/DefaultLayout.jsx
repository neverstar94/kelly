import Footer from "components/Footer";
import Header from "components/Header";
import { baseURL } from "core/constants/index";
import { setCurrentURL } from "core/indentity/index";
import { actionGetPricing } from "core/redux/checkout.actions";
import { actionGetWishlist } from "core/redux/profile.actions";
import axios from "node_modules/axios/index";
import { useRouter } from "node_modules/next/router";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const DefaultLayout = ({ children }) => {
  const router = useRouter();

  const user = useSelector(state => state.auth.user.data);

  const dispatchAction = useDispatch();

  const escapeRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/logout",
    "/auth/reset-password",
  ];

  const [giftCardCategory, setGiftCard] = React.useState(null);

  React.useEffect(() => {

    if (user) {
      dispatchAction(actionGetWishlist());
      dispatchAction(actionGetPricing());
   }

   }, [user]);
  
  React.useEffect( () => {
    if (!escapeRoutes.includes(router.pathname)) {
      setCurrentURL();
    }

    axios.get(`${baseURL}/app`)
      .then(response => {
        setGiftCard(response.data.data.giftCardCategory)
      })
      .catch(error => {
        console.log(error);
      });
  }, [router.pathname]);
  return (
    <>
     
      <Toaster position="top-right" />
      <Header giftCardCategory={giftCardCategory} />
      {
        children
      }
      <Footer/>
    </>
  );
};


