
import { FullImage } from "core/theme/styles/home.styled";
import { useRouter } from "next/router";
import { baseURL } from "core/constants/index";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,

} from "node_modules/@material-ui/core/index";

import { ItemColor, } from "core/theme/styles/catetory.styled";
import { Bootbutton, } from "core/theme/styles/catetory.styled";  -+262
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import NewArrivals_1 from "components/_homepage/NewArrivals_1";
import Slider_2 from "components/_homepage/Slider_2";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//////////////////////////////////////////////////////////////////////////TAB

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

///////////////////////////////////////////////////////Select MENU
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
/////////////////////////////////////////////////////dataTable
import { DataGrid } from '@mui/x-data-grid';
import { Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import React from "react";
import {
  ProductColor,
  Color_1,
  ProductPrice,
  SizePopUp,
  ProductDescripton,
  ProductSKU,
  ProductTitle,
  PriceTag,
  SliderContainer,
  SliderThumbs,
  Thumbnail,
  ProductDetails,
  ProductSizes,
  LastItem,
  AddToBag,
  FavButton,
  FreeShipping,
  BreadCrumb

} from "core/theme/styles/product.style";

import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";

import { CategoryTags } from "core/theme/styles/catetory.styled";
import Cart from "core/services/cart";
import { isAuthenticated } from "core/indentity/index";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import { useDispatch, useSelector } from "react-redux";
import { actionGetCart } from "core/redux/cart.actions";
import { actionAddToFavouriteFail, actionGetWishlist, } from "core/redux/profile.actions";
import Profile from "core/services/profile";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import $ from 'jquery';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  marginBottom: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#202430' : '#308fe8',
  },
}));


