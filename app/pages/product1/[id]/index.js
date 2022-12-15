
import { FullImage } from "core/theme/styles/home.styled";
import { useRouter } from "next/router";
import { baseURL } from "core/constants/index";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
 
} from "node_modules/@material-ui/core/index";
import { styled } from '@mui/material/styles';
import {Rating} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatshotIcon from '@mui/icons-material/Whatshot';
//////////////////////////////////////////////////////////////////////////TAB

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Gift_slider from "components/_homepage/Slider_1";
import { Swiper, SwiperSlide} from "swiper/react";
import { HydrationProvider, Client } from "react-hydration-provider";
import "swiper/css";
import React from "react";
import {
  ProductPrice,
  ProductDescripton,
  ProductSKU,
  ProductTitle,

  Thumbnail_1,
  ProductDetails,
  AddToBag,
  BreadCrumb
  
} from "core/theme/styles/product.style";

import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";
import {CategoryTags} from "core/theme/styles/catetory.styled";
import Cart from "core/services/cart";
import { isAuthenticated} from "core/indentity/index";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import { useDispatch, useSelector } from "react-redux";
import { actionGetCart } from "core/redux/cart.actions";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import $ from 'jquery';
import {FormControl} from "node_modules/@material-ui/core/index";
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  width:'120px',
  height:'70px',
  textTransform: 'none',
  fontSize: 16,
  marginTop:'10px',
  marginLeft:'5px',
  padding: '6px 12px',
  color:'black',
  borderRadius:0,
  border: '1px solid',
  padding:'18px 0px 18px 0px',
  lineHeight: 1.5,
  backgroundColor: 'white',
  borderColor: '#bbb9b9',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderColor: 'black',
  },
  '&:focus': {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderColor: 'black',
  },
});


///////////////////////////////
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  marginBottom:30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#202430' : '#308fe8',
  },
}));


const products = ({ product, banners}) => {

        const dispatchAction = useDispatch();
        const currency = useSelector(state => state.master.currency);
        const route = useRouter();
        const [thumb, setThumb] = React.useState(0);
        const [swiper, setSwiper] = React.useState();
        //  const swiper = useSwiper();
        const thumbClick = (image,i) => {
          swiper.slideTo(i);
          setThumb(i);
          setImageid(image.id);
        };
        //image loading
        const [isLoading, setLoading] = React.useState(false);
      

        const Price = () => {

          return (
                <>
                  {currency && product.v_discounted_price !== "" && product.v_discount_percent !== 0 && (
                    <ProductPrice style={{fontSize:'25px'}}>
                      <span>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</span>
                      {`${currency.code} ${parseFloat(currency.rate * product.v_discounted_price).toFixed(2)}`}
                    </ProductPrice>
                  )}
                  {currency && product.v_discount_percent === 0 && (
                    <ProductPrice style={{fontSize:'25px'}}>{`${currency.code} ${parseFloat(product.v_regular_price * currency.rate).toFixed(2)}`}</ProductPrice>
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
                  <Link href={`/gift/${product.category_id}`}>
                    {route.query.category}
                  </Link>
                )}

                <Link href="/">{route.query.name}</Link>
              </BreadCrumb>
            </Container>
          </CategoryTags>
        );


      /////////////////////////select menu
      const [rate, setRate] = React.useState(0);
      const d = new Date();
       const temp=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
     
      const [payload, setPayload] = React.useState({
        recipient_name: "",
        recipient_email: "",
        sender_name: "",
        message: "",
        delivery_date: temp,
        sms_to_mobile:'',
        qty:1
      });
      const handlePayload=(e)=>{
        setPayload(prevState => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          }
        }
        );
      }

      const handleChange_1=(e)=>{
        setGift_card_delivery(e.target.value)
      }
//////////////////////////////////////////////////////////////////////////////////////////////
      const [vid, setVid] = React.useState('');
      const [imageid, setImageid] = React.useState('');
      const [gift_card_delivery, setGift_card_delivery] = React.useState('EMAIL');
      const [currentdate, setCurrentdate] = React.useState('');
      React.useEffect(() => {
        // if(product.is_gift_card!=1){
        //   history.back()
        // }
        if(product){
            setVid(product.variants[0].v_id);
            setImageid(product.v_image_id);
            const d = new Date();
            const temp=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
            setCurrentdate(temp);
        }
     
      }, [product]);
