import {
  NAContainer,
  NATitle,
  NADesc,
  NALink,
  NAFloatingImage,
  NAFloatingText,
  NewArrivalItem,
  FavIconButton,
  FavItemImage,
  SwiperArrow,
  NewArrivalContainer,
} from "core/theme/styles/home.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Link from "node_modules/next/link";
import Profile from "core/services/profile";
import { useDispatch, useSelector } from "react-redux";

import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import {
  actionAddToFavouriteFail,
  actionGetWishlist,
} from "core/redux/profile.actions";
function NewArrivals({ newArrivals, banner, currency }) {
  const dispatchAction = useDispatch();
  const user = useSelector((state) => state.auth.user.data);
  const wishlist = useSelector((state) => state.profile.wishlist.data);
  const [swiper, setSwiper] = React.useState(null);
  const [open, setModal] = React.useState(false);
  const [success, setModalSuccess] = React.useState(false);
  const [message, setModalMessage] = React.useState({
    title: "",
    message: "Please login to continue",
  });

  const handleClose = () => {
    setModal(false);
  };


  const previous = () => {
    swiper.slidePrev();
  }
  const next = () => {
    swiper.slideNext();
  }


  
  const removeFav = (id) => {

    Profile.wishlistRemove(id)
      .then((response) => {
        if (response.data.status) {
          AlertSuccess(response.data.message);
          dispatchAction(actionGetWishlist());
        }
      })

  }
  const handleFav = (id) => {
    if (user) {
      Profile.wishlistAdd(id).then((response) => {
        if (response.data.status) {
          AlertSuccess(response.data.message);
          dispatchAction(actionGetWishlist());
        } else {
          dispatchAction(actionAddToFavouriteFail(null));
          AlertError(response.data.message);
        }
      });
    } else {
      AlertError('Please login to continue !');
      //setModal(true);
    }
  };
  return (
    <>
      {
        banner && 
           <NAContainer disableGutters={true}>
                <NAFloatingImage src={ banner.image_url} />
                <NAFloatingText>
                  <NATitle>{ banner.title}</NATitle>
                  <NADesc>{ banner.adb_des}</NADesc>
                  {banner.with_button &&  <NALink href={banner.button_link}>
                    {banner.button_text}
                  </NALink>}
                 
                </NAFloatingText>
              </NAContainer>
      }
      {newArrivals &&
        <NewArrivalContainer disableGutters={true}>
            <div style={{padding: "0px 50px"}}>
              <SwiperArrow onClick={previous}>
              <ion-icon name="chevron-back-outline"></ion-icon>
              </SwiperArrow>
              
            <SwiperArrow onClick={next} style={{
              right: "24px",
              left:"auto",
              }}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
              </SwiperArrow>
            
            <Swiper spaceBetween={24} slidesPerView={4}  onInit={(e) => {
                      setSwiper(e);
                    }}>
            
          {newArrivals &&
            newArrivals.map(
              ({ id, title, image_url, final_discounted_price }, index) =>
                index !== 0 && (
                  <SwiperSlide key={id + title + index}>
                    <NewArrivalItem>
                    {wishlist &&
                      wishlist.filter((w) => w.id === id).length > 0 ? (
                      <FavIconButton className="active" onClick={() => removeFav(id)}>
                        <ion-icon name="heart"></ion-icon>
                      </FavIconButton>
                        ) : (
                          <FavIconButton onClick={() => handleFav(id)}>
                            <ion-icon name="heart-outline"></ion-icon>
                          </FavIconButton>
                        )}

                      <Link
                        href={`/product/${id}?category=""&name=${title}&page_type=NEW_ARRIVAL`}
                      >
                        <a>
                          <FavItemImage src={image_url} />
                          <h3>{title}</h3>
                          
                          {
                            currency &&  <p> {currency.code }&nbsp; {parseFloat(final_discounted_price*currency.rate).toFixed(2)}</p>
                          }
                        </a>
                      </Link>
                    </NewArrivalItem>
                  </SwiperSlide>
                )
            )}
        </Swiper>
                    </div>
       
  </NewArrivalContainer>
      }
    </>
  
  );
}

export default NewArrivals;