const products = ({ product, banners, newArrivals }) => {

  let isClickedArray = new Array(product.option_values[0].values.length).fill(false);
  isClickedArray[0] = true

  const banner = banners.filter(
    (banner) => banner.banner_type === "New Arrivals"
  )[0];
  const currency = useSelector(state => state.master.currency);

  const route = useRouter();
  const [sizes, setSizes] = React.useState(false);
  const [colors, setColors] = React.useState(false);
  const [thumb, setThumb] = React.useState(0);
  const [variant, setVariant] = React.useState({
    color: "",
    size: "",
  });
  const [isClicked, setIsClicked] = React.useState(isClickedArray);
 
  //set sizes and colors
  React.useEffect(() => {
    setSizes(product.option_values[1].values);
    setColors(product.option_values[0].values);

    setColorvalue(product.option_values[0].values[0].name);
    setColor(product.option_values[0].values[0].code);
  }, [product]);

  //init swiper
  const [swiper, setSwiper] = React.useState();
  const router = useRouter();
  //  const swiper = useSwiper();
  const thumbClick = (i) => {
    swiper.slideTo(i);
    setThumb(i);
  };
  //image loading
  const [isLoading, setLoading] = React.useState(false);
  //handle coloor pick

      const [colorvalue, setColorvalue] = React.useState('');

      const handleVariantColor = (product, name, i) => {
        setVariant((prevState) => ({
          ...prevState,
          color: name,
        }));
        setColorvalue(name);
        swiper.slideTo(i);
        setThumb(i);
      };
  //handle size pick

  const handleVariantSize = (product, name) => {
     setVariant((prevState) => ({
       ...prevState,
       size: name,
     }));
   // window.sessionStorage.setItem('sizeinfor', name)
  };

  const [valid, setValidProduct] = React.useState({
    valid: false,
    type: "success",
    title: "",
    message: "",
  });

  const dispatchAction = useDispatch();

  //handle add to cart
  const handleAddToCart = (item) => {
    setLoading(true);
    isAuthenticated().then((response) => {
      if (response) {
        setLoading(false);
        const { color, size } = variant;

        const { variants } = product;
        let item = null;
        if (product.v_option1 && product.v_option2) {
          if (color && size) {
            item = variants.filter(
              (variant) =>
                variant.v_option1 === color && variant.v_option2 === size
            )[0];
          } else {
            AlertError("Please choose color & size to add a product to cart");
          }
        } else if (product.v_option1 && product.v_option2 === null) {
          if (color) {
            item = variants.filter((variant) => variant.v_option1 === color)[0];
          } else {
            AlertError("Please choose color !");
          }
        }
        if (item && item.v_qty > 0) {
          let payload = {
            variant: item.v_id,
            qty: 1,
          };

          Cart.add(payload).then((response) => {
            window.sessionStorage.setItem('sizeinfor', '')
            AlertSuccess("Product added to cart !");
            dispatchAction(actionGetCart());
          });
        } else if (item) {
          AlertError("Sorry !  No Enought stock to add this product");
        }
      } else {
        AlertError("Please Login ! to add to cart");
        setLoading(false);
        setTimeout(() => {
          route.push("/auth/sign-in");
        }, 1000);
      }
    });
  };

  //handle add to favourite
  const handleWishlist = (product) => {

    Profile.wishlistAdd(product).then((response) => {
      if (response.data.status) {
        AlertSuccess("Product added to wishlist !");
        dispatchAction(actionGetWishlist());
      } else {
        dispatchAction(actionAddToFavouriteFail(null));
        AlertError("Sorry !  No Enought stock to add this product");
      }
    });

  };

  const Price = () => {
    return (
      <>
        {currency && product.v_discounted_price !== "" && product.v_discount_percent !== 0 && (
          <ProductPrice style={{ fontSize: '25px' }}>
            <span>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</span>
            {`${currency.code} ${parseFloat(currency.rate * product.v_discounted_price).toFixed(2)}`}
          </ProductPrice>
        )}
        {currency && product.v_discount_percent === 0 && (
          <ProductPrice style={{ fontSize: '25px' }}>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</ProductPrice>
        )}
      </>
    );
  };

  const PageHeader = () => (
    <CategoryTags>
      <Container>
        <BreadCrumb>
          <Link href="/">
            <a>Home</a>
          </Link>
          {route.query.category && (
            <Link href={`/category/${product.category_id}`}>
              {route.query.category}
            </Link>
          )}

          <Link href="/">{route.query.name}</Link>
        </BreadCrumb>
      </Container>
    </CategoryTags>
  );

  const onClose = () => {
    setValidProduct((prevState) => ({
      ...prevState,
      valid: false,
      type: "",
      title: "",
      message: "",
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [setcolor, setSetcolor] = React.useState('white');
  const [popup, setPopup] = React.useState('none');
  const [popup1, setPopup1] = React.useState('none');
  ////////////////////////////TAB
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /////////////////////////select menu
  const [rate, setRate] = React.useState(0);
  const handleSelectRate = (e) => {
    // setRate(event.target.value);
    setRate(e.target.value);
  };
  const color_list = [
    { id: 1, name: 'Red', code: '#ff0000' },
    { id: 2, name: 'Green', code: '#008000' },
    { id: 3, name: 'Blue', code: '#0000FF' },
    { id: 4, name: 'Pink', code: '#FFC0CB' },
    { id: 7, name: 'Yellow', code: '#FFFF00' },
    { id: 9, name: 'Brown', code: '#A52A2A' },
    { id: 12, name: 'Black', code: '#000000' },
    { id: 21, name: 'Beidge', code: '#F5F5DC' },
    { id: 23, name: 'White', code: '#FFFFFF' },
    { id: 24, name: 'Navy', code: '#000080' },
    { id: 26, name: 'Denim', code: '#79BAEC' }
  ];
  const [color, setColor] = React.useState('#ff0000');
  const handleSelectColor = (e) => {
    // setRate(event.target.value);
    setColor(e.target.value);
  };
  const size_list = [
    { id: 13, name: 'UK 6', code: null },
    { id: 14, name: 'UK 8', code: null },
    { id: 15, name: 'UK 10', code: null },
    { id: 16, name: 'UK 12', code: null },
    { id: 17, name: 'UK 14', code: null },
    { id: 18, name: 'UK 16', code: null },
    { id: 20, name: '30', code: null },
    { id: 27, name: '32', code: null },
    { id: 28, name: '34', code: null },
    { id: 29, name: '36', code: null },
  ]
  const [size, setSize] = React.useState('All');
  const handleSelectSize = (e) => {
    // setRate(event.target.value);
    setSize(e.target.value);
  };
  const [sort, setSort] = React.useState('Recommend');
  const handleSelectSortby = (e) => {
    // setRate(event.target.value);
    setSort(e.target.value);
  };
  /////////////////////////////dataTable/////////

  return (
    <>

      <Container disableGutters={true}>
        <PageHeader />
        <Grid container spacing={2} direction="row" justifyContent="center">
          <Grid item container md={11}>
            <Grid item md={6}>
              <Stack direction="row">
                <SliderThumbs>
                  {product.images.map((image, i) => (
                    <Thumbnail key={image.id} onClick={() => thumbClick(i)} className={i === thumb ? "active" : ""}>
                      <FullImage src={image.url} showLoading={true} />
                    </Thumbnail>
                  ))}
                </SliderThumbs>
                <SliderContainer style={{width:'460px'}}>
                  <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onInit={(e) => {
                      setSwiper(e);
                    }}
                  >
                    {product.images.map((image) => (
                      <SwiperSlide key={image.id}>
                        <FullImage src={image.url} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </SliderContainer>
              </Stack>
            </Grid>
            <Grid item md={6}>
              <ProductDetails style={{paddingLeft:'0px'}}>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductSKU>SKU : {product.sku}</ProductSKU>
                <Price />

                <p style={{ fontSize: '18px', marginBottom: '-20px' }}>Color:&nbsp;{colorvalue}</p>
                {colors && (
                  <ProductColor>

                    {
                      colors.length > 0 &&
                      colors.map((color, index) => (
                       color.swatch_url===''?
                          <ItemColor key={color.code}
                            isFocued={isClicked && isClicked[index]}
                            onClick={() => {
                              handleVariantColor(product, color.name, index)
                              if (isClicked.length > 0) {
                                isClicked.fill(false)
                                isClicked[index] = true
                              }
                            }
                            }

                            style={{ background: color.code,marginRight:'5px' }}
                          ></ItemColor>:
                          <ItemColor key={color.code}
                            isFocued={isClicked && isClicked[index]}
                            onClick={() => {
                              handleVariantColor(product, color.name, index)
                              if (isClicked.length > 0) {
                                isClicked.fill(false)
                                isClicked[index] = true
                              }
                            }
                            }

                            style={{ background:`url(${color.swatch_url})`,marginRight:'5px' }}
                          ></ItemColor>
                  
                      ))}{" "}
                  </ProductColor>
                )}
                <div style={{ marginTop: '20px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '500', float: 'left', marginTop: '5px' }}>Size</div>
                 <img src='../../images/ruler.png' style={{width:'35px',marginLeft:'50px',float:'left'}} />
                
                  <div style={{ paddingTop: '4px' }}><p style={{ fontSize: '14px' ,marginTop:'7px'}}>Size Guide</p></div>
                </div>

                <ProductSizes>
                  {product.option_values[1].values &&
                    product.option_values[1].values.map((item) => (
                      <>
                        <SizePopUp key={item.id}  id={'pop' + item.id} style={{ display: 'none', width: '300px' }}>
                          <div style={{border:'none',padding:'0px'}} dangerouslySetInnerHTML={{ __html: item.description }} />
                          
                        </SizePopUp>
                        <Bootbutton variant="contained" disableRipple

                          onMouseOver={() => {
                            //setPopup('block');
                            $('#pop' + item.id).css({ 'display': 'block' })
                          }}
                          onMouseOut={() => {
                            // setPopup('none');
                            $('#pop' + item.id).css({ 'display': 'none' })
                          }}
                         
                          onClick={() => handleVariantSize(product, item.name)}
                        >
                          {item.name}

                        </Bootbutton>
                      </>
                    ))}
                </ProductSizes>

                <Stack direction="row" mt={2}>
                  {product.stock_label && (
                    <LastItem>{product.stock_label}</LastItem>
                  )}

                  {product.on_promotion === 0 && product.bulk_discount_label !== '' && (
                    <PriceTag style={{ width: '206px', color: 'white', backgroundColor: '#ea9373',marginLeft:'0px' }}>
                     
                      {product.bulk_discount_label}

                    </PriceTag>
                  )}
                </Stack>
                <Stack direction="row">
                  <AddToBag style={{width:'37%',backgroundColor:'black'}} onClick={() => handleAddToCart(product)}>
                    {isLoading && (
                      <>
                        <CircularProgress color="secondary" size="16px" />{" "}
                        &nbsp;
                      </>
                    )}
                    ADD TO BAG
                  </AddToBag>

                  <FavButton onClick={() => handleWishlist(product.id)}>
                    <FavoriteBorderIcon />
                  </FavButton>
                </Stack>
                <FreeShipping style={{ marginLeft: '-2px', marginTop: '15px' }}>
                  <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                </FreeShipping>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ float: 'left', marginTop: '10px' }}><span>Share on :</span></div>
                  <a href="https://www.facebook.com/LoveKellyFelder/test" style={{ marginRight: '10px' }}><img src='../../images/facebook.png' style={{width:'35px'}} /></a>
                  <a href="https://twitter.com/lovekellyfelder?lang=fr" style={{ marginRight: '10px' }}><img src='../../images/twitter.png' style={{width:'35px'}} /></a>
                  <a href="https://www.instagram.com/lovekellyfelder/?hl=en" style={{ marginRight: '10px' }}><img src='../../images/instagram.png' style={{width:'35px'}} /></a>
                  <a href="+94 77 422 67773" style={{ marginRight: '10px' }}><img src='../../images/whatsapp.png' style={{width:'35px'}} /></a>
                </div>
              </ProductDetails>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container >
          <Grid item md={4}>
            <ProductDescripton>
              <Typography variant="h5">Product Description</Typography>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </ProductDescripton>
          </Grid>

          <Grid item md={4}>
            <ProductDescripton>
              <Typography variant="h5">Size & Fit</Typography>
              <div dangerouslySetInnerHTML={{ __html: product.size_fit }} />
            </ProductDescripton>
          </Grid>

          <Grid item md={4}>
            <ProductDescripton>
              <Typography variant="h5">Care Instructions</Typography>
              <div dangerouslySetInnerHTML={{ __html: product.care_instructions }} />
            </ProductDescripton>
          </Grid>
        </Grid>
      </Container>
      <Container>
        {
          product.reviews.length === 0 ?
            <>
              <Grid container style={{ marginTop: '20px', borderBottom: '1px solid',borderColor:'grey', marginBottom: '20px' ,paddingBottom:'10px'}}>
                <h2>Reviews(0)</h2>
              </Grid>
              <Grid container style={{ marginTop: '20px', marginBottom: '20px',paddingLeft:'10px',color:'grey' }}>
                <p style={{width:'100%',marginBottom:'10px'}}>Buy the product and be the first to let us know what you think about this item.</p>
                <p>It helps us get better at what we do, and ultimately provide you with better products.</p>
              </Grid>
              <Grid item container style={{ textAlign: 'center', fontSize: '20px', backgroundColor: '#f9f8f8', padding: '15px 25px 15px 25px' }}>
                <p style={{ fontSize: '25px',width:'100%'}}>Customers Also Views</p>
                <NewArrivals_1 newArrivals={newArrivals} banner={banner} currency={currency} />
              </Grid>
            </> :
            <>
              <Grid container style={{ marginTop: '20px' }}>
                <h2>Reviews({product.reviews.length})</h2>
              </Grid>
               <Grid container style={{ marginTop: '10px', padding: '20px 15px 0px 25px', backgroundColor: '#f6f6f6' }}>
                <Grid item md={4}>
                  <p style={{ color: '#262b35', fontWeight: '700', marginBottom: '10px' }}>Average Rating</p>
                  <Rating name="half-rating-read" defaultValue={eval(product.avg_rating)} precision={0.5} readOnly />
                  <div style={{ marginLeft: '5%', marginTop: '-23px', marginLeft: '35%' }}>
                    <span style={{ color: '#262b35', fontWeight: '700', fontSize: '20px' }}>{product.avg_rating}</span>
                  </div>
                </Grid>
                <Grid item md={4}>
                  <Grid container>
                    <p style={{ fontWeight: '700', color: '#262b35' }}>Did the item fit well?</p>
                  </Grid>
                  <Grid container>
                    <Grid item md={3}>
                      <p style={{ marginBottom: '15px', marginTop: '23px', color: '#9b9b9b' }}>Small</p>
                      <p style={{ marginBottom: '15px', color: '#9b9b9b' }}>True to size</p>
                      <p style={{ color: '#9b9b9b' }}>Large</p>
                    </Grid>
                    <Grid item md={5} style={{ paddingTop: '30px' }}>
                      <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_large} />
                      <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_perfect} />
                      <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_small} />
                    </Grid>
                    <Grid item md={4} style={{ paddingLeft: '10px' }}>
                      <p style={{ marginBottom: '17px', marginTop: '27px', color: '#9b9b9b' }}>{product.product_fit.product_fit_large} %</p>
                      <p style={{ marginBottom: '17px', color: '#9b9b9b' }}>{product.product_fit.product_fit_perfect} %</p>
                      <p style={{ color: '#9b9b9b' }}>{product.product_fit.product_fit_small} %</p>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
              <Grid container>
                  <Grid item container style={{ marginTop: '15px' }}>
                    <Grid item md={5}></Grid>
                    <Grid item md={7} style={{ marginTop: '0px', zIndex: '100',paddingLeft:'60px' }}>
                      <div style={{ width: '100%', float: 'right' }}>
                        <div style={{ float: 'left', marginTop: '15px', fontSize: '14px' }}><span>Rating </span></div>
                        <FormControl style={{ float: 'left', marginRight: '25px' }} sx={{ m: 1, minWidth: 70 }} size="small">
                          <InputLabel id="demo-select-small" style={{ fontSize: '14px' }}>Rating</InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={rate}
                            label="Rating"
                            style={{ fontSize: '14px', height: '35px' }}
                            onChange={(e) => handleSelectRate(e)}
                          >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                          </Select>
                        </FormControl>
                        <div style={{ float: 'left', marginTop: '15px', fontSize: '14px' }}><span>Color </span></div>
                        <FormControl style={{ float: 'left', marginRight: '25px' }} sx={{ m: 1, minWidth: 130 }} size="small">
                          <InputLabel id="demo-select-small">Color</InputLabel>
                          <Select
                            style={{ fontSize: '12px', height: '35px' }}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={color}
                            label="Color"
                            onChange={(e) => handleSelectColor(e)}
                          >
                            {product.option_values[0].values.map(({ name, code }) => (
                              <MenuItem value={code} key={code}>
                                <Color_1>
                                  <div
                                    style={{
                                      background: code,
                                    }}
                                  ></div>
                                  <p>{name}</p>
                                </Color_1>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div style={{ float: 'left', marginTop: '15px', fontSize: '14px' }}><span>Size </span></div>
                        <FormControl style={{ float: 'left', marginRight: '25px' }} sx={{ m: 1, minWidth: 80 }} size="small">
                          <InputLabel id="demo-select-small">Size</InputLabel>
                          <Select
                            style={{ fontSize: '12px', height: '35px' }}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={size}
                            label="Size"
                            onChange={(e) => handleSelectSize(e)}
                          >
                            <MenuItem value={'All'}>ALL</MenuItem>
                            {
                              product.option_values[1].values.map(({ name, id }) => (
                                <MenuItem value={name} key={id}>{name}</MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <div style={{ float: 'left', marginTop: '15px', fontSize: '14px' }}><span>Sort by </span></div>
                        <FormControl style={{ float: 'left' }} sx={{ m: 1, minWidth: 100 }} size="small">
                          <InputLabel id="demo-select-small">Sort by</InputLabel>
                          <Select
                            style={{ fontSize: '12px', height: '35px' }}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sort}
                            label="Sortby"
                            onChange={(e) => handleSelectSortby(e)}
                          >
                            <MenuItem value={'Recommend'}>Recommend</MenuItem>
                            <MenuItem value='new'>new</MenuItem>
                            <MenuItem value='old'>old</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item container style={{ marginTop: '-50px' }}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={`All Reviews (${product.reviews.length})`} value="1" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                            <Tab label={`Images (${product.images.length})`} value="2" style={{ fontSize: '16px', fontWeight: 'bold' }} />
                          </TabList>

                        </Box>
                        <TabPanel value="1" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                          <table  style={{ width: '100%' }}>
                            <thead></thead>

                            <tbody>
                              {
                                product.reviews.map((item,index) =>
                                (
                                  index%2===0?
                                
                                     <tr key={item.id} style={{ paddingBottom: '10px', paddingLeft: '5px',backgroundColor:'white' }}>
                                        <td style={{ fontSize: '20px'}}>
                                          <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px',marginLeft:'5px'  }}><span style={{ padding: '7px 10px', marginRight: '10px', backgroundColor: '#e9dddd', borderRadius: '50%', color: '#c1a5a5' }}>{item.customer.name.slice(0, 1)}</span>{item.customer.name} </p>
                                          {/* <p style={{ marginBottom: '10px', fontSize: '16px' }}>Height :<span>175cm/5.9</span></p>
                                          <p style={{ fontSize: '16px' }}>Weight :<span>{product.v_weight}</span></p> */}
                                        </td>
                                        <td>
                                          <Rating  name="half-rating-read" defaultValue={eval(item.rating)} precision={0.5} readOnly />
                                          <p style={{ fontSize: '16px',height:'80px' }}>{item.content}</p>
                                          {
                                            item.product_fit === 1 ? <><span style={{ fontSize: '14px', color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : Too Small</span></> : (null)
                                          }
                                          {
                                            item.product_fit === 2 ? <><span style={{ color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : True to Size</span></> : <><span style={{ fontSize: '14px', color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : Too Large</span></>
                                          }

                                          <span style={{ marginLeft: '13px', color: 'grey' }}>Color </span><span style={{ fontWeight: '700', marginRight: '10px' }}>: {item.variants.v_option1}</span>
                                          <span style={{ marginLeft: '13px', color: 'grey' }}>Size </span><span style={{ fontWeight: '700', marginRight: '10px' }}>: {item.variants.v_option2}</span>
                                        </td>
                                        <td>
                                          <img src={product.images[0].url} style={{ width: '120px' }} />
                                        </td>
                                        <td>
                                          <img src={product.images[1].url} style={{ width: '120px' }} />
                                        </td>
                                        <td>
                                          <img src={product.images[2].url} style={{ width: '120px' }} />
                                        </td>
                                        <td style={{ textAlign: 'center', fontSize: '16px' }}>
                                          {item.created_at.slice(0, 10)}
                                        </td>
                                     </tr>
                                  :
                                      <tr key={item.id} style={{ paddingBottom: '10px', paddingLeft: '5px' ,backgroundColor:'#f3f7f9' }}>
                                    <td style={{ fontSize: '20px' }}>
                                      <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px',marginLeft:'5px'}}><span style={{ padding: '7px 10px', marginRight: '10px', backgroundColor: '#e9dddd', borderRadius: '50%', color: '#c1a5a5' }}>{item.customer.name.slice(0, 1)}</span>{item.customer.name} </p>
                                      {/* <p style={{ marginBottom: '10px', fontSize: '16px' }}>Height :<span>175cm/5.9</span></p>
                                      <p style={{ fontSize: '16px' }}>Weight :<span>{product.v_weight}</span></p> */}
                                    </td>
                                    <td >
                                      <Rating  name="half-rating-read" defaultValue={eval(item.rating)} precision={0.5} readOnly />
                                      <p style={{ fontSize: '16px',height:'80px' }}>{item.content}</p>
                                      {
                                        item.product_fit === 1 ? <><span style={{ fontSize: '14px', color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : Too Small</span></> : (null)
                                      }
                                      {
                                        item.product_fit === 2 ? <><span style={{ color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : True to Size</span></> : <><span style={{ fontSize: '14px', color: 'grey' }}>Over all</span><span style={{ fontWeight: '700', marginRight: '10px', fontSize: '14px' }}> : Too Large</span></>
                                      }

                                      <span style={{ marginLeft: '13px', color: 'grey' }}>Color </span><span style={{ fontWeight: '700', marginRight: '10px' }}>: {item.variants.v_option1}</span>
                                      <span style={{ marginLeft: '13px', color: 'grey' }}>Size </span><span style={{ fontWeight: '700', marginRight: '10px' }}>: {item.variants.v_option2}</span>
                                    </td>

                                    <td>
                                      <img src={product.images[0].url} style={{ width: '120px' }} />
                                    </td>
                                    <td>
                                      <img src={product.images[1].url} style={{ width: '120px' }} />
                                    </td>
                                    <td>
                                      <img src={product.images[2].url} style={{ width: '120px' }} />
                                    </td>
                                    <td style={{ textAlign: 'center', fontSize: '16px' }}>
                                      {item.created_at.slice(0, 10)}
                                    </td>

                                      </tr>
                                   
                                )
                                )
                              }
                            </tbody>
                          </table>
                        </TabPanel>
                        <TabPanel value="2">
                          <Slider_2 newArrivals={product.images} banner={banner} currency={currency} />

                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Grid>
                  <Grid item container style={{ textAlign: 'center', fontSize: '20px', backgroundColor: '#f9f8f8', padding: '15px 25px 15px 25px' }}>
                  <p style={{ fontSize: '25px',width:'100%'}}>Customers Also Views</p>
                    <NewArrivals_1 newArrivals={newArrivals} banner={banner} currency={currency} />
                  </Grid>
              </Grid>
            </>
        }

      </Container >


    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://kellyfelder-api-sandbox.syncbridge.net/v2/products/${params.id}?currency=LKR`
  );
  const response1 = await fetch(`${baseURL}/app`);
  const data = await res.json();
  const data1 = await response1.json();
  return {
    props: {
      product: data.data.product,
      banners: data1?.data.banners,
      newArrivals: data1?.data.newArrivals,
    },
  };
};
export default products;
