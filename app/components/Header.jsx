import {
  AppHeader,
  IconButtonDropdown,
  IconCurrencyDropdown,
} from "core/theme/styles/header.styled";
import {EmptyCart1,} from "core/theme/styles/card.styled";
import { Box, Container, Grid } from "node_modules/@material-ui/core/index";
import React from "react";
import Logo from "./Logo";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";


import CloseIcon from "@mui/icons-material/Close";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import {
  NavList,
  NavListItem,
  NavListRight,
  IconButton,
} from "core/theme/styles/header.styled";
import Link from "node_modules/next/link";
import { useRouter } from "node_modules/next/router";

import { useDispatch, useSelector } from "react-redux";
import Auth from "core/services/auth";
import { isAuthenticated } from "core/indentity/index";
import { actionGetUser, actionGetUserFail } from "core/redux/auth.actions";
import { actionGetCart } from "core/redux/cart.actions";
import { CartCount } from "core/theme/styles/card.styled";
import {
  ProfileInfo,
  ProfileMenu,
  CurrencyMenu,
  ProfileMenuItem,
} from "core/theme/styles/profile.styled";
import axios from "node_modules/axios/index";
import { baseURL} from "core/constants/index";
import { actionSetCurrency } from "core/redux/master.actions";
import { actionRemoveCart,} from "core/redux/cart.actions";

  //const dispatchAction = useDispatch();

  const Header = ({ giftCardCategory }) => {

      const user = useSelector((state) => state.auth.user);
      const [preview, setPreview] = React.useState(false);
      const cart = useSelector((state) => state.shopping.cart.data); // updated cart object
      const dispatchAction = useDispatch();
      React.useEffect(() => {
          isAuthenticated().then((response) => {
            if (!response) {
              dispatchAction(actionGetUserFail(null));
            } else {
              dispatchAction(actionGetUser());
            }
          });
       }, []);

      React.useEffect(() => {
          if (user.data) {
            dispatchAction(actionGetCart());
          }
      }, [user.data]);

      React.useEffect(() => {
          if (cart) {
            setPreview(true);
            setTimeout(() => {
              setPreview(false);
            }, 4000);
          }
      }, [cart]);
      return (
        <AppHeader>
          <Container disableGutters={true}>
            <Grid
              container
              spacing={0}
              style={{
                alignItems: "center",
              }}
            >
              <Grid item md={5}>
                <LeftNav giftCardCategory={giftCardCategory} />
              </Grid>
              <Grid item md={2}>
                <Logo />
              </Grid>
              <Grid item md={5}>
                <RightNav preview={preview} user={user} />
              </Grid>
            </Grid>
          </Container>
        </AppHeader>
      );
  };

const LeftNav = ({ giftCardCategory }) => {
  
const currency = useSelector((state) => state.master.currency);
  return (
    <div>
      <NavList>
        <NavListItem>
          {
            currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
            <a>Shop Now</a>
          </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
            <a>Shop Now</a>
          </Link>
          }
          
        
        </NavListItem>

        {giftCardCategory && giftCardCategory.id && (
         <NavListItem>
            {
            currency===null?<Link href={`/gift/${giftCardCategory.id}?name=${giftCardCategory.name}&page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=&currency=LKR`}>
               <a>Gift Cards</a>
              </Link>:<Link href={`/gift/${giftCardCategory.id}?name=${giftCardCategory.name}&page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=&currency=${currency.code}`}>
                <a>Gift Cards</a>
              </Link>
              }
          </NavListItem>
        )}

        <NavListItem>
          <Link href="/contact-us">
            <a>Contact Us</a>
          </Link>
        </NavListItem>

        <NavListItem>
          <IconButton>
             <ion-icon name="search"></ion-icon>
          </IconButton>
        </NavListItem>
      </NavList>
    </div>
  );
};

