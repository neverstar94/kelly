import {
  FullImage,
  CategoryTitle,
  CategoryName,
  CategoryLink,
  CategoryNameHighlited,
} from "core/theme/styles/home.styled";
import { Container, Grid } from "node_modules/@material-ui/core/index";
import React from "react";
function BrowseCategory({ categories }) {

      const CategoryCard = ({ name, id, web_image_url }) => {
      
        return (
          <CategoryLink href={`/category?page=1&per_page=50&category_id=${id}&name=${name}`}>
            <a>
              
              {web_image_url && (
                <>
                  <FullImage src={web_image_url} />
                  <CategoryName>{name}</CategoryName>
                </>
              )}

              {!web_image_url && (
                <>
                  <CategoryNameHighlited>{name}</CategoryNameHighlited>
                </>
              )}
            </a>
          </CategoryLink>
        );
      };

  return (
    <>
      <Container style={{
        padding:"0px 50px 50px 50px",
      }}>
        <CategoryTitle>Browse by Category</CategoryTitle>
        <Grid container spacing={2}>
          {categories &&
            categories.map(({ id, name, web_image_url }, index) => (
              <Grid item md={3} key={`category_${id}`}>
             
                {index <= 3 && (
                   <CategoryLink href={`/category?page=1&per_page=50&category_id=${id}&name=${name}`}>
                   <a>
                     {web_image_url && (
                       <>
                         <FullImage src={web_image_url} />
                         <CategoryName>{name}</CategoryName>
                       </>
                     )}
       
                     {!web_image_url && (
                       <>
                         <CategoryNameHighlited>{name}</CategoryNameHighlited>
                       </>
                     )}
                   </a>
                  </CategoryLink>
                )}
                 {index > 3 && <CategoryCard id={id} name={name} />} 
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default BrowseCategory;
