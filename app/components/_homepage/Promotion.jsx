import {
  PromoContainer,
  PromoTitle,
  PromoLink,
} from "core/theme/styles/home.styled";

import Link from "node_modules/next/link";
import { Container } from "node_modules/@material-ui/core/index";
import { Stack } from "node_modules/@mui/material/index";
import React from "react";

function Promotion({ banners }) {

  const [value, setValue] = React.useState({});
  React.useEffect(() => {
   
     for (let i=0;i<banners.length;i++){
        if(banners[i].banner_type=='Advertisement Banner'){
          setValue(banners[i]);
        }
     }
   
  }, [banners]);
  return (
    
    <PromoContainer style={{backgroundImage:`url(${value.image_url})`,width:'100%'}}>
    
    
      <Container>
        <PromoTitle>{value.title}</PromoTitle>
        <Stack direction="row" justifyContent="center">
           
            {
              value.with_button===1? <Link   href={value.button_link}>
                <button style={{height:'40px',width:'150px'}}>
                    {value.button_text}
                </button>
                 
              
           </Link>:(null)
            }
               
        </Stack>
      </Container>
    </PromoContainer>
  );
}

export default Promotion;