///////////////////////////////////////////
     //handle add to cart
     const handleAddToCart = (item) => {
      
  
      setLoading(true);
      isAuthenticated().then((response) => {
          if (response) {
              setLoading(false);
              if(gift_card_delivery=='EMAIL'){
                const date = payload.delivery_date.split("-");
                const currentdate=date[2]+'/'+date[1]+'/'+date[0];
                const data={
                  variant:vid,
                  gift_card_img_id:imageid,
                  gift_card_delivery:gift_card_delivery,
                  recipient_name:payload.recipient_name,
                  recipient_email:payload.recipient_email,
                  sender_name:payload.sender_name,
                  message:payload.message,
                  delivery_date:currentdate,
                  qty:payload.qty,
                  
                }
                Cart.add(data).then((response) => {
                  AlertSuccess(response.data.message);
                  dispatchAction(actionGetCart());
                });
            }else{
              const date = payload.delivery_date.split("-");
               const currentdate=date[2]+'/'+date[1]+'/'+date[0];
              const data={
                variant:vid,
                gift_card_img_id:imageid,
                gift_card_delivery:gift_card_delivery,
                sms_from_name:payload.recipient_name,
                sms_to_mobile:payload.sms_to_mobile,
                sender_name:payload.sender_name,
                sms_message:payload.message,
                delivery_date:currentdate,
                qty:payload.qty
              }
              Cart.add(data).then((response) => {
                AlertSuccess(response.data.message);
                dispatchAction(actionGetCart());
              });
            }
          
         
          } 
      });
  };
    const [img_url, setImg_url] = React.useState('../../images/background.jpg');
    const [img_data, setImg_data] = React.useState('');
    const [flag_1, setFlag_1] = React.useState(false);
    const sheetopen=()=>{
     setFlag_1(true);
    }
    const sheetclose=()=>{
      setFlag_1(false);
    }
    const [show, setShow] = React.useState(false)
    const file_change=()=>{
      const file=document.getElementById('file').files[0];
      if(file.type.split("/")[0]=='video'){
        setShow(true);
        let fileReader= new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            const imgstr=fileReader.result;
            $('#cus_img').attr('src',imgstr);
            setImg_data(imgstr);     
           }
      }else{
        setShow(false);
        let fileReader= new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            const imgstr=fileReader.result;
            $('#cus_img').attr('src',imgstr);
            setImg_data(imgstr);     
           }
      }
     
    }
   
    const imagefileupload=()=>{
         setLoading(true);
         isAuthenticated().then((response) => {
          if (response) {
              setLoading(false);

            if(gift_card_delivery=='EMAIL'){
              const date = payload.delivery_date.split("-");
              const currentdate=date[2]+'/'+date[1]+'/'+date[0];
              const data={
                      variant:vid,
                      gift_card_img_id:-1,
                      gift_card_img_str:img_data,
                      gift_card_delivery:gift_card_delivery,
                      recipient_name:payload.recipient_name,
                      recipient_email:payload.recipient_email,
                      sender_name:payload.sender_name,
                      message:payload.message,
                      delivery_date:currentdate,
                      qty:payload.qty,
                      gift_card_custom_price:$('#customprice').val()
              }
              Cart.add(data).then((response) => {
                AlertSuccess(response.data.message);
                dispatchAction(actionGetCart());
              });
          }else{
            const date = payload.delivery_date.split("-");
            const currentdate=date[2]+'/'+date[1]+'/'+date[0];
            const data={
              variant:vid,
              gift_card_img_id:-1,
              gift_card_img_str:img_data,
              gift_card_delivery:gift_card_delivery,
              sms_from_name:payload.recipient_name,
              sms_to_mobile:payload.sms_to_mobile,
              sender_name:payload.sender_name,
              sms_message:payload.message,
              delivery_date:currentdate,
              qty:payload.qty,
              gift_card_custom_price:$('#customprice').val()
            }
            Cart.add(data).then((response) => {
              AlertSuccess(response.data.message);
              dispatchAction(actionGetCart());
            });
          }
        }
         });
       }
       const videofileupload=()=>{
        setLoading(true);
        isAuthenticated().then((response) => {
            if (response) {
                      setLoading(false);
                    
                      const data={gc_video_file:document.getElementById('file').files[0]}  
                      Cart.video(data).then((response) => {
                        AlertSuccess(response.data.message);
                        dispatchAction(actionGetCart());
                            if(gift_card_delivery=='EMAIL'){
                              const date = payload.delivery_date.split("-");
                              const currentdate=date[2]+'/'+date[1]+'/'+date[0];
                              const data={
                                variant:vid,
                                gift_card_video_path:response.data.data.file_path,
                                gift_card_delivery:gift_card_delivery,
                                recipient_name:payload.recipient_name,
                                recipient_email:payload.recipient_email,
                                sender_name:payload.sender_name,
                                message:payload.message,
                                delivery_date:currentdate,
                                qty:payload.qty,
                                gift_card_custom_price:$('#customprice').val()
                              }
                              Cart.add(data).then((response) => {
                                AlertSuccess(response.data.message);
                                dispatchAction(actionGetCart());
                              });
                          }else{
                            const date = payload.delivery_date.split("-");
                            const currentdate=date[2]+'/'+date[1]+'/'+date[0];
                            const data={
                              variant:vid,
                              gift_card_video_path:response.data.data.file_path,
                              gift_card_delivery:gift_card_delivery,
                              sms_from_name:payload.recipient_name,
                              sms_to_mobile:payload.sms_to_mobile,
                              sender_name:payload.sender_name,
                              sms_message:payload.message,
                              delivery_date:currentdate,
                              qty:payload.qty,
                              gift_card_custom_price:$('#customprice').val()
                            }
                            Cart.add(data).then((response) => {
                              AlertSuccess(response.data.message);
                              dispatchAction(actionGetCart());
                            });
                          }
                      });
             } 
         });
        
        }
        const [customprice, setCustomprice] = React.useState(false);
        const priceselect=()=>{
          setCustomprice(true)
        }
        return (

          <>
           <HydrationProvider>
              <Client>
            <PageHeader />
            <Container disableGutters={true}>
              <Grid container spacing={0} direction="row" justifyContent="center">
                   
                    <Grid item md={6}>
                        <Stack direction="row" style={{paddingRight:'40px'}}>
                        
                            <Swiper spaceBetween={0} slidesPerView={1} onInit={(e) => {setSwiper(e);}}>
                              {product.images.map((image) => (
                                <SwiperSlide key={image.id}>
                                  <FullImage src={image.url} />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                        </Stack>
                        <Stack direction='row'>
                                {product.images.map((image, i) => (
                                  <Thumbnail_1 key={image.id} onClick={() => thumbClick(image,i)} className={i===thumb? "active":""}>
                                    <FullImage src={image.url} showLoading={true} />
                                  </Thumbnail_1>
                                ))}
                                <Thumbnail_1 style={{backgroundColor:'#faf8ff',height:'67px',marginTop:'5px',width:'120px',border:'1px solid',textAlign:'center'}} onClick={()=>sheetopen()}>
                                    <p style={{marginTop:'10px'}}>Upload Custom <br/>Design</p>
                                </Thumbnail_1>
                          
                        </Stack>
                        {
                          flag_1===true?
                          <Stack direction='row' fullwidth style={{backgroundColor:'#faf8ff',marginTop:'5px',width:'600px',padding:'15px'}}>
                              <Grid container>
                                   <Grid item md={11}>Upload Custom Design</Grid>
                                   <Grid item md={1}><CloseIcon onClick={()=>sheetclose()}/></Grid>
                                   <Grid item md={12} style={{marginTop:'20px'}}>qweqweqwewqewqeqweqwewqeqwewew</Grid>
                                   <Grid item md={6} style={{marginTop:'20px',float:'right'}}>
                                         <button type='button' style={{marginLeft:'120px',padding:'5px 10px',width:'150px',height:'35px',backgroundColor:'white'}} onClick={() =>imagefileupload()}>UPLOAD IMAGE</button>
                                   </Grid>
                                   <Grid item md={6} style={{marginTop:'20px'}}>
                                          <button type='button' style={{padding:'5px 10px',width:'150px',height:'35px',backgroundColor:'white'}} onClick={() =>videofileupload()}>UPLOAD VIDEO</button>
                                   </Grid>
                                   <Grid item md={12} style={{textAlign:'center',marginBottom:'10px'}}>
                                    {
                                      show===(false)?<img id='cus_img' style={{width:'210px',height:'210px',marginTop:'20px'}} src={`${img_url}`}/>:<video id='cus_img' controls style={{width:'210px',height:'210px',marginTop:'20px'}} src={`${img_url}`} />
                                    }
                                       
                                   </Grid>
                                   <Grid item md={12} state={{textAlign:'center'}}>
                                      <center>
                                        <div>
                                          <button style={{width:'210px',fontSize:'13px',padding:'0px',height:'35px',backgroundColor:'#4a5274',color:'white'}} onClick={() =>fileupload()}>CONTINUE WITH THIS DESIGN</button>
                                        </div>
                                       <div style={{marginTop:'-35px'}}><input type='file' id='file' style={{width:'200px',height:'35px',opacity:'0'}} onChange={()=>file_change()}/></div>
                                       
                                     </center>
                                   </Grid>
                              </Grid>
                          </Stack>:(null)
                        }
                    </Grid>
              
                    <Grid item md={6} style={{paddingLeft:'0px'}}>
                        <ProductDetails style={{padding:'0px'}}>
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductSKU>SKU : {product.sku}</ProductSKU>
                            <p style={{fontSize:'18px',marginTop:'31px'}}>Select Amount</p>

                            
                            {
                              customprice===false?
                               <BootstrapButton variant="contained" disableRipple  onClick={()=>priceselect()}>
                                 <p style={{fontSize:'14px'}}>Custom <br /> Price</p>
                               </BootstrapButton>:
                                <BootstrapButton style={{height:'70px'}} variant="contained" disableRipple  onClick={()=>priceselect()}>
                                <p style={{fontSize:'12px'}}>Custom <br /> Price <br/><input type='number' id='customprice' defaultValue={1000} style={{width:'120px',height:'30px'}}/></p>
                               
                                </BootstrapButton>
                            }
                            
                            {
                              product.variants.map((item) => (
                                <BootstrapButton key={item.v_id} item={item.v_id} variant="contained" disableRipple>
                                {
                                currency===null?<p style={{fontSize:'14px'}}>LKR <br />{item.v_discounted_price}</p>:<p style={{fontSize:'14px'}}>{currency.code} <br />{(parseFloat(item.v_discounted_price) * currency.rate).toFixed(2)}</p>
                                  
                                }  
                               </BootstrapButton>
                              ))
                            }
                           
                            <p style={{marginTop:'30px',fontSize:'18px'}}>Delivery Option</p>
                            <RadioGroup style={{marginTop:'7px'}}  row  aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={gift_card_delivery} onChange={handleChange_1}>
                                <FormControlLabel value="EMAIL" control={<Radio />} label="Send as an Email" />
                                <FormControlLabel value="SMS" control={<Radio />} label="Send as a Text Message" />
                            </RadioGroup>
                            <Grid container style={{backgroundColor:'#faf8ff',padding:'20px 20px'}}>
                                <Grid item md={6}>
                                    <FormControl fullWidth style={{paddingRight:'7.5px'}}>
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Recipient Name</label>
                                      <input onChange={handlePayload}
                                        name='recipient_name'
                                        style={{fontSize:'16px',height:'50px'}}
                                        type="text" />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6}>
                                  {
                                    gift_card_delivery==='EMAIL'?
                                    <FormControl fullWidth style={{paddingLeft:'7.5px'}}>
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Recipient Email Address</label>
                                      <input onChange={handlePayload}
                                        name='recipient_email'
                                        style={{fontSize:'16px',height:'50px'}}
                                        type="text" />
                                    </FormControl>:
                                    <FormControl fullWidth style={{paddingLeft:'7.5px'}}>
                                    <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Mobile Adress</label>
                                    <input onChange={handlePayload}
                                      name='sms_to_mobile'
                                      style={{fontSize:'16px',height:'50px'}}
                                      type="text" />
                                  </FormControl>
                                  }
                                    
                                </Grid>
                                <Grid item md={12} style={{marginTop:'10px'}}>
                                    <FormControl fullWidth >
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Sender Name</label>
                                      <input onChange={handlePayload}
                                        name='sender_name'
                                        style={{fontSize:'16px',height:'50px'}}
                                        type="text" />
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} style={{marginTop:'10px'}}>
                                    <FormControl fullWidth >
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Message</label>
                                      <textarea onChange={handlePayload}
                                        name='message'
                                        rows={10}
                                        style={{fontSize:'16px',height:'100px'}}
                                        >
                                      </textarea>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} style={{marginTop:'10px'}}>
                                    <FormControl fullWidth >
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Delivery Date</label>
                                      <input onChange={handlePayload}
                                        name='delivery_date'
                                        defaultValue={currentdate}
                                        style={{fontSize:'16px',height:'50px'}}
                                        type="date" />
                                    </FormControl>
                                </Grid>
                              </Grid>
                              <Grid container style={{padding:'10px 20px'}}>
                                <Grid item md={6}>
                                    <FormControl fullWidth style={{paddingRight:'7.5px'}}>
                                      <label style={{fontSize:'16px',marginBottom:'10px',color:'grey'}}>Quantity</label>
                                      <input onChange={handlePayload}
                                        name='qty'
                                        defaultValue={payload.qty}
                                        style={{fontSize:'16px',height:'50px'}}
                                        type="number" />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} style={{paddingTop:'5px'}}>
                                    <AddToBag style={{width:'200px'}} onClick={() => handleAddToCart(product)}>
                                      {isLoading && (
                                        <>
                                          <CircularProgress color="secondary" size="16px" />
                                          &nbsp;
                                        </>
                                      )}
                                      ADD TO BAG
                                    </AddToBag>
                                </Grid>
                              </Grid>
                              <div style={{marginTop:'-5px'}}>
                                <div style={{float:'left',marginTop:'10px'}}><span style={{fontSize:'14px'}}>Share on :</span></div>
                                    <a href="https://www.facebook.com/LoveKellyFelder/test" style={{ marginRight: '10px' }}><img src='../../images/facebook.png' style={{width:'35px'}} /></a>
                                    <a href="https://twitter.com/lovekellyfelder?lang=fr" style={{ marginRight: '10px' }}><img src='../../images/twitter.png' style={{width:'35px'}} /></a>
                                    <a href="https://www.instagram.com/lovekellyfelder/?hl=en" style={{ marginRight: '10px' }}><img src='../../images/instagram.png' style={{width:'35px'}} /></a>
                                    <a href="+94 77 422 67773" style={{ marginRight: '10px' }}><img src='../../images/whatsapp.png' style={{width:'35px'}} /></a> 
                              </div>
                        </ProductDetails>
                  </Grid>
                
              </Grid>
              <Grid container spacing={0} direction="row" justifyContent="center" style={{marginTop:'20px'}}>
                  <Grid item md={6}>
                      <ProductDescripton>
                        <Typography variant="h5">Product Description</Typography>
                          <div dangerouslySetInnerHTML={{ __html: product.description }} />
                      </ProductDescripton>
                  </Grid>
                  <Grid item md={6}>
                       <ProductDescripton>
                        <Typography variant="h5">Shopping & Return Policy</Typography>
                          
                            <ul>
                                <li>
                                We usually deliver within 4-6 working days of placement of the order.For orders with multiple items and different delivery times, the longest delivery time applies.
                                </li>
                                <li>
                                We would like you to have complete peace of mind when buying products form kellyfelder.com. You can return all items within 14 days of receipt for a full reload of the item purchased. The refund amount will be credited back to your KellyFelder account as store credits of credit points...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Link href='/policy.html' target='_blank' ><p style={{color:'black'}}>+view more</p></Link>
                                </li>
                            </ul>
                             
                      </ProductDescripton>
                  </Grid>
              </Grid>

              <Grid container spacing={0} direction="row" justifyContent="center" style={{marginTop:'20px'}}>
                  <Grid  container style={{marginTop:'20px'}}>
                    <p style={{fontSize:'18px'}}>Reviews({product.reviews.length})</p>
                  </Grid>
                  <Grid  container style={{marginTop:'10px',padding:'20px 15px 0px 25px',backgroundColor:'#f6f6f6'}}>
                      <Grid item md={4}>
                          <p style={{color:'#262b35',fontWeight: '700',marginBottom: '10px',marginTop:'10px'}}>Average Rating</p>
                          <Rating name="half-rating-read" defaultValue={eval(product.avg_rating)} precision={0.5} readOnly />
                          <div style={{marginLeft:'5%',marginTop:'-23px',marginLeft:'35%'}}>
                            <span style={{color:'#262b35',fontWeight: '700',fontSize:'20px'}}>{product.avg_rating}</span>
                          </div>
                      </Grid>
                      <Grid item md={4}>
                            <Grid item container>
                              <p style={{fontWeight:'700',color:'#262b35'}}>Did the item fit well?</p>
                            </Grid>
                            <Grid item container>
                                <Grid item md={3}>
                                    <p style={{marginBottom:'15px',marginTop:'23px',color:'#9b9b9b'}}>Small</p>
                                    <p style={{marginBottom:'15px',color:'#9b9b9b'}}>True to size</p>
                                    <p style={{color:'#9b9b9b'}}>Large</p>
                                </Grid>
                                <Grid item md={5} style={{paddingTop:'30px'}}>
                                  <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_large} />
                                  <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_perfect} />
                                  <BorderLinearProgress variant="determinate" value={product.product_fit.product_fit_small} />
                                </Grid>
                                <Grid item md={4} style={{paddingLeft:'10px'}}>
                                    <p style={{marginBottom:'17px',marginTop:'27px',color:'#9b9b9b'}}>{product.product_fit.product_fit_large} %</p>
                                    <p style={{marginBottom:'17px',color:'#9b9b9b'}}>{product.product_fit.product_fit_perfect} %</p>
                                    <p style={{color:'#9b9b9b'}}>{product.product_fit.product_fit_small} %</p>
                                </Grid>
                              </Grid> 
                         </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={0} direction="row" justifyContent="center" style={{marginTop:'10px'}}>
                  <Grid item container style={{marginTop:'15px'}}>
                        <Grid item md={10}></Grid>
                        <Grid item md={2} style={{marginTop:'0px',zIndex:'100',paddingBottom:'10px'}}>
{/*                           
                                <div style={{float:'left',marginTop:'5px',fontSize:'16px',marginRight:'10px'}}><span>Sort by </span></div>
                                <FormControl >
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={10}
                                      style={{height:'30px',width:'100px'}}
                                      // onChange={handleChange_sort}
                                    >
                                      <MenuItem value={10}>new</MenuItem>
                                      <MenuItem value={20}>old</MenuItem>
                                    </Select>
                                </FormControl> */}
                   
                        </Grid>
                  </Grid>
                  <Grid item container  style={{marginTop:'-20px'}}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                                  <p style={{fontSize:'25px',fontWeight:'700'}}>All Reviews ({product.reviews.length})</p>
                         </Box>
                             
                                  <table style={{width:'100%'}}>
                                          <thead></thead>
                                        
                                          <tbody>
                                          {
                                          product.reviews.map((item)=>
                                              (
                                                <tr key={item.id} style={{paddingBottom:'10px'}}>
                                                  <td style={{width:'15%',fontSize: '20px'}}>
                                                     <p style={{fontSize: '18px',fontWeight: '700',marginBottom: '10px',marginTop:'-40px'}}><span style={{padding:'7px 10px',marginRight:'10px',backgroundColor:'#e9dddd',borderRadius:'50%',color:'#c1a5a5'}}>{item.customer.name.slice(0,1)}</span>{item.customer.name} </p>
                                                  </td>
                                                  <td style={{width:'60%'}}>
                                                      <Rating style={{marginTop:'-40px'}} name="half-rating-read" defaultValue={eval(item.rating)} precision={0.5} readOnly />
                                                      <p style={{fontSize:'16px'}}>{item.content}</p>
                                                  </td>
                                                  <td style={{textAlign:'center',fontSize:'16px'}}>
                                                    {item.created_at.slice(0,10)}
                                                  </td>
                                                  
                                              </tr>
                                              )
                                          )
                                          }
                                          </tbody>
                                        </table>
                             
                         
                  </Grid>
                  <Grid  container style={{textAlign:'center',fontSize:'20px',backgroundColor:'#f9f8f8',padding:'15px 25px 15px 25px'}}>
                        <Grid item md={4}></Grid>
                        <Grid item md={4}><p style={{fontSize:'25px'}}>Customers Also Views</p></Grid>
                        <Grid item md={4}></Grid>
                      
                     <Gift_slider gift_data={product.similar_products}  currency={currency}/>
                   
                  </Grid>
                </Grid> 
            </Container>
        </Client>
    </HydrationProvider>
       
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
