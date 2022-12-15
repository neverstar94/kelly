import { actionGetWishlist } from "core/redux/profile.actions";
import { MyOrderContainer } from "core/theme/styles/profile.styled";
import { Box, CircularProgress, Grid } from "node_modules/@material-ui/core/index";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileList from "./index";
import Profile from "core/services/profile";
import { Stack } from "node_modules/@mui/material/index";
import CloseIcon from "@mui/icons-material/Close";
import { actionGetCart } from "core/redux/cart.actions";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import Cart from "core/services/cart";
import { CartItems,ItemPrice,ItemName,ButtonRemove,ItemsWrapper,} from "core/theme/styles/card.styled";
import {AddToBag1,} from "core/theme/styles/product.style";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';

import Link from "node_modules/next/link";
import { ButtonOutlined,} from "core/theme/styles/card.styled";
function wishlist() {
  const user = useSelector((state) => state.auth.user.data);
  const [items, setItems] = React.useState([]);
  
  const wishlist = useSelector((state) => state.profile.wishlist);

  const dispatchAction = useDispatch();

  const currency = useSelector((state) => state.master.currency);
  
  React.useEffect(() => {
    setItems(wishlist.data);
  }, [wishlist.data]);

  const handleSizeSelect=()=>{

  }
  
  const handleRemove = (id) => {
    Profile.wishlistRemove(id)
      .then((response) => {
        if (response.data.status) {
          AlertSuccess("delete successfully !");
          dispatchAction(actionGetWishlist());
        }
      })

  }

  const handleAddToCart = (product) => {
    let payload = {
      variant: product.v_id,
      qty: 1,
    };

 Cart.add(payload).then((response) => {

      Profile.wishlistRemove(product.id)
            .then((response) => {
              if (response.data.status) {
                AlertSuccess("Add to Cart Successfully !");
                dispatchAction(actionGetWishlist());
                dispatchAction(actionGetCart());
              }
            })
    });
};
const handleClearWishlist = (product) => {

     Profile.wishlistClear()
            .then((response)=>{
         
          AlertSuccess(response.data.message);
          dispatchAction(actionGetWishlist(product[0].row_id));
     });
 };
  return (
    <ProfileList>

      {wishlist && wishlist.data && wishlist.data.isLoading && (
        <MyOrderContainer
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "430px",
          }}
        >
          <Box
            style={{
              marginBottom: "24px",
              width: "80px",
              height: "80px",
              background: "none",
              borderRadius: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="#000" size="16px" />
          </Box>
        </MyOrderContainer>
      )}

      {wishlist && wishlist.data && wishlist.data.length === 0 && !wishlist.data.isLoading && (
        <MyOrderContainer style={{marginBottom: "12px", height:'80px',padding:'30px 0px'}}>
        <Grid container style={{paddingLeft:'30px'}}>
              <h2 style={{fontSzie:'27px'}}>Wishlist</h2>
        </Grid>
        <Grid container style={{backgroundColor: "#faf8ff",marginTop:'30px',height:'520px',display:'flex',justifyContent:'center'}}>
           <Box sx={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center", }}>
                <div style={{width: "150px", borderRadius: "150px", height: "150px",backgroundColor: "#f6f6f6",margin: "0 auto",marginTop:'100px', display: "flex",justifyContent: "center", alignItems: "center",}}>
                    <FavoriteBorderIcon style={{fontSize:'60px',color:'#666'}}/>
                </div>
                <h4 style={{marginBottom:'30px',marginTop:'20px'}}>Nothing in the wishlist at the moment.</h4>
                {
                    currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
                        <ButtonOutlined style={{height:'30px',width:'100px'}}>
                            CONTINUE SHOPPING
                        </ButtonOutlined>
                  </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
                        <ButtonOutlined style={{height:'45px',width:'250px'}}>
                            CONTINUE SHOPPING
                        </ButtonOutlined>
                  </Link>
                  }
            </Box>
        </Grid>
        
      </MyOrderContainer>
      
      )}
      {wishlist && wishlist.data && wishlist.data.length > 0 && (
        <>
          <MyOrderContainer style={{marginBottom: "12px", height:'80px'}}>
            <Grid container>
                <Grid md={9}>
                     <h2 style={{fontSzie:'27px'}}>Wishlist</h2>
                </Grid>
                <Grid md={3} style={{marginTop:'-7px'}}>
                     <div>
                     <button style={{fontSize:'16px',padding:'10px 30px',backgroundColor:'white',color:'black',border:'1px solid black'}}  onClick={() => handleClearWishlist(items)}>
                            REMOVE&nbsp; ALL
                      </button>
                     </div>
                </Grid>
            </Grid>
            
          </MyOrderContainer>
          <MyOrderContainer style={{padding:'0px',height:'520px',overflowY:'auto',backgroundColor:'white'}}>
            <Grid item style={{padding:'0px',backgroundColor:'white',width:'100%'}}>
              <CartItems>
                  <table cellPadding={0} cellSpacing={0}>
                    <thead></thead>
                    <tbody>
                    {items &&
                      items.length > 0 &&
                      items.map((item) => (
                        <>
                        <tr key={item.id}>
                          <td style={{ width: "100px" ,border:'none',paddingLeft:'30px'}}>
                            <img src={item.image_url} />
                          </td>

                          <td style={{paddingBottom:'0px',border:'none'}}>
                            <ButtonRemove onClick={() => handleRemove(item.id)}>
                              <CloseIcon style={{fontSize:'15px'}} />
                            </ButtonRemove>
                            {currency && (
                              <ItemPrice style={{ fontWeight: '700',fontSize:'18px',color:'black' }}>
                                {currency.code}&nbsp;
                                {parseFloat(
                                  eval(item.v_discounted_price) * currency.rate
                                ).toFixed(2)}
                              </ItemPrice>
                            )}
                            <Stack direction='row'>
                                  <ItemName>{item.title}</ItemName>
                            </Stack>
                            <Stack direction='row' style={{marginTop:'20px'}}>
                                  <Stack direction='row' style={{marginRight:'30px'}}>
                                       <ItemName>{item.v_option1}</ItemName>
                                  </Stack>
                                  <Stack direction="row" style={{marginRight:'20px'}}>
                                      <span style={{height:'35px',borderLeft:'1px solid #c5c0c0',marginTop:'-10px'}}></span>
                                      <select readOnly style={{marginTop:'-10px',padding:'0px',height:'35px',marginLeft:'30px'}}>

                                        <option value={item.v_option2} readOnly>{item.v_option2}</option>
                                      </select>
                                  </Stack>
                                  <Stack direction="row">
                                      <span style={{height:'35px',borderLeft:'1px solid #c5c0c0',marginTop:'-10px'}}></span>
                                      <p style={{marginLeft:'30px'}}>Qty</p>
                                      <select readOnly style={{marginTop:'-10px',padding:'0px',height:'35px',}} defaultValue={parseInt(item.qty)}>
                                        <option value={1} >1</option>
                                        <option value={2} >2</option>
                                        <option value={3} >3</option>
                                      </select>
                                  </Stack>
                            </Stack>
                            
                            <Stack direction="row" style={{marginTop:'10px'}}>
                                <Button onClick={() => handleAddToCart(item)}  style={{backgroundColor:'#e8e5ed',color:'black',fontWeight:'bold'}}><LockOutlinedIcon />&nbsp;ADD TO BAG</Button>
                            </Stack>
                          </td>
                        </tr>
                        <tr style={{height:'10px',backgroundColor:'white'}}></tr>
                        </>
                      ))}{" "}
                      </tbody>
                  </table>
             
              </CartItems>
            </Grid>
          </MyOrderContainer>
        </>
      )}
    </ProfileList>
  );
}

export default wishlist;

