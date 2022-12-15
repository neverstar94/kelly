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
import ProductFilters_1 from "components/_category/Colors_1";
import { useDispatch, useSelector } from "react-redux";
import { ErrorModal, SuccessModal } from "components/MessageModal/index";
import Profile from "core/services/profile";
import {
  actionAddToFavouriteFail,
  actionGetWishlist,
} from "core/redux/profile.actions";
import { baseURL, localURL } from "core/constants/index";
import { useState, useEffect } from "react";
import $ from 'jquery';
import ProductDialog from '../../../components/ProductDialog';
import Link from "node_modules/next/link";
const Category = (props) => {
  const router = useRouter();
  const tags = ["New", "Trendy", "Top Rated", "Skinny", "Floral", "Striped"];
  const user = useSelector((state) => state.auth.user.data);
  const currency = useSelector((state) => state.master.currency);
  const wishlist = useSelector((state) => state.profile.wishlist.data);
  const [colorImage, setColorImage] = React.useState("");
  const dispatchAction = useDispatch();
  const [selected, setSelected] = React.useState(false);
  const changeImage = (id, image, item_id) => {

    category[item_id].current_img = image
    set_category(category)
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
  const [popup, setPopup] = React.useState(false);

  const getData = async () => {
    set_current_page(1);
    const { id, collection_id, color, page_type, size, category_id, sub_category_id, price_min, price_max, name } = router.query
    const res = await fetch(
      `${baseURL}/products?page=1&per_page=${per_page}${name ? `&name=${name}` : ``}&category_id=${id}&${sub_category_id ? `&sub_category_id=${sub_category_id}` : ``}${price_min ? `&price_min=${price_min}` : ``}${price_max ? `&price_max=${price_max}` : ``}${color ? `&color=${color}` : ''}${size ? `&size=${size}` : ``}${collection_id ? `&collection_id=${collection_id}` : ''}${currency ? `&currency=${currency.code}` : ''}`
    );
    let response = await res.json();
    response.data.products.data.map(item => {
      item.isClicked = new Array(item.color_values.length).fill(false);
      item.isClicked[0] = true
    })

    set_category(response.data.products.data)

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

  const PageHeader = () => (
    <CategoryTags>
      <Container>
        <CategoryPageName>
          Collections {router.query.name}
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
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const [activeItem, setActiveItem] = useState({});
  const [dlgopen, setDlgOpen] = useState(false);
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
  const handleItemClick = (item) => {
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
     // AlertError('User registration is required !');
    }
  };

  ///////////////dropdown menu page number//////////
  const handleChange_pagenum = (e) => {
    const run = async (e) => {


      const { collection, color, page_type, size, category_id, sub_category_id, price_min, price_max, name } = router.query
      const res = await fetch(
        `${baseURL}/products?page=1&per_page=${e.target.value}${name ? `&name=${name}` : ``}${category_id ? `&category_id=${category_id}` : ``}${sub_category_id ? `&sub_category_id=${sub_category_id}` : ``}${page_type ? `&page_type=${page_type}` : ``}${price_min ? `&price_min=${price_min}` : ``}${price_max ? `&price_max=${price_max}` : ``}${color ? `&color=${color}` : ''}${size ? `&size=${size}` : ``}${collection ? `&collection=${collection}` : ''}${currency ? `&currency=${currency.code}` : ''}`
      );
      let response = await res.json();
      set_per_page(e.target.value);
      set_category([...response.data.products.data])
      set_subCategories([...response.data.sub_categories])
      set_total(response.data.products.total)
      set_current_page(1)
    }

    run(e);
  }

  const handleChange_page = async (page) => {
    const { collection, color, page_type, size, category_id, sub_category_id, price_min, price_max, name } = router.query
    const res = await fetch(
      `${baseURL}/products?page=${page}&per_page=${per_page}${name ? `&name=${name}` : ``}${category_id ? `&category_id=${category_id}` : ``}${sub_category_id ? `&sub_category_id=${sub_category_id}` : ``}${page_type ? `&page_type=${page_type}` : ``}${price_min ? `&price_min=${price_min}` : ``}${price_max ? `&price_max=${price_max}` : ``}${color ? `&color=${color}` : ''}${size ? `&size=${size}` : ``}${collection ? `&collection=${collection}` : ''}${currency ? `&currency=${currency.code}` : ''}`
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

      <Container disableGutters={true} style={{ paddingTop: '20px' }}>
      <PageHeader />
        <Grid container spacing={2}>
          <Grid style={{ width: '23%', float: 'left' }}>
            <ProductFilters_1
              colors={colors}
              id={router.query.id}
              cname={router.query.name}
              sizes={sizes}
              collections={collections}
            />
          </Grid>
          <Grid style={{ width: '77%', marginLeft: '-30px' }}>
            {
              category.length === 0 ?
                <Grid container style={{ padding: '20px', marginTop: '200px', marginLeft: '200px' }}>
                  <h3 style={{ fontWeight: '100' }}>
                    There are no products matching your filtered criteria.
                  </h3>
                </Grid> :
                <Grid container spacing={3}>
                  {
                    category.map((item, item_index) => (
                      <Grid item md={3} key={item.id}>
                        <CategoryItem key={item.id}>
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
                          <Link href={`/product/${item.id}?category=${item.category.name}&name=${item.title}`}>
                            <FullImage id={item.id}
                              onMouseOver={() => {
                                $('#pop' + item.id).css({ 'display': 'block' })
                              }}
                              onMouseOut={() => {
                                $('#pop' + item.id).css({ 'display': 'none' })
                              }}

                              src={
                                item.current_img ? item.current_img
                                  : item.image_url
                              }
                            />
                          </Link>
                          <div id={'pop' + item.id} style={{ textAlign: 'center', marginTop: '-43px', marginBottom: '22px', display: 'none' }} onMouseOver={() => {
                            $('#pop' + item.id).css({ 'display': 'block' })
                          }}
                            onMouseOut={() => {
                              $('#pop' + item.id).css({ 'display': 'none' })
                            }}
                          >


                            <button onClick={() => handleItemClick(item)} style={{ height: '33px', width: '130px', backgroundColor: 'white', border: '0px solid', backgroundColor: '#f9f6f6',opacity:'0.8' }}>ADD TO BAG</button>

                          </div>
                          <ItemTitle style={{ fontSize: '16px' }}>{item.title}</ItemTitle>


                          {currency && (
                            <p style={{ color: "black", fontSize: "18px", margin: '0px', marginTop: '11px', marginBottom: '10px' }}>
                              {
                                item.v_discount_percent === '0.00' ?
                                  <>
                                    {currency.code}{" "}
                                    {parseFloat(currency.rate * item.v_regular_price).toFixed(2)}
                                  </>
                                  :
                                  <>
                                    {currency.code}{" "}
                                    {parseFloat(currency.rate * item.v_discounted_price).toFixed(2)}
                                    <span style={{ color: "grey", fontSize: "16px", textDecoration: "line-through", }} >&nbsp;
                                      {currency.code}{" "}
                                      {parseFloat(currency.rate * eval(item.v_regular_price)).toFixed(2)}
                                    </span>
                                  </>
                              }

                            </p>
                          )}


                          {item.stock_label && (
                            <StockLabel>{item.stock_label}</StockLabel>
                          )}

                          {item.bulk_discount_label && (
                            <BuyOption>{item.bulk_discount_label}</BuyOption>
                          )}
                          <Stack spacing={0.5} direction="row">
                            {item.color_values &&
                              item.color_values.length > 0 &&
                              item.color_values.map((color, index) => (
                                color.swatch_img_url===null?
                                <ItemColor key={index}
                                  isFocued={item.isClicked && item.isClicked[index]}
                                  onClick={() => {
                                    changeImage(item.id, color.v_img_url, item_index)
                                    if (item.isClicked.length > 0) {
                                      item.isClicked.fill(false)
                                      item.isClicked[index] = true
                                    }
                                  }
                                  }
                                  style={{ background: color.color.code }}
                                ></ItemColor>:
                                <ItemColor key={index}
                                  isFocued={item.isClicked && item.isClicked[index]}
                                  onClick={() => {
                                    changeImage(item.id, color.v_img_url, item_index)
                                    if (item.isClicked.length > 0) {
                                      item.isClicked.fill(false)
                                      item.isClicked[index] = true
                                    }
                                  }
                                  }
                                  style={{ background: `url(${color.swatch_img_url})` }}
                                ></ItemColor>
                              ))}{" "}
                          </Stack>
                        </CategoryItem>
                      </Grid>
                    ))}
                </Grid>
            }

          </Grid>

        </Grid>
      </Container>

      <Container disableGutters={true} style={{ marginBottom: '30px', marginTop: '30px' }}>
        <Grid container spacing={2}>
          <Grid item md={7}></Grid>
          <Grid item md={1}>
            <FormControl sx={{ m: 1, minWidth: 70 }} size="small" style={{ marginTop: '-3px' }}>

              <InputLabel id="demo-select-small">page</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={per_page}
                label="page"
                onChange={handleChange_pagenum}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <Stack spacing={2} style={{ folat: 'left' }}>
              <Pagination onChange={(e, page) => handleChange_page(page)} page={current_page} count={Math.ceil(total / per_page)} color="primary" />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Dialog onClose={handleDlgClose} open={dlgopen} fullWidth={fullWidth}
        maxWidth={maxWidth}>
        <ProductDialog item={activeItem} />

      </Dialog>
    </>
  );
};

export default Category;
