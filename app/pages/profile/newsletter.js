import React from "react";
import ActionButton from "components/ActionButton/index";
import {  useSelector } from "react-redux";
import Profile from "core/services/profile";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import ProfileList from "./index";
import { Form } from "core/theme/styles/auth.styled";
import { Grid, Box,FormControl,} from "node_modules/@material-ui/core/index";
import { MyOrderContainer } from "core/theme/styles/profile.styled";

function Newsletter() {
    const { data} = useSelector((state) => state.auth.user);
    const [sbuscribe,setSubscribe]=React.useState(null);
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
      if(data){
        if (data.profile.subscribed_email===(null)){
          setSubscribe('');
        }else{
          setSubscribe(data.profile.subscribed_email)
        }
      }   
    },[data]);

    const handlechange=(e)=>{
      setEmail(e.target.value);
      
    }
    const subscribed=()=>{
        let re = /\S+@\S+\.\S+/;
        if (re.test(email)) {
          let payload={
            email:email
          }
          Profile.newsletter(payload).then((response) => {
            setSubscribe('XX');
            AlertSuccess(response.data.message);
            })
            .catch((e)=>{
                console.log(e)
            })
        }else{
          AlertError('Form error,please try again!')
        }
    }
    const unsubscribed=()=>{
        let payload={
          email:''
        }
        Profile.newsletter(payload).then((response) => {
          setSubscribe('');
          AlertSuccess(response.data.message);
          })
          .catch((e)=>{
              console.log(e)
          })
   }
      return (
        <ProfileList>
                <MyOrderContainer style={{ height:'90px',marginBottom:'10px' }}>
                  <h2 style={{marginTop:'0px'}}>Newsletter Subscription</h2>
                </MyOrderContainer>
                     
                  <MyOrderContainer style={{height:'500px'}}>
                    {
                      sbuscribe!==''?
                      <Box style={{height:'283px',}}>
                           <p style={{fontSize:'18px',color:'#666'}}>You have subscribed to our newsletter. We hope you enjoy our news. We never motivate and we feel sorry people to leave us. But, click below if you really want to go off.</p>
                          <Form >
                              <Grid item md={6} style={{paddingLeft:'0px'}}>
                                <FormControl fullWidth>
                                    <ActionButton onClick={unsubscribed}  style={{margin:'0px',width:'auto'}} >UNSUBSCRIBE</ActionButton>
                                </FormControl>
                              </Grid>
                          </Form>
                      </Box>:
                      <Box style={{height:'283px',}}>
                          <p style={{fontSize:'18px',color:'#666'}}>It seems you still have not subscribed to our newsletter.Don't worry.We don't sell your information to any third party. But we let you know about latest offers, new products etc...</p>
                          
                          <Form >
                              <Grid item md={6} style={{paddingLeft:'0px'}}>
                                <FormControl fullWidth>
                                    <label>Your Email Address</label>
                                    <input onChange={handlechange}  type="email" required defaultValue={email}></input>
                                </FormControl>
                                <FormControl fullWidth>
                                    <ActionButton onClick={subscribed}  style={{margin:'0px',width:'auto',marginTop:'-15px'}} >SUBSCRIBE</ActionButton>
                                </FormControl>
                              </Grid>
                            </Form>
                        </Box>
                    }
                    
                  </MyOrderContainer>
        </ProfileList>
      );
    }

    export default Newsletter;
