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

function Slider_1({ gift_data, banner, currency }) {

  const [swiper, setSwiper] = React.useState(null);
  const previous = () => {
    swiper.slidePrev();
  }
  const next = () => {
    swiper.slideNext();
  }
  return (
    <>
      {gift_data &&
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
            
          {gift_data &&
            gift_data.map(
              ({ id, image_url,title}, index) =>
                
                  <SwiperSlide key={id + index}>
                    <NewArrivalItem>
                      <FavIconButton>
                        <FavoriteBorderIcon />
                      </FavIconButton>
                         
                                  <FavItemImage src={image_url} />
                        
                    </NewArrivalItem>
                  </SwiperSlide>
              
                        )}
                    </Swiper>
                    </div>
       
  </NewArrivalContainer>
      }
    </>
  
  );
}

export default Slider_1;
