import { FullImage, MissionContainer } from "core/theme/styles/home.styled";
import { Container, Grid } from "node_modules/@material-ui/core/index";
import Link from "node_modules/next/link";
import React from "react";
import {useSelector } from "react-redux";
function Mission({collections}) {
  
  const currency = useSelector((state) => state.master.currency);
  return (
    <MissionContainer>
      <Container>
        
        <h3>
          Our mission is to offer beautiful and exclusive <br /> outfits which
          reveal the real beauty in you.
        </h3>
        <Grid container spacing={3}>
          {
            collections && collections.map(collection => (
              
               <Grid item md={6} key={collection.id}>
               <FullImage src={collection.web_image_url} />
                  <h4>{collection.title}</h4>
                  <p>{ collection.description}</p>
                  {
                    currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=${collection.id}&page_type=COLLECTION&currency=LKR`}>
                    <a>SHOP NOW</a>
                    </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=${collection.id}&page_type=COLLECTION&currency=${currency.code}`}>
                  <a>SHOP NOW</a>
                  </Link>
                  }
                  
          </Grid>
              
            ))
          }
        </Grid>
      </Container>
    </MissionContainer>
  );
}

export default Mission;
