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


function Slider_2({ newArrivals}) {

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
              ({ id, url,title}, index) =>
                
                  <SwiperSlide key={id + index}>
                    <NewArrivalItem>
                      <FavIconButton>
                        <FavoriteBorderIcon />
                      </FavIconButton>
                         
                                  <FavItemImage src={url} />
                        
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

export default Slider_2;
