import ActionButton from "components/ActionButton/index";
import { baseURL,localURL } from "core/constants/index";
import {
  actionAddCoupon,
  actionGetPricing,
  
} from "core/redux/checkout.actions";
import {
  actionGetCart,

} from "core/redux/cart.actions";
import {
  actionGetCountries,
  actionGetPayment,
  actionGetShipping,
} from "core/redux/master.actions";
import $ from 'jquery';
import { actionGetAddress } from "core/redux/profile.actions";

import {
  ButtonOutlined,
  ButtonPrimary,
  CartTotal,
  CheckoutWrapper,
  ItemName,
  Size
} from "core/theme/styles/card.styled";
import {Radio, RadioGroup} from '@mui/material';


import { PromoCodes } from "core/theme/styles/checkout.styled";
import { ItemPrice } from "core/theme/styles/catetory.styled";

import Box from '@mui/material/Box';
import {
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "node_modules/@material-ui/core/index";
import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "core/theme/styles/auth.styled";
import Checkout from "core/services/checkout";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import { useRouter } from "next/router";
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function CheckoutPage({ master_countries, master_payment_types }) {

  const router = useRouter();

  const [items, setItems] = React.useState(false);
  const [deliverystate, setDeliverystate] = React.useState(false);
  const user = useSelector((state) => state.auth.user.data);
  const addresses = useSelector((state) => state.profile.address.data);
  const cart = useSelector((state) => state.shopping.cart);
  const [promo, setPromo] = React.useState(null);
  const order = useSelector((state) => state.checkout.order);
  const currency = useSelector((state) => state.master.currency);
  const cartItems = useSelector((state) => state.shopping.cart);
  const [shippingPayload, setShippingPayload] = React.useState({
    country_id: null,
    city_id: null,
  });

  const [coupon_discount, setCD] = React.useState(null);
  const [defaultAddress, setDefaultAddress] = React.useState({
    id: "",
    email:'',
    name:'',
    address_1: "",
    address_2: "",
    city_id: "",
    postal_code: "",
    phone:'',
    secondary_phone: "",
    is_default: "",
    city_name: "",
    country_name: '',
  });
  
  const [cityList, setCityList] = React.useState(null);

  const dispatchAction = useDispatch();
  React.useEffect(() => {
    dispatchAction(actionGetCountries());
    dispatchAction(actionGetPayment());
    if (user && user.profile) {
      dispatchAction(actionGetAddress());
      setDefaultAddress({
        email:user.profile.email,
        name: user.profile.name,
        phone: user.profile.phone,
      })
    }
   
  }, [user]);

  React.useEffect(() => {
    if (cart && cart.data && cart.data.cart) {
      setItems(Object.values(cart.data.cart));
    }
  }, [cart]);

  const rdxTotal = useSelector((state) => state.checkout.total.data);
  const [total, setTotal] = React.useState(null);

  React.useEffect(() => {
    setTotal(rdxTotal);
  }, [rdxTotal]);
  const [paper_designs, setPaper_designs] = React.useState(null);
  React .useEffect(()=>{
    Checkout.gift_wrapping_paper_designs()
            .then(response => {
                setPaper_designs(response.data.data.paper_designs)
              })
            .catch(e=>{
                console.log(e)
              })
  },[])

  React.useEffect(() => {
    if (addresses) {
      let default_address =
        addresses &&
        addresses.addresses &&
        addresses.addresses.filter((address) => address.is_default === 1)[0];

      if (default_address) {
        setDefaultAddress(default_address);
      }
    }
  }, [addresses]);




  const handlePromocodeChange = (e) => {
    setPromo(e.target.value);
  };
  const handleGiftChange = (e) => {
    setPromo(e.target.value);
  };

  const handleCountrySelect = (e) => {
    let value = e.target.value;
    let c = master_countries.filter((c) => c.name === $('#country').val())[0];
    setCityList(c.cities);
    setShippingPayload((prevState) => ({
      ...prevState,
      country_id: c.id,
    }));
    setDefaultAddress((prevState) => ({
      ...prevState,
      country_name: value,
    }));
    //setCountry0(c);

  };

  const handleChange = (e) => {
    setDefaultAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [shipping_services, setShipping_services] = React.useState([]);

  const handleGetShipping = (e) => {
    e.preventDefault();
    
    let country = master_countries.filter(
      (c) => c.name === $('#country').val()
    )[0];

    if(country.id==196){
      var city = country.cities.filter(
        (c) => c.name === $('#city').val()
      )[0];
      setShippingPayload((prevState) => ({
        ...prevState,
        country_id: country.id,
        city_id: city && city.id,
      }));
      if (country.id) {
        Checkout.GetShipping({
          name: $('#name').val(),
          email:$('#email').val(),
          address_1:$('#adressline1').val(),
          address_2:$('#adressline2').val(),
          country_id:country.id,
          city_id: city.id, 
          postal_code:$('#postcode').val(),
          phone:$('#phone').val(),
          secondary_phone:$('#secondary_phone').val(),
          shipping_selector: "DELIVER"
        })
          .then(response => {
          
            if (response.data.status) {
              setCD(response.data.coupon_discount);
              AlertSuccess("Delivery Details adding successfully");
              dispatchAction(actionGetPricing());
  
              const data={
                 country: country.id,
                  city:city.id, 
              }
              Checkout.shippingservice(data)
              .then(response => {
                // setDeliveryflag(true);
                 setShipping_services(response.data.data.shipping_services);
              })
            } else {
              AlertError(response.data.message);
          }
        })
       
      }
    }else{
      setShippingPayload((prevState) => ({
        ...prevState,
        country_id: country.id,
        city_id:  $('#city').val(),
      }));
      if (country.id) {
        Checkout.GetShipping({
          name: $('#name').val(),
          email:$('#email').val(),
          address_1:$('#adressline1').val(),
          address_2:$('#adressline2').val(),
          country_id:country.id,
          city_name: $('#city').val(), 
          postal_code:$('#postcode').val(),
          phone:$('#phone').val(),
          secondary_phone:$('#secondary_phone').val(),
          shipping_selector: "DELIVER"
        })
          .then(response => {
          
            if (response.data.status) {
              setCD(response.data.coupon_discount);
              AlertSuccess("Delivery Details adding successfully");
              dispatchAction(actionGetPricing());
              const data={
                country: country.id,
                city:$('#city').val(),
              }
              Checkout.shippingservice(data)
              .then(response => {
               //  setDeliveryflag(true);
                 setShipping_services(response.data.data.shipping_services);
              })
            } else {
              AlertError(response.data.message);
          }
        })
       
      }
    }
  };

  const calculateShipping = (s) => {
    Checkout.shippingfee({shipping_service_id:s.id})
            .then((res)=>{
              AlertSuccess(res.data.message);
              setTotal(res.data.data.totals);
            })
  };
  const paymentselect=(value)=>{
    Checkout.paymentselect({payment_type:value})
            .then((res)=>{
              AlertSuccess(res.data.message);
              setTotal(res.data.data.totals);
            })
  }
  const handlePlaceOrder = (e) => {
    Checkout.placeorder({
      order_from: 'SITE',
    })
    
      .then(response => {
        if (response.data.status) {
           AlertSuccess("Order sbumitted successfully");
           dispatchAction(actionGetCart());
           router.push("/cart");
           
              
        } else {
          AlertSuccess("Order sbumitted successfully");
           dispatchAction(actionGetCart());
           router.push("/cart");
      }
    })
  };
  const [codestate, setCodestate] = React.useState(false);
  
  const handleAddPromocode = (e) => {
    e.preventDefault();
    Checkout.applyCoupon({
      coupon: promo,
      os_type: "WEB",
    })
      .then(response => {
        if (response.data.status) {

          setCD(response.data.coupon_discount);
          AlertSuccess("Promo coupon added successfully");
          dispatchAction(actionGetPricing());
          $('#gift_card').val('');
        } else {
          AlertError(response.data.message);
       
      }
    })
  };
  const handleRemoveCode = () => {
   
    Checkout.removeCoupon().then((res) => {
      if (res.data.status) {
        console.log(res.data,'123456879789')
        AlertSuccess(res.data.message);
        dispatchAction(actionGetPricing());
      }
    });
  };
  'ILV2229TX0'
  //  const handleRemoveCard=()=>{
  //   if($('#gift_card').val()!=''){
  //   const payload={
  //       code:$('#gift_card').val()
  //     }
  //     Checkout.removeGiftCart(payload).then((res) => {
  //       if (res.data.status) {
  //         AlertSuccess("Gift Card Removed");
  //         dispatchAction(actionGetPricing());
  //         $('#gift_card').val('')
  //       }
  //     });
  //   }else{
  //     AlertError('error')
  //   }
   
  //  }
  


  return (
    <>
      {user && (
        <CheckoutWrapper>
          <Container>
            <Grid container spacing={2}>
                <Grid item md={8} style={{marginTop:'30px'}}> 
                <section> 
                  <Grid item container>
                      <Grid item md={8}>
                         <Box>
                             <PromoCodes> 
                            {(total != null && total != undefined ) &&(total.coupon_discount===0)&& (
                                <>
                                  <section style={{padding:'0px'}}>
                                  <h3 style={{marginTop:'25px'}}>Promo Code</h3>
                                  <Form onSubmit={handleAddPromocode}>
                                    <p>Enter Promo Code</p>
                                    <Stack spacing={2} direction="row">
                                      <FormControl fullWidth>
                                        <TextField
                                          type="text"
                                          placeholder="Promo code"
                                          required
                                          onChange={handlePromocodeChange}
                                        />
                                      </FormControl>

                                      <ActionButton style={{backgroundColor:'white',color:'black',border:'1px solid',fontSize:'16px'}}  type="submit" onClick={handleAddPromocode}>
                                        APPLY CODE
                                      </ActionButton>
                                    </Stack>
                                  </Form>
                              
                                <p>
                                  Coupon Discount - {
                                  total && total.coupon_discount
                                  }
                                  &nbsp;
                                  {
                                    currency && currency.code
                                  }
                                </p>
                              
                                <ul style={{ padding: 0, margin: 0 }}>
                              <li>
                                You can only use one discount/promo code per order.
                              </li>
                              <li>
                                Discount/Promo Codes can not be used when buying gift
                                vouchers
                              </li>
                            </ul>
                                  </section>
                                </>
                              )}

                            {total && total && (total.coupon_discount>0)&&(
                                <section style={{marginBottom:'0px'}}>
                                  <h3>Promo Code Applied</h3>
                                  <p>&nbsp;</p>
                                  <ActionButton onClick={handleRemoveCode}>
                                    REMOVE CODE
                                  </ActionButton>
                              <p>&nbsp;</p>
                              <ul style={{ padding: 0, margin: 0 }}>
                              <li>
                                You can only use one discount/promo code per order.
                              </li>
                              <li>
                                Discount/Promo Codes can not be used when buying gift
                                vouchers
                              </li>
                            </ul>
                                </section>
                              )}
                             </PromoCodes>
                          </Box>
                      </Grid>
                  </Grid>
                </section> 
                <section>
                  <Grid item container>
                      <Grid item md={8}>
                           <section style={{padding:'0px',marginBottom:'0px'}}>
                              <h3>Gift Card</h3>
                              <Form>
                                  <p>Gift Card</p>
                                  <Stack spacing={2} direction="row">
                                    <FormControl fullWidth>
                                      <TextField
                                        type="text"
                                        id='gift_card'
                                        placeholder="Gift Card"
                                        required
                                        onChange={handleGiftChange}
                                      />
                                    </FormControl>

                                    <ActionButton style={{backgroundColor:'white',color:'black',border:'1px solid',fontSize:'16px'}} type="button" onClick={handleAddPromocode}>
                                      APPLY Card
                                    </ActionButton>
                                  </Stack>
                                  <p style={{fontSize:'16px',fontWeight:'bold',marginTop:'-15px',color:'black'}}>+Add another</p>
                              </Form>
                                <p style={{marginTop:'15px'}}>
                                  Gift Card - {
                                  total && total.gift_card_discount} &nbsp;
                                  {
                                    currency && currency.code
                                  }
                                  </p>
                              
                                <ul style={{ padding: 0, margin: 0,paddingLeft:'20px' }}>
                                  <li>
                                    You can only use one discount/promo code per order.
                                  </li>
                                  <li>
                                    Discount/Promo Codes can not be used when buying gift
                                    vouchers
                                  </li>
                                </ul>
                          </section>
                      </Grid>
                    </Grid>
                 </section>
                 <section> 
                    <Grid item container>
                      <Grid item md={8}>
                         <section style={{padding:'0px',marginBottom:'0px'}}>
                            <h3>Email Address</h3>
                            <Form onSubmit={handleAddPromocode}>
                              <p>Enter Email Address</p>
                              <Stack spacing={2} direction="row">
                                <FormControl fullWidth>
                                  <TextField
                                    type="text"
                                    placeholder="Your Email"
                                    required
                                    onChange={handlePromocodeChange}
                                  />
                                </FormControl>

                                <ActionButton style={{backgroundColor:'white',color:'black',border:'1px solid',fontSize:'16px'}}  type="submit" onClick={handleAddPromocode}>
                                  Add My Email
                                </ActionButton>
                              </Stack>
                            </Form>
                          </section>
                      </Grid>
                    </Grid>
                 </section>
                 <section>
                    <section style={{padding:'0px',marginBottom:'0px'}}>
                        <h3 style={{marginBottom:'25px'}}> Gifting Option </h3>
                        <Grid container spacing={2}>
                            <Checkbox id='11' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />
                            <span style={{fontSize:'18px',marginTop:'12px'}}>Send this item as gift</span>

                        </Grid>
                        <Grid container spacing={2} style={{paddingLeft:'30px'}}>
                            <Grid item md={4}>
                                <FormControlLabel  control={<Radio />} label='Wrapped in Paper'/>
                            </Grid>
                            <Grid item md={4}>
                                <FormControlLabel  control={<Radio />} label='Item Boxed'/>
                            </Grid>
                            <Grid container spacing={2} style={{paddingLeft:'16px',marginTop:'5px'}}>
                                {
                                  paper_designs &&
                                  paper_designs.map((item) => (
                                      <Grid key={item.id} style={{width:'120px',marginRight:'15px',padding:'7px',backgroundColor:'white',display:'flex',border:'1px solid grey'}}>
                                          <img src={item.url} style={{width:'100%',height:'60px'}} />
                                      </Grid>
                                  ))
                                }
                    
                              </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{padding:'15px',marginTop:'30px'}}>
                            <textarea style={{width:'100%'}} rows={7}>
                               
                            </textarea>
                        </Grid>
                     </section>
                </section> 
                <section>
                  <h3> Delivery Details </h3>
                  <form onSubmit={handleGetShipping}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <FormControl style={{width:'100%'}}>
                          <label>Your name</label>
                          <input
                            type="text"
                            id='name'
                            name="name"
                            placeholder="Your name"
                            required
                            onChange={handleChange}
                            defaultValue={defaultAddress.name}
                          />
                        </FormControl>

                        <FormControl style={{width:'100%'}}>
                          <label>Mobile (For delivery updates)</label>
                          <input
                            type="text"
                            id='phone'
                            name="phone"
                            placeholder="Mobile number"
                            required
                            onChange={handleChange}
                            defaultValue={defaultAddress.phone}
                          />
                        </FormControl>
                        <FormControl style={{width:'100%'}}>
                          <label>Address line1</label>
                          <input
                            type="text"
                            id='adressline1'
                            name="address_1"
                            placeholder="Address line 1"
                            required
                            onChange={handleChange}
                            defaultValue={defaultAddress.address_1}
                          />
                        </FormControl>
                        <FormControl style={{width:'100%'}}>
                          <label>Country</label>
                          <select
                            style={{ height: " 48px",padding: "0px 24px",fontSize: "16px"}}
                            placeholder="Country"
                            id='country'
                            name="country_name"
                            required
                            onChange={handleCountrySelect}
                            defaultValue={defaultAddress.country_name}
                          >
                            {master_countries &&
                              master_countries.map((country) => (
                                <option
                                  value={country.name}
                                  key={country.id}
                                  selected={
                                    country.name === 'United Kingdom'
                                  }
                                >
                                  {country.name}
                                </option>
                              ))}
                          </select>
                        </FormControl>
                      </Grid>

                      <Grid item md={6}>
                        <FormControl style={{width:'100%'}}>
                          <label>Email adress</label>
                          <input
                            type="email"
                            id='email'
                            name="email"
                            placeholder="Email adress"
                            required
                            onChange={handleChange}
                            defaultValue={defaultAddress.email}
                          />
                        </FormControl>
                        <FormControl style={{width:'100%'}}>
                          <label>Secondary Mobile number</label>
                          <input
                            type="text"
                            id='secondary_phone'
                            name="secondary_phone"
                            placeholder="Secondary number"
                            onChange={handleChange}
                            defaultValue={defaultAddress.secondary_phone}
                          />
                        </FormControl>
                        <FormControl style={{width:'100%'}}>
                          <label>Address line2</label>
                          <input
                            type="text"
                            id='adressline2'
                            name="address_2"
                            placeholder="Address line 2"
                            onChange={handleChange}
                            defaultValue={defaultAddress.address_2}
                          />
                        </FormControl>
                        <Grid item container  style={{marginTop:'-3px'}}>
                             <Grid item md={6}>
                                  <FormControl  style={{width:'95%'}}>
                                  <label>City</label>
                                  {defaultAddress.country_name !== "Sri Lanka" && (
                                      <input
                                        type="text"
                                        id='city'
                                        name="city_name"
                                        placeholder="City name"
                                        required
                                        onChange={handleChange}
                                        defaultValue={defaultAddress.city_name}
                                      />
                                    )}
                                    {cityList &&
                                      defaultAddress.country_name === "Sri Lanka" && (
                                        <select  id='city' style={{ height: " 48px",padding: "0px 24px",fontSize: "16px"}}>
                                          {cityList &&
                                            cityList.map((city,index) => (
                                              <option value={city.name} key={index}>
                                                {city.name}
                                              </option>
                                            ))}
                                        </select>
                                      )}
                                  </FormControl>
                             </Grid>
                             <Grid item md={6}>
                                <FormControl style={{width:'95%'}}>
                                  <label>Post Code</label>
                                  <input
                                    type="text"
                                    id='postcode'
                                    placeholder="Post Code"
                                    name="postal_code"
                                    defaultValue={defaultAddress.postal_code}
                                  />
                                </FormControl>
                             </Grid>
                         </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                         <ActionButton type="submit" style={{backgroundColor:'white',color:'black',border:'1px solid',fontSize:'16px',width:'98%'}}>
                            DELIVER TO THIS ADDRESS
                         </ActionButton>
                      </Grid>  
                  </form>
                </section>
                <section>
                  <h3>Delivery Options</h3>
                  {(total != null && total != undefined) && 
                      <p style={{marginTop:'20px'}}>Express Delivery <span style={{marginLeft:'50px',fontWeight:'700'}}>
                       {`${currency.code} ${parseFloat((total.shipping_cost)* currency.rate).toFixed(2)}`} 
                      </span></p>
                  } 
                     {!shipping_services && (
                    <p>
                      Submit the delivery address to get the delivery options
                    </p>
                  )}
              
                    <Size>
                        <Grid item container spacing={0}>
                          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="" name="radio-buttons-group">
                          {shipping_services &&
                              shipping_services.map((shipping) => (
                                  <FormControlLabel key={shipping.name} value={shipping.name} control={<Radio />} label={shipping.name} onChange={() => calculateShipping(shipping)}/>
                                  ))}
                            </RadioGroup>
                          </Grid>
                    </Size>
                </section>

                <section>
                  <h3>Payment</h3>
                    <Size>
                        <Grid item container spacing={0}>
                          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                          {master_payment_types &&
                            master_payment_types.map((pay) => (
                                  <FormControlLabel key={pay.name} value={pay.code} control={<Radio />} label={pay.name} onChange={() => paymentselect(pay.code)}/>
                                  ))}
                            </RadioGroup>
                          </Grid>
                    </Size>
                </section>
                <p style={{fontWeight: "300",margin: "24px 0px",}}>
                   By placing your order, you agree to our &nbsp;
                  <strong>Terms & Conditions, Privacy Policy and Return Policies. </strong>
                </p>
                
                <ButtonPrimary onClick={handlePlaceOrder}>
                  PLACE ORDER
                </ButtonPrimary>
                
                <p>&nbsp;</p>
               </Grid>

              <Grid item md={4} style={{marginTop:'30px'}}>
                <CartTotal>
                  <Box
                    style={{display: "flex", justifyContent: "space-between", padding: "0px 0px 12px 0px", alignItems: "center"}}>
                    {items && items.length &&(`${items.length}`).length===1&&(
                      <p style={{color: "#444",fontSize: "25px", margin: 0,width: "100%", paddingBottom: "8px", }} >
                        0{items.length}&nbsp;Items
                      </p>
                    )}
                    {items && items.length &&(`${items.length}`).length>1&&(
                      <p style={{color: "#444",fontSize: "25px", margin: 0,width: "100%", paddingBottom: "8px", }} >
                        {items.length}&nbsp;Items
                      </p>
                    )}
                     {
                        currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
                        <a style={{fontSize: "16px",fontWeight: 300, display: "block", width: "200px", textAlign: "right",fontWeight:'bold'}}>Shop more</a>
                        </Link>:
                        <Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
                        <a style={{fontSize: "16px",fontWeight: 300,display: "block", width: "200px",textAlign: "right",fontWeight:'bold'}}>Shop more</a>
                        </Link>
                      }
                  </Box>

                  <Box
                    style={{ height: "300px",overflowY: "scroll",}}>
                    <table>
                      <thead></thead>
                      <tbody>
                      {items &&
                        items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img src={item.options.image} style={{ width: "100px",}} />
                            </td>
                            <td>
                              <ItemPrice style={{paddingLeft:'10px',color:'black',fontWeight: 'bold'}}>
                              {currency.code}{" "}
                                {parseFloat(
                                 item.price * currency.rate
                                ).toFixed(2)}
                              </ItemPrice>
                              <ItemName style={{fontSize:'14px',paddingLeft:'10px',color:'#666'}}>{item.name}</ItemName>

                              <p style={{fontSize:'14px',paddingLeft:'10px',color:'#666'}}>
                                {item.options.v_option1}
                              </p>
                              <p style={{fontSize:'14px',paddingLeft:'10px',color:'#666'}}>
                                Size:<span style={{fontWeight:'bold'}}>{item.options.v_option2}</span>
                              </p>
                              
                              <p style={{fontSize:'14px',paddingLeft:'10px',color:'#666'}}>
                                Qty:<span style={{fontWeight:'bold'}}>{item.qty}</span>
                              </p>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                  </Box>
                  {(total != null && total != undefined) &&(
                  <Box style={{marginTop:'15px'}}>
                    <Grid container style={{borderTop:'1px solid #bbaeae',paddingTop:'20px'}}>
                      <Grid item md={7} style={{fontSize: '18px',}}>
                        <p style={{marginBottom:'8px'}}>Sub Total</p>
                        <p style={{marginBottom:'8px'}}>Delivery</p>
                        {
                          total.coupon_discount===0?(null):<p style={{marginBottom:'8px'}}>Coupon Discount</p>
                        }
                        {
                          total.gift_card_discount===0?(null):<p style={{marginBottom:'8px'}}>Gift Card Discount</p>
                        }
                        {
                          total.loyalty_points_discount===0?(null):<p style={{marginBottom:'8px'}}>Loyalty Points Discount</p>
                        }
                        {
                          total.store_credits_discount===0?(null):<p style={{marginBottom:'8px'}}>Store Credits Discount</p>
                        }

                        <p style={{marginBottom:'8px',paddingTop:'8px',fontSize:'22px',fontWeight:'bold'}}>Total to Pay</p>
                      </Grid>
                      {(total != null && total != undefined) &&
                        <Grid item md={5} style={{fontSize: '18px',textAlign:'right'}}>
                          <p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat(total.cart_total * currency.rate).toFixed(2)}`}</p>
                          <p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat((total.shipping_cost)* currency.rate).toFixed(2)}`}</p>
                          {
                          total.coupon_discount===0?(null):<p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat(total.coupon_discount * currency.rate).toFixed(2)}`}</p>
                          }
                          {
                          total.gift_card_discount===0?(null):<p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat(total.gift_card_discount * currency.rate).toFixed(2)}`}</p>
                          }
                          {
                          total.loyalty_points_discount===0?(null):<p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat(total.loyalty_points_discount * currency.rate).toFixed(2)}`}</p>
                          }
                          {
                          total.store_credits_discount===0?(null):<p style={{marginBottom:'8px'}}>{`${currency.code} ${parseFloat(total.store_credits_discount * currency.rate).toFixed(2)}`}</p>
                          }
                          <p style={{marginBottom:'8px',paddingTop:'8px',fontSize:'22px',fontWeight:'bold'}}>{`${currency.code} ${parseFloat(total.grand_total * currency.rate).toFixed(2)}`}</p>
                        </Grid>
                      }
                    </Grid>           
                  </Box>
                  )}

                  {order && order.data && (
                    <>
                      <p>
                        Sub total - {order.data.currency_code}{" "}
                        {order.data.totals.cart_total}
                      </p>
                      <p>
                        Coupon discount - {order.data.totals.coupon_discount}
                      </p>
                      <p>
                        Shipping cost -{" "}
                        {order.data.totals.shipping_cost === 0 ? (
                          <>FREE</>
                        ) : (
                          order.data.totals.shipping_cost
                        )}
                      </p>
                      <h4>
                        Total to pay - {order.data.currency_code}{" "}
                        {order.data.totals.grand_total}
                      </h4>
                    </>
                  )}
                </CartTotal>
              </Grid>
            </Grid>
          </Container>
        </CheckoutWrapper>
      )}
    </>
  );
}

export default CheckoutPage;

export const getStaticProps = async () => {
  const response = await fetch(`${baseURL}/countries`);
  const payment = await fetch(`${baseURL}/payment/types`);
  const data = await response.json();
  const data2 = await payment.json();
  return {
    props: {
      master_countries: data.data.countries,
      master_payment_types: data2.data.payment_types,
    },
  };
};
