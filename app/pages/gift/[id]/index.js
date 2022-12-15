import {
  CategoryItem,
  ItemTitle,
  ItemPrice,
  CategoryTags,
  CategoryPageName,
  FilterTitle,
  PriceStriped,
} from "core/theme/styles/catetory.styled";

import Slider from '@mui/material/Slider';
import { FavIconButton, FullImage } from "core/theme/styles/home.styled";
import { useRouter } from "next/router";
import { Container, Grid } from "node_modules/@material-ui/core/index";
import Link from "node_modules/next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorModal, SuccessModal } from "components/MessageModal/index";
import Profile from "core/services/profile";
import {
  actionAddToFavouriteFail,
  actionGetWishlist,
} from "core/redux/profile.actions";

import { useState,useEffect } from "react";
import { baseURL } from "core/constants/index";
const Gift = ({ category,  pagination, categories}) => {

  const route = useRouter();

  const user = useSelector((state) => state.auth.user.data);

  const currency = useSelector((state) => state.master.currency);
   const [value, setValue] = React.useState([0, 100]);

   const handleChange = async(event, newValue) => {//price select function

        setValue(newValue);
        let price_max=10000;
        let price_min=0;
            price_max=newValue[1]*100;
            price_min=newValue[0]*100;
       let page= 1;
       let  per_page= 50;
       let  category_id=26;
       let  page_type= "PRODUCT";
      const res = await fetch(
        `${baseURL}/products?page=${page}&per_page=${per_page}&price_max=${price_max}&price_min=${price_min}&category_id=${category_id}&page_type=${page_type}${currency?`&currency=${currency.code}`:''}`
      );
      const data = await res.json();
      set_gift(data.data.products.data);
   }
  const wishlist = useSelector((state) => state.profile.wishlist.data);

  const [colorImage, setColorImage] = React.useState("");

  const dispatchAction = useDispatch();

  const [selected, setSelected] = React.useState(false);
  const changeImage = (id, image) => {
    setColorImage(false);
    setSelected(id);
    setColorImage(image);
  };
  const [gift, set_gift] = useState([])
  useEffect(() => {
    set_gift(category) ;
  }, [category])
  const Price = ({ item }) => {
    return (
      <>
        {currency &&
          item.final_discount_percent !== "" &&
          item.final_discount_percent !== 0 && (
            <ItemPrice>
              <PriceStriped>{`${currency.code} ${parseFloat(
                item.v_regular_price * currency.rate
              ).toFixed(2)}`}</PriceStriped>
              {`${currency.code} ${parseFloat(
                item.final_discounted_price * currency.rate
              ).toFixed(2)}`}
            </ItemPrice>
          )}

        {currency && item.final_discount_percent === 0 && (
          <ItemPrice>{`${currency.code} ${parseFloat(
            item.v_regular_price * currency.rate
          ).toFixed(2)}`}</ItemPrice>
        )}
      </>
    );
  };
  const PageHeader = () => (
    <CategoryTags>
      <Container>
        <CategoryPageName>
          Collections {route.query.name}
          <span>{`(${pagination.total} Products)`}</span>
        </CategoryPageName>
      </Container>
    </CategoryTags>
  );

  const [open, setModal] = React.useState(false);
  const [success, setModalSuccess] = React.useState(false);
  const [message, setModalMessage] = React.useState({
    title: "",
    message: "Please login to continue",
  });
  const handleClose = () => {
    setModal(false);
  };

  const handleCloseSuccess = () => {
    setModalSuccess(false);
  };

  const removeFav = (id) => {

    Profile.wishlistRemove(id)
      .then((response) => {
        if (response.data.status) {
          setModalSuccess(true);
          setModalMessage({
            title: "",
            message: response.data.message,
          });
          dispatchAction(actionGetWishlist());
      }
    })
    
  }
  const handleFav = (id) => {
    if (user) {
      Profile.wishlistAdd(id).then((response) => {
        if (response.data.status) {
          setModalSuccess(true);
          setModalMessage({
            title: "",
            message: response.data.message,
          });

          dispatchAction(actionGetWishlist());
        } else {
          dispatchAction(actionAddToFavouriteFail(null));
          setModal(true);
          setModalMessage({
            title: "",
            message: response.data.message,
          });
        }
      });
    } else {
      setModal(true);
    }
  };
  return (
    <>
      <ErrorModal
        open={open}
        handleClose={handleClose}
        title={message.title}
        message={message.message}
      />
      <SuccessModal
        open={success}
        handleClose={handleCloseSuccess}
        title={message.title}
        message={message.message}
      />
      <PageHeader />
      
      <Container disableGutters={true}>
        <Grid container spacing={2}>
          <Grid item md={9}></Grid>
          <Grid item md={3} spacing={2} style={{marginTop:'-130px'}}>
          </Grid>
        </Grid>
        <Grid container>
            <Grid item md={3}>
                <Container>
                  {
                    currency===null?<FilterTitle style={{float:'left',borderTop:'none'}}>Price Range(LKR)</FilterTitle>:<FilterTitle style={{folat:'left',borderTop:'none'}}>Price Range({currency.code})</FilterTitle>
                  }
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    style={{width:'78%'}}
                  // valueLabelDisplay="auto"
                  />
                  <div>
                    <div style={{float:'left',marginLeft:'-5px'}}>0</div>
                    {
                      currency===null?<div style={{marginLeft:'74%'}}>10000</div>:<div style={{marginLeft:'74%'}}>{parseFloat(10000*currency.rate)}</div>
                    }
                    
                  </div>
                </Container>
            </Grid>
            <Grid item md={9} container spacing={2}>
              {gift &&
                gift.map((item) => (
                  <Grid item md={3} key={item.id}>
                    
                    <CategoryItem>
                      {wishlist &&
                      wishlist.filter((w) => w.id === item.id).length > 0 ? (
                        <FavIconButton className="active" onClick={() => removeFav(item.id)}>
                          <ion-icon name="heart"></ion-icon>
                        </FavIconButton>
                      ) : (
                        <FavIconButton onClick={() => handleFav(item.id)}>
                          <ion-icon name="heart-outline"></ion-icon>
                        </FavIconButton>
                      )}
                     
                      
                      <Link href={`/product1/${item.id}?category=${item.category}&name=${item.title}`}>
                          <a>
                            <FullImage src={colorImage && item.id === selected ? colorImage: item.image_url}/>
                            <ItemTitle style={{minHeight:'0px'}}>{item.title}</ItemTitle>
                            <Price item={item} />
                          </a>
                      </Link>
                    
                    </CategoryItem>
                  </Grid>
                ))}
            </Grid>
        </Grid>
      </Container>
    </>
  );
};
export const getServerSideProps = async ({ params, query }) => {
  const { page, per_page, category_id, page_type, currency, color } = {
    page: 1,
    per_page: 50,
    category_id: params && params.id ? params.id : "",
    page_type: query.page_type ? query.page_type : "PRODUCT",
    currency: "LKR",
    color: query.color ? query.color : "",
  };
  const res = await fetch(
    `${baseURL}/products?page=${page}&per_page=${per_page}&category_id=${category_id}&page_type=${page_type}&currency=${currency}&color=${color}`
  );
  const data = await res.json();
  
  return {
    props: {
      category: data.data.products.data,
      pagination: {
        total: data.data.products.total,
        per_page: data.data.products.per_page,
        current_page: data.data.products.current_page,
      },
      categories: data.data.categories,
      sub_categories: data.data.sub_categories,
      colors: data.data.colors,
      sizes: data.data.sizes,
      collections: data.data.collections,
    },
  };
};

export default Gift;
