import React from 'react'
import Profile from './index'
import Profile1 from "core/services/profile";
import { MyOrderContainer } from 'core/theme/styles/profile.styled'
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import {Box,FormControl,Grid,RadioGroup,FormLabel,FormControlLabel, Radio,} from "node_modules/@material-ui/core/index";
function points() {

  const calender=['January','February','March','April','May','June','July','August','September','Ocober','November','December'];
  const [value, set_value] = useState({});
  const [value1, set_value1] = useState([]);
    React.useEffect(() => {
     
      Profile1.points().then((response) => {
          set_value(response.data.data);
          set_value1( response.data.data.loyalty_point_groups)
      })
      .catch((e)=>{
          console.log(e)
      })
    
    
  }, []);

  return (
    <Profile>
        <MyOrderContainer style={{marginBottom:"12px",}}>
          <p style={{fontSize:'25px'}}>Store Credits / Angel Points</p>
        </MyOrderContainer>
        <MyOrderContainer style={{ height:'600px',overflowY:'auto'}}>
           <Grid container style={{marginTop:'-10px'}}>
           
                <Grid item md={12} style={{padding:'5px 10px'}}>
                    <p style={{fontSize:'18px',color:'grey'}}>Redeem your points against the total bill whenever you do purchases.</p>
                </Grid>
                <Grid item md={2} style={{paddingRight:'0px'}}>
                    <Grid  style={{backgroundColor:'white',borderRadius:'50%',height:'90px',width:'90px'}}>
                        <img src='../../images/hand.png'  style={{width:'55%',marginLeft:'20px',marginTop:'20px'}} />
                      </Grid>
                </Grid>
                <Grid item md={10} style={{paddingLeft:'0px'}}>
                   <Grid container item style={{paddingLeft:'0px',paddingTop:'0px'}}>
                        <Grid item md={5} style={{paddingLeft:'0px'}}>
                            <p style={{fontSize:'25px',fontWeight:'bold'}}>Store Credit</p>
                        </Grid>
                        <Grid item md={6} style={{paddingRight:'0px',marginLeft:'-45px'}}>
                            <p style={{fontSize:'25px',fontWeight:'bold'}}>:&nbsp;{eval(value.store_credits)}&nbsp;Points</p>
                        </Grid>
                    </Grid>
                </Grid>
           </Grid>
           <Grid container style={{marginTop:'-40px'}}>
                <Grid item md={2} style={{paddingRight:'0px'}}>
                    <Grid  style={{backgroundColor:'white',borderRadius:'50%',height:'90px',width:'90px'}}>
                         <img src='../../images/bird.png'  style={{width:'55%',marginLeft:'20px',marginTop:'30px'}} />
                   </Grid>
                </Grid>
                <Grid item md={10} style={{padding:'0px'}}>
                   <Grid container item  style={{padding:'0px'}}>
                      <Grid item md={5} style={{paddingLeft:'0px'}}>
                          <h3 style={{marginTop:'25px',marginBottom:'30px',fontSize:'25px',fontWeight:'bold'}}>Total Angel Point</h3>
                          {
                             value1.map((item)=>(
                              <>
                                  <h3 key={item.order_id} style={{fontSize:'25px',fontWeight:'bold'}}>Angel Point</h3>
                                  <p style={{marginTop:'5px',color:'grey',marginBottom:'20px'}}>Expires on</p>
                              </>
                             ))
                          }
                         
                      </Grid>
                      <Grid item md={6} style={{marginLeft:'-40px',marginTop:'25px',paddingLeft:'0px'}}>
                          <h3 style={{fontSize:'25px',marginBottom:'30px'}}>:&nbsp;{eval(value.total_redeemable_loyalty_points)}&nbsp;Points</h3>
                        {
                          value1.map((item)=>(
                            <>
                                <h3 style={{fontSize:'25px'}}>:&nbsp;{eval(item.points_earned)}&nbsp;Points</h3 >
                                <p style={{marginTop:'5px',color:'grey',marginBottom:'20px'}}>:&nbsp;{item.expire_at.slice(8,10)}&nbsp;{calender[(parseFloat(item.expire_at.slice(5,7))-1)]}&nbsp;{item.expire_at.slice(0,4)}</p>
                            </>
                          ))
                        }
                      </Grid>
                   </Grid>
                      
                     
                      
                      
                </Grid>
           </Grid>
        </MyOrderContainer>
    </Profile>
  )
}

export default points