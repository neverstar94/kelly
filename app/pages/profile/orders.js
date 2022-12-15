import { MyOrderContainer } from 'core/theme/styles/profile.styled'
import { Box, Grid } from 'node_modules/@material-ui/core/index'
import * as React from "react";
import Profile from './index'
import Profile1 from "core/services/profile";
import Button from '@mui/material/Button';
import Link from "node_modules/next/link";
import { ErrorModal, SuccessModal } from "components/MessageModal/index";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { ButtonOutlined,} from "core/theme/styles/card.styled";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";

function orders() {

  
  const [open, setModal] = React.useState(false);
  const [success, setModalSuccess] = React.useState(false);
  const [message, setModalMessage] = React.useState({
    title: "",
    message: "Please login to continue",
  });
  const currency = useSelector((state) => state.master.currency);
  const [value, set_value] = useState([]);
  const calender=['January','February','March','April','May','June','July','August','September','Ocober','November','December'];
  React.useEffect(() => {
     
      Profile1.orders().then((response) => {
          set_value(response.data.data.orders.data);
         
      })
      .catch((e)=>{
          console.log(e)
      })
    
    
  }, []);

  const messageshow=(()=>{
  
     setModalSuccess(true);
     setModalMessage({
      title: "",
      message: 'Please wait untill the order is shipped. You can track your order with the shipment number.',
    });
  })
  const messageshow1=((value)=>{
  
    setModalSuccess(true);
    setModalMessage({
     title: "",
     message: 'Tracking No:'+value,
   });
 })
  const handleClose = () => {
    setModal(false);
  };

  const handleCloseSuccess = () => {
    setModalSuccess(false);
  };
  const confirmreceipt = (value) => {
    Profile1.confirmreceipt(value).then((response) => {
      AlertSuccess(response.data.message);
      console.log(response.data,'123456789')
       })
       .catch((e)=>{
           console.log(e)
       })
  }
  return (
      <Profile>
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
      <MyOrderContainer style={{marginBottom:"12px",}}>
        <h2> My Orders</h2>
      </MyOrderContainer>
      
        {value.length === 0 &&  (
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
           <h4 style={{marginBottom:'30px',marginTop:'20px'}}>Nothing in the orders at the moment.</h4>
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
         </MyOrderContainer>
        )}
     {value && value.length > 0 && (
         <MyOrderContainer  style={{ height:'600px',overflowY:'auto'}}>

        {
           value.map((item) => (
            <>
              <Box key={item.id} style={{display: "flex",justifyContent: "space-between",alignItems:"center"}}>
                  <Box>
                    <h2><strong>Order ID : {item.id}</strong></h2>
                    
                    {
                        currency &&  <p style={{fontWeight:'500',fontSize:'15px',marginTop:'10px'}}> {currency.code }&nbsp; {(eval(item.total_price.replace(',', ''))*currency.rate).toFixed(2)}&nbsp;&nbsp;|<span style={{color: "#666"}}>&nbsp;&nbsp;{item.created_at.slice(8,10)}&nbsp;{calender[(parseFloat(item.created_at.slice(5,7))-1)]}&nbsp;{item.created_at.slice(0,4)}</span></p>
                    }
                   
                  </Box>
                  <Box style={{ background:"#fed8be",color: "#bd8661",marginTop:'15px', width: "120px",height: "30px",fontSize: "14px",textAlign: "center", paddingTop: "6px",borderRadius:"2px",display:'block'}}>
                  {item.order_status}
                    <div style={{marginTop:'40px',background:"#06bdde",color: "white", width: "120px",height: "30px",fontSize: "14px",textAlign: "center", paddingTop: "6px",borderRadius:"2px",display:'block'} }>{item.payment_status}</div>
                  </Box>
                  
              </Box>

              <Grid container>
                 {
                  item.order_items.map((item0,index) => (
                    <Grid key={index} item md={5} style={{padding:0, display:"flex", justifyContent:"flex-start", marginTop:"10px",marginBottom:'20px'}}>
                        <img width="100" src={`${item0.variant.v_image_url}`}/>
                        <Box style={{fontSize:'12px',color:'grey'}}>
                            <p style={{padding:0, margin:"0px 0px 0px 12px", color:"#666",marginBottom:'5px'}}>{item0.product_name}</p>
                            <p style={{padding:0, margin:"0px 0px 0px 12px", color:"#666",marginBottom:'5px'}}>{item0.options}</p>
                            <p style={{padding:0, margin:"0px 0px 0px 12px", color:"#666"}}>{currency.code }&nbsp; {(eval(item0.unit_price.replace(',', ''))*currency.rate).toFixed(2)}</p>
                            
                        </Box>
                    </Grid>
                 ))}
              </Grid>
              <Box  style={{display: "flex",marginBottom:'30px'}}>
                  <Button style={{backgroundColor:'#e8e5ed',color:'black',marginRight:'15px',height:'30px'}}><img src='../../images/icon_1.png' />&nbsp;DETAILS</Button>
            
                  {
                    item.shipment_tracking_no===null? <Button  onClick={()=>messageshow()}  style={{backgroundColor:'#e8e5ed',color:'black',marginRight:'15px',height:'30px'}}><img src='../../images/icon_2.png' />&nbsp;TRACK ORDER</Button>: <Button  onClick={()=>messageshow1(item.shipment_tracking_no)} style={{backgroundColor:'#e8e5ed',color:'black',marginRight:'15px',height:'30px'}}><img src='../../images/icon_2.png' />&nbsp;TRACK ORDER</Button>
                  }
                  
                  <Button style={{backgroundColor:'#e8e5ed',color:'black',marginRight:'15px',height:'30px'}} onClick={()=>confirmreceipt(item.id)}><img src='../../images/icon_3.png' />&nbsp;CONFIRM RECEIPT</Button>
                  <Button style={{backgroundColor:'#e8e5ed',color:'black',height:'30px'}}><img src='../../images/icon_4.png' />&nbsp;WRITE A REVIEW</Button>
              </Box>
            </>
           ))
          } 
         </MyOrderContainer>
      )}
    </Profile>
  )
}

export default orders