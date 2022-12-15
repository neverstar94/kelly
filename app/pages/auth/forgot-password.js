import ActionButton from "components/ActionButton/index";
import { getCurrentURL, setToken } from "core/indentity/index";
import { AlertSuccess, AlertError } from "core/plugins/kelly-toast";
import { actionGetUser,  } from "core/redux/auth.actions";
import Auth from "core/services/auth";
import { AuthWrapper, Form,} from "core/theme/styles/auth.styled";
import {FormControl,} from "node_modules/@material-ui/core/index";
import { useRouter } from "node_modules/next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';

function ForgotPassword() {

  const router = useRouter();
  const [payload, setPayload] = useState({
    email: ""
  });
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [alert, setAlert] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [flag, setFlag] = React.useState(false);
  const [totalflag, setTotalflag] = React.useState(false);

  function redirect() {
    getCurrentURL().then((url) => {
      if (url) {
        window.location = url;
      } else {
        router.push("/cart");
      }
    });
  }

 
  // handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    Auth.login(payload).then((response) => {
      if (response.data.status) {
         AlertSuccess("Login successful !");
        dispatch(actionGetUser());
        setToken(response.data.data.authorisation.token);
        setLoading(false);
        setAlert(true);
       
        redirect();
      } else {
         AlertError("Login failed, Please try again !");
        setLoading(false);
        setAlert(false);
      }
    });
  };
  React.useEffect(() => {
    if (user.data) {
      redirect();
    }
  }, [user.data]);

  // handle input change
  const handleInput = (e) => {
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForgotPassword = () => {
    Auth.resetPass(payload).then((res)=>{
      AlertSuccess(res.data.message);
      if(res.data.message=='We have sent password reset pin to your email.'){
         setFlag(true);
      }
    })
  }
  const handleVerifyPassword =()=>{
    const data={
      email:$('#email').val(),
      pin:$('#number').val()
    }
   Auth.pinverify(data).then((res)=>{
     AlertSuccess(res.data.message);
     
     if(res.data.message=='PIN verified successfully.'){
       setTotalflag(true);
     }
    
   })
  }
  const handleSetPassword=()=>{
  
    const data={
      email:$('#email_1').val(),
      pin:$('#number_1').val(),
      new_password:$('#new_pwd').val()
      }
     
    Auth.resetpassword(data).then((res)=>{
      AlertSuccess(res.data.message);
      router.push('/auth/sign-in')
    })
  }
  return (
    <> 
     {
       totalflag===false?
       <AuthWrapper style={{ display: "flex",flexDirection:"column",justifyContent: "center",alignItems:"center",}}>
                <p>&nbsp;</p>
                <h4>Forgot Password ? </h4>
                <h5 style={{textAlign:"center", fontWeight:"400", lineHeight:"24px"}}>
                  Don't worry. We will email you a password reset link. <br/>Kindly input your email address below.
                </h5>
                  <p>&nbsp;</p>
                <Form  style={{ maxWidth:"340px",}}>
                    {
                    flag===false?
                    <>
                    <FormControl fullWidth>
                    <label>email</label>
                      <input
                        type="text"
                        name="email"
                        required
                        onChange={(e) => handleInput(e)}
                        placeholder="Your email address here"
                        value={payload.email}
                      />
                    </FormControl>
            
                    <ActionButton type="button" onClick={(e) => handleForgotPassword(e)} loading={loading} style={{ width:"100%"}}>
                      RESET PASSWORD
                    </ActionButton>
                    </>:
                    <>
                      <FormControl fullWidth>
                        <label>email</label>
                        <input
                          id='email'
                          type="text"
                          name="email"
                          required
                          placeholder="Your email address here"
                          
                        />
                        <label>pin number</label>
                        <input
                          id='number'
                          type="text"
                          name="number"
                          required
                          placeholder="Your pin number here"
                          
                        />
                      </FormControl>
              
                      <ActionButton type="button" onClick={(e) => handleVerifyPassword(e)} loading={loading} style={{ width:"100%"}}>
                        Verify PASSWORD
                      </ActionButton>
                    </>
                    }
                    
                </Form>
        </AuthWrapper>:
        <AuthWrapper style={{ display: "flex",flexDirection:"column",justifyContent: "center",alignItems:"center",}}>
            <p>&nbsp;</p>
            <h4>Please Set Password ! </h4>
            <Form  style={{ maxWidth:"340px",}}>
                <FormControl fullWidth>
                  <label>email</label>
                  <input
                    id='email_1'
                    type="email"
                    name="email_1"
                    value={$('#email').val()}
                    required
                    placeholder="Your email address here"
                  />
                  <label>pin number</label>
                  <input
                    id='number_1'
                    type="text"
                    name="number_1"
                    required
                    placeholder="Your pin number here"
                  />
                  <label>new password</label>
                  <input
                    id='new_pwd'
                    type="password"
                    name="new_pwd"
                    required
                    placeholder="Your new password here"
                    style={{fontSize:'16px'}}
                  />
                  
                </FormControl>
        
                <ActionButton type="button" onClick={(e) => handleSetPassword(e)} loading={loading} style={{ width:"100%"}}>
                  RESET PASSWORD
                </ActionButton>
            </Form>
         </AuthWrapper>
        }    
    </>
  );
}

export default ForgotPassword;