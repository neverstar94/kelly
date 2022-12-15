import {
  NewArrivalItem,
  FavIconButton,
  FavItemImage,
  SwiperArrow,
  NewArrivalContainer,
} from "core/theme/styles/home.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import Link from "node_modules/next/link";

function NewArrivals_1({ newArrivals, banner, currency }) {

  const [swiper, setSwiper] = React.useState(null);
  const previous = () => {
    swiper.slidePrev();
  }
  const next = () => {
    swiper.slideNext();
  }
  return (
    <>
      {newArrivals &&
        <NewArrivalContainer style={{marginTop:'25px'}} disableGutters={true}>
            <div>
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
                      <FavIconButton>
                        <FavoriteBorderIcon />
                      </FavIconButton>
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

export default NewArrivals_1;
