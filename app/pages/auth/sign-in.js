import ActionButton from "components/ActionButton/index";
import { OS_TYPE } from "core/constants/index";
import { getCurrentURL, setToken } from "core/indentity/index";
import { AlertSuccess, AlertError } from "core/plugins/kelly-toast";
import { actionGetUser } from "core/redux/auth.actions";
import Auth from "core/services/auth";
import { auth, provider } from "./social";
import {
  AuthWrapper,
  Form,
  SocialButton,
  ForgetPasswordWrapper,
  AuthLinkTabs,
} from "core/theme/styles/auth.styled";
import { FormControl } from "node_modules/@material-ui/core/index";
import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";
import { useRouter } from "node_modules/next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    os_type: OS_TYPE,
  });
  //anuweer1986_1@gmail.com
  //123456
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [alert, setAlert] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

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
        
        console.log(response.data.data.authorisation.token);
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
  const google_signin=(e)=>{
    // auth.signInWithPopup(provider)
    //     .then((res)=>{
    //       const data={
    //         provider:'google',
    //         access_token:res.credential.idToken,
    //         os_type:'WEB'
    //       }
    //       Auth.socialLogin(data).then((response) => {
    //         console.log(response.data)
    //        })
    //       })
    //     .catch((error) => console.log(error));
  }
  return (
    <>
      <AuthWrapper>
      <AuthLinkTabs>
        <Stack flexDirection="row">
            <Link  href="/auth/sign-up"><a>Sign Up</a></Link>
            <Link  href="/auth/sign-in"><a className="active">Sign In</a></Link>
        </Stack>
      </AuthLinkTabs>
        <h4>Sign in with</h4>
        <Stack direction="row">
          <SocialButton><ion-icon name="logo-facebook"></ion-icon> FACEBOOK</SocialButton>

          <SocialButton onClick={(e) => google_signin(e)}><ion-icon name="logo-google"></ion-icon> GOOGLE</SocialButton>

          <SocialButton><ion-icon name="logo-apple"></ion-icon> APPLE</SocialButton>
        </Stack>
        <p>&nbsp;</p>
        <h4>Or sign in with email</h4>
        <p>&nbsp;</p>
        <Form style={{
          maxWidth:"340px",
        }}>
          <FormControl fullWidth>
          <label>Email address</label>
            <input
              type="text"
              name="email"
              required
              onChange={(e) => handleInput(e)}
              placeholder="Email address"
              value={payload.email}
            />
          </FormControl>
          <FormControl fullWidth>
          <label>Password</label>
            <input
              type="password"
              name="password"
              style={{fontSize:'15px'}}
              required
              onChange={(e) => handleInput(e)}
              placeholder="Password"
              value={payload.password}
            />
          </FormControl>

          <ForgetPasswordWrapper>
            <Link href="/auth/forgot-password">Forgot password ?</Link>
          </ForgetPasswordWrapper>

          <ActionButton  onClick={(e) => handleLogin(e)}  loading={loading} style={{
            width:"100%",
          }} >
            SIGN IN
          </ActionButton>
        </Form>
      </AuthWrapper>
      <center>
          <div style={{color:'black',marginTop:'30px',marginBottom:'20px'}}>Privacy Policy   |  Terms @ Conditions</div>
      </center>
      
    </>
  );
}

export default Login;
