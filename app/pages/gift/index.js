import {
  CategoryItem,
  ItemTitle,
  ItemColor,
  CategoryTags,
  ButtonTag,
  CategoryPageName,
  StockLabel,
  BuyOption,
} from "core/theme/styles/catetory.styled";
import { FavIconButton, FullImage } from "core/theme/styles/home.styled";
import { useRouter } from "next/router";
import { Container, Dialog, Grid } from "node_modules/@material-ui/core/index";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import * as React from "react";
import { Stack } from "node_modules/@mui/material/index";
import Pagination from '@mui/material/Pagination';
import ProductFilters from "components/_category/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ErrorModal, SuccessModal } from "components/MessageModal/index";
import Profile from "core/services/profile";
import {
  actionAddToFavouriteFail,
  actionGetWishlist,
} from "core/redux/profile.actions";
import { baseURL } from "core/constants/index";
import { useState,useEffect } from "react";

import ProductDialog from '../../components/ProductDialog';


const Gift = ( props ) => {
      const router = useRouter();
      const tags = ["New", "Trendy", "Top Rated", "Skinny", "Floral", "Striped"];
      const user = useSelector((state) => state.auth.user.data);
      const currency = useSelector((state) => state.master.currency);
      const wishlist = useSelector((state) => state.profile.wishlist.data);
      const [colorImage, setColorImage] = React.useState("");
      const dispatchAction = useDispatch();
      const [selected, setSelected] = React.useState(false);
      const changeImage = (id, image) => {
        setColorImage(false);
        setSelected(id);
        setColorImage(image);
      };
  const [category, set_category] = useState([])
  const [categories, set_categories] = useState([])
  const [subCategories, set_subCategories] = useState([])
  const [colors, set_colors] = useState([])
  const [pagination, set_pagination] = useState({})
  const [sizes, set_sizes] = useState([])
  const [collections, set_collections] = useState([])
 
  //////////pagination state set///////////
  const [per_page, set_per_page] = useState(50)
  const [total, set_total] = useState(0)
  const [current_page, set_current_page] = useState(1)


    const getData = async () => {

        set_current_page(1);
        const { collection, color, page_type, size,category_id ,sub_category_id,price_min,price_max,name} = router.query
        const res = await fetch(
          `${baseURL}/products?page=1&per_page=${per_page}${name?`&name=${name}`:``}${category_id?`&category_id=26&sub_category_id=${sub_category_id}`:``}&page_type=PRODUCT&${price_min?`&price_min=${price_min}`:``}${price_max?`&price_max=${price_max}`:``}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`
        );
        let response = await res.json();
        set_category([...response.data.products.data])
        set_subCategories([...response.data.sub_categories])
        set_colors([...response.data.colors])
        set_sizes([...response.data.sizes])
        set_collections([...response.data.collections])
        set_total(response.data.products.total)  
    } 

      useEffect(() => {
        getData();
        
      }, [router])


  // const Price = ({ item }) => {
  //   return (
  //     <>
  //       {currency &&
  //         item.final_discount_percent !== "" &&
  //         item.final_discount_percent !== 0 && (
  //           <ItemPrice>
  //             <PriceStriped>{`${currency.code} ${parseFloat(
  //               item.v_regular_price * currency.rate
  //             ).toFixed(2)}`}</PriceStriped>
  //             {`${currency.code} ${parseFloat(
  //               item.final_discounted_price * currency.rate
  //             ).toFixed(2)}`}
  //           </ItemPrice>
  //         )}

  //       {currency && item.final_discount_percent === 0 && (
  //         <ItemPrice>{`${currency.code} ${parseFloat(
  //           item.v_regular_price * currency.rate
  //         ).toFixed(2)}`}</ItemPrice>
  //       )}
  //     </>
  //   );
  // };
  const PageHeader = () => (
    <CategoryTags>
      <Container> 
        <CategoryPageName>
          Collections {router.query.name}
          <span>{`(${pagination.total} Products)`}</span>
        </CategoryPageName>
        {tags.map((tag) => (
          <ButtonTag key={tag} onClick={()=>sortFilter(tag)}>
            {tag}
          </ButtonTag>
        ))}
      </Container>
    </CategoryTags>
  );

  const [open, setModal] = React.useState(false);
  const [success, setModalSuccess] = React.useState(false);
  const [message, setModalMessage] = React.useState({
    title: "",
    message: "Please login to continue",
  });
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const [activeItem,setActiveItem] = useState({});
  const [dlgopen,setDlgOpen] = useState(false);
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
  const handleItemClick = (item)=> {
    setActiveItem(item);
    setDlgOpen(true);
  }
  const handleDlgClose = () => {
    setDlgOpen(false);
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

  ///////////////dropdown menu page number//////////
  const handleChange_pagenum=async (event) => {

    
    const { collection, color, page_type, size,category_id ,sub_category_id,price_min,price_max,name} = router.query
      const res = await fetch(
        `${baseURL}/products?page=1&per_page=${event.target.value}${name?`&name=${name}`:``}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:``}${price_min?`&price_min=${price_min}`:``}${price_max?`&price_max=${price_max}`:``}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`
      );
    let response = await res.json();
        set_per_page(event.target.value);
        set_category([...response.data.products.data])
        set_subCategories([...response.data.sub_categories])
        set_total(response.data.products.total)
       set_current_page(1)
       
      
  }

  const handleChange_page =async (page) => {
   
    const { collection, color, page_type, size,category_id ,sub_category_id,price_min,price_max,name} = router.query
      const res = await fetch(
        `${baseURL}/products/26?page=${page}&per_page=${per_page}${name?`&name=${name}`:``}${category_id?`&category_id=${category_id}`:``}${sub_category_id?`&sub_category_id=${sub_category_id}`:``}${page_type?`&page_type=${page_type}`:``}${price_min?`&price_min=${price_min}`:``}${price_max?`&price_max=${price_max}`:``}${color?`&color=${color}`:''}${size?`&size=${size}`:``}${collection?`&collection=${collection}`:''}${currency?`&currency=${currency.code}`:''}`
      );
    let response = await res.json();
        set_category([...response.data.products.data])
        set_subCategories([...response.data.sub_categories])
        set_total(response.data.products.total)

        set_current_page(page)
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
      
      <Container disableGutters={true} style={{paddingTop:'20px'}}>
        <Grid container spacing={2}>
          <Grid style={{width:'23%',float:'left'}}>
            <ProductFilters
              colors={colors}
              id={router.query.id}
              cname={router.query.name}
              sizes={sizes}
              collections={collections}
            />
          </Grid>
          <Grid style={{width:'77%',marginLeft:'-30px'}}>
             <Grid container spacing={3}>
            {category &&
              category.map((item) => (
                <Grid item md={3} key={item.id}>
                  <CategoryItem  key={item.id}>
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
                        <FullImage onClick={()=>handleItemClick(item)}
                          src={
                            colorImage && item.id === selected
                              ? colorImage
                              : item.image_url
                          }
                        />

                        <ItemTitle style={{fontSize:'16px'}}>{item.title}</ItemTitle>
                        {
                          currency===null? <p style={{marginTop:'-10px',fontSize:'18px'}}>LKR {item.final_discounted_price}.00</p>:<p style={{marginTop:'-10px',fontSize:'18px'}}>{currency.code }&nbsp; {parseFloat(eval(item.final_discounted_price)*currency.rate).toFixed(2)}</p>
                        }
                        
                        {item.stock_label && (
                          <StockLabel>{item.stock_label}</StockLabel>
                        )}

                        {item.bulk_discount_label && (
                          <BuyOption>{item.bulk_discount_label}</BuyOption>
                        )}
                    <Stack spacing={0.5} direction="row">
                      {item.color_values &&
                        item.color_values.length > 0 &&
                        item.color_values.map((color,index) => (
                          <ItemColor key={index}
                            onClick={() =>
                              changeImage(item.id, color.v_img_url)
                            }
                            style={{ background: color.color.code }}
                          ></ItemColor>
                        ))}{" "}
                    </Stack>
                  </CategoryItem>
                </Grid>
              ))}
             </Grid>  
          </Grid>
            
        </Grid>
      </Container>

      <Container disableGutters={true} style={{marginBottom:'30px',marginTop:'30px'}}>
         <Grid container spacing={2}>
            <Grid item md={7}></Grid>
            <Grid item md={1}>
                    <FormControl sx={{ m: 1, minWidth: 70 }} size="small" style={{marginTop:'-3px'}}>
                          <InputLabel id="demo-select-small">page</InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={per_page}
                            label="page"
                            onChange={handleChange_pagenum}
                          >
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                          </Select>
                    </FormControl>      
            </Grid>
            <Grid item md={4}>
                    <Stack spacing={2} sty={{folat:'left'}}>
                      <Pagination  onChange={(e,page)=>handleChange_page(page)} page={current_page} count={Math.ceil(total/per_page)} color="primary" />
                    </Stack>
            </Grid>
          </Grid>
      </Container>
       <Dialog onClose={handleDlgClose}    open={dlgopen} fullWidth={fullWidth}
        maxWidth={maxWidth}>
       <ProductDialog  item={activeItem}/> 
       
      </Dialog> 
    </>
  );
};

export default Gift;
