import React, { useState } from "react";
import ActionButton from "components/ActionButton/index";
import { getCurrentURL} from "core/indentity/index";
import { AlertSuccess, AlertError } from "core/plugins/kelly-toast";
import Auth from "core/services/auth";
import { auth, provider } from "./social";
import { Stack } from "node_modules/@mui/material/index";
import { useRouter } from "node_modules/next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "node_modules/next/link";
import { baseURL } from "core/constants/index";
import Checkbox from '@mui/material/Checkbox';
import $ from 'jquery';
import {
  AuthWrapper,
  RadioWrapper,
  Form,
  SocialButton,
  AuthLinkTabs,
} from "core/theme/styles/auth.styled";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
} from "node_modules/@material-ui/core/index";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function SignUp({master_countries,interesting}) {
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name:"",
    first_name: "",
    secondary_phone: "",
    date_of_birth: "",
    country_code: "LK",
    country_name:'',
    gender: "",
    phone: "",
    is_subscribed: 1,
    interested_product_categories: [],
    os_type: "WEB"
  });
  const user = useSelector((state) => state.auth.user);

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
  const [social_flag, setSocial_flag] = React.useState(false);//social flag
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const temp=[];
    for(let i=11;i<15;i++){
      if($('#'+i).is(':checked')){
        temp.push(i);
      }
    }
    const temp_1=[];
    for(let i=6;i<11;i++){
      if($('#'+i).is(':checked')){
        temp_1.push(i);
      }
    }
   if(social_flag===false){
        let data = new FormData();
        data.append("email", payload.email);
        data.append("password", payload.password);
        data.append("phone", payload.password);
        data.append("name", payload.first_name);
        data.append("secondary_phone", payload.secondary_phone );
        data.append("date_of_birth", payload.date_of_birth);
        data.append("country_name", payload.country_name);
        data.append("gender", payload.gender);
        data.append("interested_product_categories", JSON.stringify(temp));
        data.append("is_subscribed", '1');
        data.append("os_type", "WEB");
      Auth.register(data).
          then((response) => {
                  if (response.data.status) {
                    AlertSuccess("Your account created");
                    setLoading(false);
                    router.push("/auth/sign-in");
                  } else {
                    AlertError("Registration failed, Please try again !");
                    AlertError(response.data.message);
                  }
            })
        .finally(() => {
          setLoading(false);
        });
   }else{
        let data = new FormData();
        data.append("provider", provider1);
        data.append("social_id", social_id);
        data.append("email", payload.email);
        data.append("phone", payload.password);
        data.append("name", payload.first_name);
        data.append("secondary_phone", payload.secondary_phone );
        data.append("date_of_birth", payload.date_of_birth);
        data.append("country_name", payload.country_name);
        data.append("gender", payload.gender);
        data.append("interested_product_categories", JSON.stringify(temp));
        data.append("is_subscribed", '1');
        data.append("os_type", "WEB");
    
          Auth.social(data).
          then((response) => {
                  if (response.data.status) {
                    console.log(response.data)
                    AlertSuccess("Your account created");
                    setLoading(false);
                    router.push("/auth/sign-in");
                  } else {
                    AlertError("Registration failed, Please try again !");
                    AlertError(response.data.message);
                  }
            })
        .finally(() => {
          setLoading(false);
        });
   }
 
  };
 
  React.useEffect(() => {
    if (user.data) {
      redirect();
    }
  }, [user.data]);

  // handle input change
  const handleInput = (e) => {
    console.log(e.target.value);
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCountrySelect = (e) => {
    let value = e.target.value;
    let c = master_countries.filter((c) => c.name === $('#country').val())[0];

    setPayload((prevState) => ({
      ...prevState,
      country_name: value,
    }));
 
  };
  const [provider1, setProvider1] = React.useState(null);
  const [social_id, setSocial_id] = React.useState(null);

  const google_signup=(e)=>{
    // auth.signInWithPopup(provider)
    //     .then((res)=>{
    //       setSocial_flag(true)
    //           setPayload({
    //             email:res.additionalUserInfo.profile.email,
    //             first_name:res.additionalUserInfo.profile.name,
    //             date_of_birth:res.additionalUserInfo.profile.birthday,
    //             gender:res.additionalUserInfo.profile.gender,
    //           })
    //           setSocial_id(res.additionalUserInfo.profile.id);
    //           setProvider1(res.additionalUserInfo.providerId)
    //       })
    //     .catch((error) => console.log(error));
  }
  return (
    <>
      <AuthWrapper>
        <AuthLinkTabs>
          <Stack flexDirection="row">
            <Link href="/auth/sign-up">
              <a className="active">Sign Up</a>
            </Link>
            <Link href="/auth/sign-in">
              <a>Sign In</a>
            </Link>
          </Stack>
        </AuthLinkTabs>
        <h4>Sign up with</h4>
        <Stack direction="row">
          <SocialButton >
            <ion-icon name="logo-facebook"></ion-icon> FACEBOOK
          </SocialButton>

          <SocialButton onClick={(e) => google_signup(e)}>
            <ion-icon name="logo-google"></ion-icon> GOOGLE
          </SocialButton>

          <SocialButton>
            <ion-icon name="logo-apple"></ion-icon> APPLE
          </SocialButton>
        </Stack>
        <p>&nbsp;</p>
        <h4>Or sign up with email</h4>
        <p>&nbsp;</p>
        <Form onSubmit={(e) => handleRegister(e)}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormControl fullWidth>
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) => handleInput(e)}
                  placeholder="Email address"
                  value={payload.email}
                />
              </FormControl>
              <FormControl fullWidth>
                <label>Your Name</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  onChange={(e) => handleInput(e)}
                  placeholder="Your Name"
                  value={payload.first_name}
                />
              </FormControl>

              <FormControl fullWidth>
                <label>Country</label>
              
                <select
                    style={{ height: " 48px",padding: "0px 24px",fontSize: "16px",}}
                    placeholder="Country"
                    name="country_code"
                    id='country'
                    onChange={handleCountrySelect}
                    required
                  >
                    {master_countries &&
                      master_countries.map((country) => (
                        <option
                          value={country.name}
                          key={country.id}
                          selected={country.id === 'United Kingdom'}
                        >
                          {country.name}
                        </option>
                      ))}
                  </select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={(e) => handleInput(e)}
                  style={{fontSize:'16px'}}
                  placeholder="Password"
                  value={payload.password}
                />
              </FormControl>
              <FormControl fullWidth>
                <label>Mobile</label>
                <input
                  type="text"
                  name="secondary_phone"
                  required
                  onChange={(e) => handleInput(e)}
                  placeholder="mobile"
                  value={payload.secondary_phone}
                />
              </FormControl>
              <FormControl fullWidth>
                <label>Date of birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  required
                  onChange={(e) => handleInput(e)}
                  placeholder="Date of birth"
                  value={payload.date_of_birth}
                />
              </FormControl>
              
            </Grid>
            <Grid item md={12}>
              <label>Gender</label>
              <RadioWrapper>
                <RadioGroup name="gender" onChange={(e) => handleInput(e)}>
                  <FormControlLabel
                    value="Girl"
                    control={<Radio />}
                    label="Girl"
                  />
                  <FormControlLabel
                    value="Guy"
                    control={<Radio />}
                    label="Guy"
                  />
                </RadioGroup>
              </RadioWrapper>
            </Grid>
            <Grid container item>
                  <div style={{marginBottom:'20px'}}><FormLabel >Most interested in</FormLabel></div>
                   <RadioGroup  name="interested" style={{display: "flex",flexDirection: "row",}}>
                      {
                        interesting&&
                        interesting.map((item)=>(
                          <Grid key={item.id} item md={4} style={{marginBottom:'10px'}}>
                          <Checkbox id={item.id} style={{marginTop:'-8px',color:'#666'}} {...label}  />
                          <span style={{marginRight:'40px'}}>{item.name}</span>
                          </Grid>
                        ))
                      }
                   </RadioGroup>
            </Grid>
            <Grid item md={12} >
              <label>Let me know about</label>
              <RadioWrapper>
                <FormGroup name="interested" style={{paddingLeft:'14px'}}>
                  <FormControlLabel
                    value="6"
                    control={<input type="checkbox" id='6'/>}
                    label="New Arrivals"
                  />
                  <FormControlLabel
                    value="7"
                    control={<input type="checkbox" id='7'/>}
                    label="Discounts & Sales"
                  />
                  <FormControlLabel
                    value="8"
                     control={<input type="checkbox" id='8'/>}
                    label="Your Exclusives"
                  />
                   <FormControlLabel
                    value="9"
                     control={<input type="checkbox" id='9'/>}
                    label="Flash Sales"
                  />
                    <FormControlLabel
                    value="10"
                     control={<input type="checkbox" id='10'/>}
                    label="KF Events"
                  />
                  
                </FormGroup>
              </RadioWrapper>
            </Grid>
          </Grid>

          <ActionButton type="submit" onClick={(e)=>handleRegister(e)} loading={loading}>
            SIGN UP
          </ActionButton>
     
        </Form>
      </AuthWrapper>
    </>
  );
}

export default SignUp;

export const getStaticProps = async () => {
  const response = await fetch(`${baseURL}/countries`);
  const response1 = await fetch(`${baseURL}/categories`);
 
  const data = await response.json();
  const interes = await response1.json();

  return {
    props: {
      master_countries: data.data.countries,
      interesting: interes.data.categories,
    },
 
  };
};
