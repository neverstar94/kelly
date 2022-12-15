import React from "react";
import {
  CartItems,
  ItemPrice,
  ItemName,
  ButtonRemove,
  ItemsWrapper,
  CartTotal,
  ButtonOutlined,
  LineDivider,
  PaymentModes,
} from "core/theme/styles/card.styled";
import { LastItem,} from "core/theme/styles/product.style";
import { useRouter } from "node_modules/next/router";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
} from "node_modules/@material-ui/core/index";
import { Stack } from "node_modules/@mui/material/index";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetCart,
  actionRemoveCart,
  actionUpdateCart,
} from "core/redux/cart.actions";
import CartEmpty from "./components/empty";
import ActionButton from "components/ActionButton/index";
import Profile from "core/services/profile";
import Cart from "core/services/cart";
import { actionGetWishlist } from "core/redux/profile.actions";
import $ from 'jquery'
function ShoppingCart() {

  const [items, setItems] = React.useState([]);
  //get user
  const user = useSelector((state) => state.auth.user.data);
  //get cart
  const cartItems = useSelector((state) => state.shopping.cart);

  const [qty, setQty] = React.useState(1);

  const [item_id, setItemId] = React.useState("");

  //remove item cart
  const remove = useSelector((state) => state.shopping.remove);

  const update = useSelector((state) => state.shopping.update);

  const router = useRouter();

  const dispatchAction = useDispatch();

  const currency = useSelector((state) => state.master.currency);

  const [loading, setLoading] = React.useState(false);
  //load cart
  React.useEffect(() => {
    if (user) {
      dispatchAction(actionGetCart());
    
    }
  }, [user]);
  //load cart items
  React.useEffect(() => {
    if (cartItems.data && cartItems.data.cart) {
      setItems(Object.values(cartItems.data.cart));
    } else {
      setItems([]);
    }
    setLoading(false);
  }, [cartItems.data]);

  //handle remove item from cart
  const handleRemove = (row_id) => {
    dispatchAction(actionRemoveCart(row_id));
  };
 

  //clear cart
  const handleClearCart = () => {
   
    Cart.clear().then((response) => {
      dispatchAction(actionGetCart());
    });
  };
  const saveforlater = (item) => {
 
    Profile.wishlistAdd(item.options.product_id).then((response) => {
      if (response.data.status) {
           dispatchAction(actionGetWishlist());
           dispatchAction(actionRemoveCart(item.rowid));
      } 
    });
  }
   //handle update quantity
   const handleUpdateQty = (e, row_id, variant_id) => {
    
    setQty(parseInt(e.target.value));
    setItemId(variant_id);
   
    dispatchAction(
      actionUpdateCart({
        row_id,
        payload: {
          variant_id,
          new_variant_id: variant_id,
          qty: e.target.value,
        },
      })
    );
  };
//////////////////
  const handleSizeSelect = (e, variant_id, row_id, product_id, color) => {
    let value = e.target.value;
    let variant_title = `${color} / ${value}`;
    let variants =
      cartItems.data.products &&
      cartItems.data.products.filter((product) => product.id === product_id)[0]
        .variants;

    //get the new variant id from selected size & color
    let new_variant_id =
      variants.length > 0 &&
      variants.filter(({ v_title }) => v_title === variant_title)[0].v_id;

    setItemId(variant_id);
    if (variant_title && new_variant_id) {
      dispatchAction(
        actionUpdateCart({
          row_id,
          payload: {
            variant_id,
            new_variant_id,
            qty:$('#qty').val(),
          },
        })
      );
    }
  };
  return (
    <>
      <Container>
        <Box style={{ minHeight:"calc(100vh - 380px)"}}>
          {cartItems.isLoading && (
            <>
              <Box
                style={{
                  margin:"100px auto",
                  minHeight: "calc(100vh - 380px)",
                  textAlign:"center",
                  justifyContent:"center",
                  alignItems:"center",
                  display:"flex",
                  flexDirection:"column",
                }}
              >
                <CircularProgress color="#000" size="24px" />
                <Box
                  style={{
                    width:"200px",
                    borderRadius:"150px",
                    backgroundColor:"#fff",
                    margin: "24px auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/images/bag.svg" />
                  <p>Loading cart...</p>
                </Box>
              </Box>
            </>
          )}

          {items && items.length > 0 && (
            <>
              <Box style={{display: "flex",justifyContent: "space-between",alignItems: "center",padding:"24px 0px",}}>
                  <h4 style={{fontWeight: "300",fontSize:"24px",}}>
                         My Bag ({items && items.length})
                  </h4>
                  <ButtonOutlined  onClick={handleClearCart}style={{width: "160px",}}>
                      Clear Cart
                  </ButtonOutlined>
               </Box>
            <Grid container spacing={3}>
              <Grid item md={8}>
                {remove.isLoading && <LinearProgress />}
                    <CartItems>
                        <ItemsWrapper>
                          <table cellPadding={0} cellSpacing={0}>
                            <tbody>
                            {items &&
                              items.length > 0 &&
                              items.map((item) => (
                                <tr style={{borderBottom:'1px solid #cdc1c1'}}>
                                  <td style={{ width: "100px" ,}}>
                                      <img src={item.options.image} />
                                  </td>

                                  <td>
                                    <ButtonRemove onClick={() => handleRemove(item.rowid)} >
                                      <CloseIcon />
                                    </ButtonRemove>
                                    {currency && (
                                      <ItemPrice style={{fontSize:'18px',fontWeight:'700'}}>
                                        {currency.code}&nbsp;
                                        {parseFloat(
                                          item.price * currency.rate
                                        ).toFixed(2)}
                                      </ItemPrice>
                                    )}
                                    <ItemName style={{marginTop:'12px',color:' #666'}}> {item.name}</ItemName>

                                    <Stack direction="row">
                                      <p style={{color:'grey',fontSize:'16px',marginTop:'11px'}}>{item.options.v_option1}</p>
                                      
                                      <Stack direction="row" alignItems="center" style={{marginLeft:'70px'}}>
                                        <p style={{color:'grey',fontSize:'16px',marginTop:'5px'}}>Size</p>
                                        <select
                                         style={{padding:'5px',marginTop:'7px',height:'30px'}} defaultValue={item.options.v_option2}
                                          onChange={(e) =>handleSizeSelect(e,item.id, item.rowid,item.options.product_id,item.options.v_option1)}>
                                          {item.options.product_options &&
                                            item.options.product_options[1] &&
                                            item.options.product_options[1].values.map(
                                              (size) => (
                                                <option value={size.name}>{size.name}</option>
                                              )
                                            )}
                                        </select>
                                      </Stack>
                                      <Stack direction="row" alignItems="center" style={{marginLeft:'55px'}}>
                                        {update.isLoading && item.id === item_id && (
                                          <CircularProgress color="primary" size="16px" />
                                        )}
                                        <p style={{ marginLeft: "12px" ,color:'grey',fontSize:'16px',marginTop:'5px'}}>Qty</p>
                                        <input
                                          style={{width:'60px',height:'30px',marginTop:'7px'}}
                                          type="number"
                                          id='qty'
                                          defaultValue={parseInt(item.qty)}
                                          onChange={(e) =>
                                            handleUpdateQty(
                                              e,
                                              item.rowid,
                                              item.id,
                                              item.name
                                            )
                                          }
                                        ></input>
                                      </Stack>
                                    </Stack>
                                    <Grid style={{marginTop:'15px'}}>
                                        <Button onClick={()=>saveforlater(item)}  style={{backgroundColor:'#e8e5ed',color:'black',fontWeight:'bold'}}><FavoriteBorderIcon />&nbsp;Save For Later</Button>
                                    </Grid>
                                  </td>
                                </tr>
                              ))}{" "}
                              </tbody>
                          </table>
                          <Grid style={{width:'100%',marginTop:'20px',backgroundColor:'#faf8ff',height:'25px',borderTop:'1px solid #cdc1c1',paddingTop:'5px'}}>
                            {currency && cartItems.data &&(
                              <p style={{fontSize:'22px',fontWeight:'bold',float:'right',padding:'10px'}}>
                                  Sub Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {currency.code}{" "}
                                {parseFloat(
                                  cartItems.data.cart_total * currency.rate
                                ).toFixed(2)}
                              </p>
                                )}{" "}
                          </Grid>
                        </ItemsWrapper>
                       
                    </CartItems>
              </Grid>
              <Grid item md={4}>
                <CartTotal>
                  <h3>Total</h3>
                  {cartItems.data && (
                    <table>
                      <tbody>
                      <tr>
                        <td>
                          <p> Sub total </p>
                        </td>
                        <td  style={{textAlign:'right',fontWeight:'bold'}}>
                          {currency && (
                            <>
                              {currency.code}{" "}
                              {parseFloat(
                                cartItems.data.cart_total * currency.rate
                              ).toFixed(2)}
                            </>
                          )}{" "}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <p>
                          Delivery
                          </p>
                        </td>
                        <td style={{textAlign:'right',fontWeight:'bold'}}>To be calculated</td>
                      </tr>

                      <tr>
                        <td>
                          <p>
                          Discount
                          </p>
                        </td>
                        <td  style={{textAlign:'right',fontWeight:'bold'}}>Add in the next step</td>
                      </tr>
                      </tbody>
                    </table>
                  )}
            
                <LastItem style={{width:'100%',textAlign:'left',marginBottom:'10px',color:'#1f83a8',backgroundColor:'#dbebf1'}}>
                   <Grid container>
                      <Grid item md={1}><ErrorOutlineOutlinedIcon/></Grid>
                      <Grid item md={11} style={{fontSize:'14px',paddingLeft:'5px'}}>Coupon codes/vouchers can be entered in the next step</Grid>
                   </Grid>
                </LastItem>
                  <ActionButton loading={loading}
                    onClick={() => {
                      router.push("/checkout");
                      setLoading(true);
                    }}
                  >
                    CHECKOUT
                  </ActionButton>
                  <PaymentModes>
                    
               
                    <p>
                    We accept: 
                    </p>
                    <img src="/images/visa.png" />
                    <img src="/images/master.png" />
                </PaymentModes>
                </CartTotal>
              </Grid>
            </Grid>
            </>
          )}
        
          {!cartItems.isLoading && items && items.length === 0 && (
            <>
             <Box style={{display: "flex",justifyContent: "space-between",alignItems: "center",padding:"24px 0px",}}>
                  <h4 style={{fontWeight: "300",fontSize:"24px",}}>
                         My Bag ({items && items.length})
                  </h4>
               </Box>
              <CartEmpty user={user} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default ShoppingCart;