const ProfileDropdown = ({ user }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const router = useRouter();
    const toLogout = () => {
      Auth.logout();
      router.push("/auth/logout");
    };

    const to = (url) => {
      router.push(url);
      setAnchorEl(null);
    };
  return (
    <>
      <IconButtonDropdown onClick={handleOpen}>
        {user.profile.name.charAt(0)}
      </IconButtonDropdown>
      <ProfileMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <ProfileInfo>
          <img
            src={user.profile.image_url}
            style={{
              width: "44px",
              height: "44px",
            }}
          />
          <Box>
            <h5>{user.profile.name}</h5>
            <p>
              <small>
                <a href="#">{user.profile.email}</a>
              </small>
            </p>
          </Box>
        </ProfileInfo>
        <ProfileMenuItem onClick={() => to("/profile/account")}>
          <ion-icon name="person-outline"></ion-icon> <p> My Account</p>
        </ProfileMenuItem>
        {/* <ProfileMenuItem onClick={() => to("/profile")}>
          <ion-icon name="settings-outline"></ion-icon> <p>Settings</p>
        </ProfileMenuItem> */}

        <ProfileMenuItem onClick={toLogout}>
          <ion-icon name="log-out-outline"></ion-icon> <p>Logout</p>
        </ProfileMenuItem>
      </ProfileMenu>
    </>
  );
};
const CartPreview = () => {
  return (
    <Box
      style={{
        boxShadow: "0 0 10px rgba(0,0,0, .15)",
        width: "320px",
        height: "320px",
        position: "absolute",
        top: "70px",
        zIndex: 3000,
      }}
    >
      <h4>Cart Preview</h4>
    </Box>
  );
};

const CurrencyDropdown = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [currencies, setCurrencies] = React.useState(null);

  const handleCurrency = (c) => {
    localStorage.setItem("currency", JSON.stringify(c));
    setCode(c);
    setAnchorEl(null);
    location.reload();
  };

  const dispatchAction = useDispatch();
  const [code, setCode] = React.useState(null);
  React.useEffect(() => {
    axios.get(`${baseURL}/currencies`).then((res) => {
     
      setCurrencies(res.data.data.currencies);
      if(localStorage.getItem('load')!=='load'){
        localStorage.setItem("currency", JSON.stringify((res.data.data.currencies[0])));
        localStorage.setItem("load", 'load');
      }
      let currency = localStorage.getItem("currency");
      setCode(JSON.parse(currency));
      dispatchAction(actionSetCurrency(JSON.parse(currency)));
    });
  }, [user]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <IconCurrencyDropdown onClick={handleOpen}>
        <img
          src={`https://kellyfelder-revamp.s3.ap-southeast-1.amazonaws.com/web/icons/${
            code && code.code ? code.code : "LKR"
          }.png`}
        />
        {code && code.code ? code.code : "LKR"}
        <ion-icon name="caret-down-outline"></ion-icon>
      </IconCurrencyDropdown>
      <CurrencyMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {currencies &&
          currencies.map((currency,index) => (
            <ProfileMenuItem onClick={() => handleCurrency(currency)} key={index}>
              <img
                src={currency.icon_url}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100px",
                  marginRight: "6px",
                }}
              />
              {currency.code}
            </ProfileMenuItem>
          ))}
      </CurrencyMenu>
    </>
  );
};

