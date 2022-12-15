import { useEffect } from "react";
import {
  NewArrivalItem,
  FavItemImage,
  NewArrivalContainer,
  SwiperArrow,
} from "core/theme/styles/home.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Link from "node_modules/next/link";
import { Box, LinearProgress } from "node_modules/@material-ui/core/index";
import ClockPiece from "../_category/DigitalClockPiece";

function FlashSale({ flashSale, currency }) {
  const [swiper, setSwiper] = React.useState(null);
  const previous = () => {
    swiper.slidePrev();
  };
  const next = () => {
    swiper.slideNext();
  };
  
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  useEffect(() => {
    setInterval(() => {
         let time = Date.parse(flashSale.end_date)-Date.now();
          let milliseconds = parseInt((time % 1000));
          let seconds = Math.floor((time / 1000) % 60);
          let minutes = Math.floor((time / (1000 * 60)) % 60);
          let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
          let days = Math.floor((time / (1000 * 60 * 60)) / 24);
          setDays(days.toString().padStart(2, '0'));
          setHours(hours.toString().padStart(2, '0'));
          setMinutes(minutes.toString().padStart(2, '0'));
          setSeconds(seconds.toString().padStart(2, '0'));
    },1000);
    
  });
  return (
    <>
      {flashSale && flashSale.products && flashSale.products.length > 0 && (
        <NewArrivalContainer disableGutters={false} style={{ marginTop: "0px",}}>
          <div style={{ backgroundColor: "#faf8ff", padding: "50px 50px 50px 50px"}}>

            <Box style={{ display: "flex", justifyContent: "space-between"}}>
               <h1 style={{ color: "black",fontWeight: "bold", marginBottom: "50px",}}>FLASH SALE</h1>
              <h1>
                <span style={{ margin: '16px 10px 55px',fontFamily: 'MaisonNeue',fontSize: '25px', fontWeight: '300', fontStretch: 'normal', fontStyle: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: '#828282' }}>Ends in</span>

                <ClockPiece>{parseInt(days/10)}</ClockPiece>
                <ClockPiece>{days%10}</ClockPiece>:
                <ClockPiece>{parseInt(hours/10)}</ClockPiece>
                <ClockPiece>{hours%10}</ClockPiece>:
                <ClockPiece>{parseInt(minutes/10)}</ClockPiece>
                <ClockPiece>{minutes%10}</ClockPiece>:
                <ClockPiece>{parseInt(seconds/10)}</ClockPiece>
                <ClockPiece>{seconds%10}</ClockPiece>
                
              </h1>

            </Box>
            <SwiperArrow onClick={previous} style={{ top: "50%",left: "48px", }}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </SwiperArrow>

            <SwiperArrow onClick={next}style={{right: "48px", left: "auto", top: "50%" }}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </SwiperArrow>
            <Swiper spaceBetween={24} slidesPerView={4} onInit={(e) => {setSwiper(e);}}>
              {
                flashSale.products.map(({ id, title, image_url, final_discounted_price, final_discounted_percent, regular_price }) =>

                  <SwiperSlide key={id}>
                    <NewArrivalItem>
                      <Link href={`/product/${id}?name=${title}&page=1&per_page=50&page_type=FLASH_SALE`} >
                        <a>
                          {
                            final_discounted_percent > 0 && (
                              <div style={{ position: "absolute", left: "0px", top: "10px", width: "40px", height: "40px", color: "#fff", fontWeight: "600", backgroundColor: "#f67100", padding: "6px", fontSize: "13px", }} >
                                {final_discounted_percent}% OFF
                              </div>
                            )}
                          <FavItemImage src={image_url} />
                          <div>
                            {currency && (
                              <p style={{ color: "#f67100", fontSize: "18px", }}>
                                {currency.code} &nbsp;{" "}
                                {parseFloat(currency.rate * final_discounted_price).toFixed(2)}
                                &nbsp;
                                {
                                  final_discounted_percent === 0 ? (null) :
                                    <span style={{ color: "black", fontSize: "16px", textDecoration: "line-through", }} >
                                      {currency.code} &nbsp;{" "}
                                      {parseFloat(currency.rate * regular_price).toFixed(2)}
                                    </span>
                                }
                              </p>
                            )}

                          </div>

                          <LinearProgress variant="determinate" value={final_discounted_percent} />
                          {
                            final_discounted_percent === 0 ? (null) : <p style={{ color: "black", fontSize: "14px", marginTop: '10px' }}>{final_discounted_percent}% sold</p>
                          }
                        </a>
                      </Link>
                    </NewArrivalItem>
                  </SwiperSlide>

                )}
            </Swiper>
          </div>
          <div style={{ float: 'right', marginTop: '-25px', marginRight: '10px' }}>
            {
              currency === null ? <Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=FLASH_SALE&currency=LKR`}>
                <a>+ View More</a>
              </Link> : <Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=FLASH_SALE&currency=${currency.code}`}>
                <a>+ View More</a>
              </Link>
            }
          </div>
        </NewArrivalContainer>
      )}
    </>
  );
}

export default FlashSale;
