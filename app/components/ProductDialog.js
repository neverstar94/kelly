import { FullImage } from "core/theme/styles/home.styled";
import { useRouter } from "next/router";
import {
  CircularProgress,
  Grid,
} from "node_modules/@material-ui/core/index";
import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import React, { useEffect, useState } from "react";
import {
  ProductPrice,
  SizePopUp,
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
} from "core/theme/styles/product.style";
import { ItemColor, } from "core/theme/styles/catetory.styled";
import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import Cart from "core/services/cart";
import { isAuthenticated, } from "core/indentity/index";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import { useDispatch, useSelector } from "react-redux";
import { actionGetCart } from "core/redux/cart.actions";
import $ from 'jquery';
import { Bootbutton, } from "core/theme/styles/catetory.styled";
import {
  actionAddToFavouriteFail,
  actionGetWishlist,
} from "core/redux/profile.actions";
import Profile from "core/services/profile";

const ProductDialog = (props) => {

  const [product, setProduct] = useState(null);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (load) {
      getData()
      setLoad(!load)
    }
  }, [product]);

  const getData = async () => {

    const res = await fetch(
      `https://kellyfelder-api-sandbox.syncbridge.net/v2/products/${props.item.id}?currency=LKR`
    );

    const data = await res.json();
    data.data.product.isClicked = new Array(data.data.product.option_values[0].values.length).fill(false);
    data.data.product.isClicked[0] = true

    await setProduct(data.data.product);
  }
  const route = useRouter();
  const [sizes, setSizes] = React.useState(false);
  const [colors, setColors] = React.useState(false);
  const [variant, setVariant] = React.useState({
    color: "",
    size: "",
  });
  const changeImage = (id, image) => {
    setColorImage(false);
    setSelected(id);
    setColorImage(image);
  };
  const currency = useSelector(state => state.master.currency);
  //set sizes and colors
  React.useEffect(() => {
    if (product) {

      setSizes(product.option_values[1].values);
      setColors(product.option_values[0].values);
      setVariant({ color: product.option_values[0].values[0].name });
    }
  }, [product]);

  //init swiper
  const [swiper, setSwiper] = React.useState();
  const router = useRouter();
  //  const swiper = useSwiper();
  const thumbClick = (i) => {
    swiper.slideTo(i);
    //  setThumb(i);
  };
  //image loading
  const [isLoading, setLoading] = React.useState(false);
  //handle coloor pick
  const handleVariantColor = (product, name, i) => {
    setVariant((prevState) => ({
      ...prevState,
      color: name,
    }));
    swiper.slideTo(i);
    // setThumb(i);
  };
  //handle size pick
  const handleVariantSize = (product, name) => {
    setVariant((prevState) => ({
      ...prevState,
      size: name,
    }));
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
        }, 10);
      }
    });
  };

  //handle add to favourite
  const handleWishlist = (product) => {

    Profile.wishlistAdd(product.id).then((response) => {
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
          <ProductPrice>
            <span>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</span>
            {`${currency.code} ${parseFloat(currency.rate * product.v_discounted_price).toFixed(2)}`}
          </ProductPrice>
        )}
        {currency && product.v_discount_percent === 0 && (
          <ProductPrice>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</ProductPrice>
        )}
      </>
    );
  };

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

  const [popup, setPopup] = React.useState(false);

  return (
    <Grid container spacing={0} direction="row" justifyContent="center" style={{width:'960px'}} >
      {product ? (
        <Grid item container styley={{ overflow: 'hidden'}} >
          <Grid item md={7} style={{paddingLeft:'20px',paddingTop:'15px'}}>
            <Stack direction="row">
              <SliderThumbs>
                {product.images.map((image, i) => (
                  <Thumbnail key={image.id} onClick={() => thumbClick(i)} className={i === 0 ? "active" : ""}>
                    <FullImage src={image.url} showLoading={true} />
                  </Thumbnail>
                ))}
              </SliderThumbs>
              <SliderContainer>
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
                     
          <Grid item md={5} style={{paddingTop:'15px',}}>
            <ProductDetails>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductSKU>SKU : {product.sku}</ProductSKU>
              <Price style={{ fontSize: '25px' }} />
              <div style={{ fontSize: '18px',  marginTop: '20px', marginBottom: '10px' }}>Color&nbsp;:&nbsp;&nbsp;{variant.color}</div>
              <Stack spacing={0.5} direction="row" style={{ marginBottom: '20px' }}>
              
                {
                  colors.length > 0 &&
                  colors.map((color, index) => (
                    color.swatch_url===''?
                      <ItemColor key={color.code}
                        isFocued={product.isClicked && product.isClicked[index]}
                        onClick={() => {
                          handleVariantColor(product, color.name, index)
                          if (product.isClicked.length > 0) {
                            product.isClicked.fill(false)
                            product.isClicked[index] = true
                          }
                        }
                        }
                        style={{ background: color.code }}
                      ></ItemColor>:
                      <ItemColor key={color.code}
                        isFocued={product.isClicked && product.isClicked[index]}
                        onClick={() => {
                          handleVariantColor(product, color.name, index)
                          if (product.isClicked.length > 0) {
                            product.isClicked.fill(false)
                            product.isClicked[index] = true
                          }
                        }
                        }
                        style={{ background: `url(${color.swatch_url})` }}
                      ></ItemColor>
                   
                  ))}{" "}
              </Stack>

              <div style={{ marginTop: '0px', marginBottom: '15px' }}>
                <div style={{ fontSize: '18px', float: 'left', marginTop: '5px' }}>Size</div>
                <img src='../images/ruler.png' style={{width:'35px',marginLeft:'50px',float:'left'}} />
                <div style={{ paddingTop: '8px' }}><p style={{ fontSize: '14px' }}>Size Guide</p></div>
              </div>
             
              <ProductSizes>
                {sizes &&
                  sizes.map((item) => (
                    <>
                   <SizePopUp id={'pop' + item.id} style={{ display: 'none', width: '300px' }}>
                          <div dangerouslySetInnerHTML={{ __html: item.description }} />
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
                          key={item.id}
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
                  <PriceTag style={{ backgroundColor: '#ea9373', color: 'white', width: '170px',marginLeft:'0px' }}>
                    {/* <img src="/images/single_product/price-tag.svg" /> */}
                    {/* {product.stock_label} */}
                    {product.bulk_discount_label}

                  </PriceTag>
                )}
              </Stack>
              <Stack direction="row">
                <AddToBag onClick={() => handleAddToCart(product)}>
                  {isLoading && (
                    <>
                      <CircularProgress color="secondary" size="16px" />{" "}
                      &nbsp;
                    </>
                  )}
                  ADD TO BAG
                </AddToBag>
                <FavButton onClick={() => handleWishlist(product)}>
                  <FavoriteBorderIcon />
                </FavButton>
              </Stack>
              <Stack direction="row" style={{position:'absolute',bottom:'5px'}}>
                 <Link href={`/product/${product.id}?category=${product.category.name}&name=${product.title}`} style={{ marginTop: '20px', fontSize: '14px', color: 'black' }}>
                + View Full Details
                 </Link>
              </Stack>
              
            </ProductDetails>

          </Grid>
        </Grid>
      ) : (<></>)
      }
    </Grid >
  )
}

export default ProductDialog;