import Switch from '@mui/material/Switch';
const RightNav = ({ preview }) => {
  
const currency = useSelector((state) => state.master.currency);
const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const router = useRouter();
  const dispatchAction = useDispatch();
  const user = useSelector((state) => state.auth.user?.data);
  const wishlist = useSelector((state) => state.profile.wishlist);
  const products = useSelector((state) => {
    return Object.values(
      state.shopping.cart.data && state.shopping.cart.data.cart
        ? state.shopping.cart.data.cart
        : {}
    );
  });

  const toLogin = () => {
    router.replace("/auth/sign-in");
  };
  const toFav = () => {
    router.push("/profile/wishlist");
  };
  const [totalprice, setTotalprice] = React.useState(0);
  React.useEffect(() => {
   
  }, []);
  

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

  ////////////////////////pop-out/////

  const [anchorEl, setAnchorEl] = React.useState(null);
  const toCart_open = (event) => {
    setAnchorEl(event.currentTarget);
     
    const total=0;
    for(let i=0;i<products.length;i++){
       const temp= products[i].price*products[i].qty;
       total=total+temp;
    }
    setTotalprice(total);
  };
  const toCart_close = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [anchorEl_0, setAnchorEl_0] = React.useState(null);
  const toCart_open_0 = (event)=>{
    setAnchorEl_0(event.currentTarget);
  }
  const toCart_close_0 = () => {
    setAnchorEl_0(null);
  };
  const open_0 = Boolean(anchorEl_0);
  const id_0 = open_0 ? 'simple-popover' : undefined;
  const ToCart = () => {
    setAnchorEl(null);
    router.push("/cart");
  }
  const handleRemove = (product) => {
    dispatchAction(actionRemoveCart(product.rowid));
      
    setTotalprice(totalprice-(product.price*product.qty));
  };
  return (
    <div>
      <NavListRight>
        <NavListItem>
            {user && products.length !== 0 ? (
              
              <IconButton aria-describedby={id} variant="contained" onClick={toCart_open} sx={{position: "relative",}}>
                <CartCount  style={{ backgroundColor: "#d5a688",color: "#fff",}}>
                  {products.length}
                </CartCount>
                <LocalMallOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton aria-describedby={id_0} onClick={toCart_open_0}  sx={{position: "relative",}}>
                 <CartCount>0</CartCount>
                 <LocalMallOutlinedIcon />
              </IconButton>
            )}
        </NavListItem>
          <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={toCart_close}
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
              }}
            >
            <Typography sx={{ p: 2 }} style={{padding:'20px 20px 10px 20px'}}>
              <div>
                <div style={{width:'470px',height:'295px', overflowY:'auto'}}>
                    <table>
                     { 
                       products.map((product) => (
                          
                              <tr key={product.id} fullwidth>
                                 
                                  <td style={{width:'100px',height:'145px',backgroundImage:`url(${product.options.image})`,backgroundRepeat: 'no-repeat',backgroundSize: '100px 130px'}}>
                                    
                                  </td>
                                  <td style={{paddingLeft:'5px',width:'300px',paddingright:'5px'}}>
                                  {
                                    currency===null? <p style={{marginTop:'-20px',fontSize:'16px',fontWeight:'700'}}>LKR {eval(product.price)}.00</p>:<p style={{marginTop:'-20px',fontSize:'16px',fontWeight:'700'}}>{currency.code }&nbsp; {parseFloat(eval(product.price)*currency.rate).toFixed(2)}</p>
                                  }
                                      <p style={{fontSize:'14px'}}>{product.name}</p>
                                      <p style={{fontSize:'14px',marginTop:'3px'}}>{product.options.v_option1}</p>
                                      <p style={{fontSize:'14px',marginTop:'3px'}}>Size: {product.options.v_option2}</p>
                                      <p style={{fontSize:'15px',marginTop:'3px'}}>Qty: {product.qty}</p>
                                  </td>
                                  <td style={{float:'right',paddingTop:'10px'}}>
                                      <CloseIcon style={{color:'black',fontSize:'15px'}} onClick={() => handleRemove(product)}/>
                                  </td>
                              </tr>
                      ))}
                    </table>
                 </div>
                 <div style={{borderTop: '1px solid black',paddingTop:'10px',paddingLeft:'2px',marginBottom:'10px'}}>
                  
                      <div style={{float:'right'}}>
                          <span style={{color:'black'}}>Total&nbsp;&nbsp;
                            <span style={{fontWeight:'700'}}>
                             {currency && (
                                <>
                                  {currency.code}{" "}
                                  {parseFloat(
                                    totalprice * currency.rate
                                  ).toFixed(2)}
                                </>
                            )}{" "}
                            </span>
                          </span>
                      </div>
                 </div>
                 <div style={{width:'470px',textAlign:'center',}}><Button onClick={ToCart} style={{width:'100%',backgroundColor:'#2d283f',color:'white',borderRadius:'0px',height:'40px'}}>VIEW CART({products.length})</Button>
                </div>
              </div>
            </Typography>
        </Popover>
        <Popover
              id={id_0}
              open={open_0}
              anchorEl={anchorEl_0}
              onClose={toCart_close_0}
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
              }}
            >
            <Typography sx={{ p: 2 }}>
                <div style={{width:'500px',height:'400px'}}>
                    <EmptyCart1 style={{paddingBottom:'30px'}}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "150px",
                              borderRadius: "150px",
                              height: "150px",
                              backgroundColor: "#f6f6f6",
                              margin: "0 auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src="/images/bag.svg" />
                           
                          </div>
                          <div><h3>Your bag is empty</h3></div>
                         
                        </Box>
                   </EmptyCart1>
                </div>
            </Typography>
        </Popover>
        <NavListItem>
          <IconButton onClick={toFav}>
            {
              user && wishlist && wishlist.data && <CartCount  style={{
                backgroundColor: "#d5a688",
                color: "#red",
              }}>
                {wishlist.data.length}
              </CartCount>
            }

            {
              !user && <CartCount>
                0
              </CartCount>
            }
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </NavListItem>
        {!user && (
          <NavListItem>
            <IconButton onClick={toLogin}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </NavListItem>
        )}
        {user && (
          <NavListItem>
            <ProfileDropdown user={user} />
          </NavListItem>
        )}

        <NavListItem>
          <CurrencyDropdown user={user} />
        </NavListItem>
         
      </NavListRight>
    </div>
  );
};
export default Header;
