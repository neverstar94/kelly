import React from 'react';
import Carousel from 'react-material-ui-carousel'

import Link from "node_modules/next/link";
import {
  BannerButton,
  BannerImage,
  BannerStack,
  BannerText,
  BannerWrapper,
} from "core/theme/styles/home.styled";
import {  SwiperSlide } from "swiper/react";
import "swiper/css";
import {  Container } from "node_modules/@mui/material/index";
export default function Example({ banners })
{
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    const temp=[]
     for (let i=0;i<banners.length;i++){
        if(banners[i].banner_type=='Web Main Slider'){
           temp.push(banners[i])
        }
     }
     setValue(temp);
  }, [banners]);

    return (
        <Carousel>
            {value.map(
          (banner) =>
            banner && (
              <SwiperSlide key={banner.id}>
                <BannerWrapper>
                  <Container fixed >
                    <BannerStack>{console.log(banner.button_link,'banner.button_link')}
                      <BannerText>TRENDY SEASON</BannerText>
                      {banner.with_button === 1 && (
                        <Link href={`${banner.button_link}`}>
                            <BannerButton>
                               {banner.button_text}
                            </BannerButton>
                        </Link>
                      )}
                    </BannerStack>
                    
                    <BannerImage src={banner.image_url}/>
                  </Container>
                  
                </BannerWrapper>
              </SwiperSlide>
            )
        )}
        </Carousel>
    )
}



