import ActionButton from "components/ActionButton/index";
import { actionUpdateProfile } from "core/redux/profile.actions";

import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import Profile from "core/services/profile";
import { Form } from "core/theme/styles/auth.styled";
import Checkbox from '@mui/material/Checkbox';
import $ from 'jquery';
import {Box,FormControl,Grid,RadioGroup,FormLabel,FormControlLabel, Radio,} from "node_modules/@material-ui/core/index";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
//import { CSSObject } from "node_modules/@emotion/react/types/index";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ProfileSettings(interesting,master_countries) {

  const [payload, setPayload] = React.useState({
    phone: "",
    name: "",
    dob: "",
    old_password: "",
    new_password: "",
    gender:'',
    interested_product_categories: [],
  });
  
  const { data, isLoading } = useSelector((state) => state.auth.user);
  const dispatchAction = useDispatch();
  

  const update_profile = () => {
    const temp=[];
    for(let i=11;i<15;i++){
      if($('#'+i).is(':checked')){
        temp.push(i);
      }
    }
   // setInteresting_temp(temp);
   
    dispatchAction(
      actionUpdateProfile({
        phone: payload.phone,
        name: payload.name, 
        gender:payload.gender,  
    
        date_of_birth: payload.dob,      
        interested_product_categories:temp
      })
    );
    let payload_1={
        name: payload.name,  
        phone: payload.phone,
    
        gender:payload.gender, 
        date_of_birth: payload.dob,      
        interested_product_categories: JSON.stringify(temp)
    }
      Profile.update(payload_1).then((response) => {
       AlertSuccess(response.data.message);
        })
        .catch((e)=>{
            console.log(e)
        })
  };
  const update_profile_pwd = () => {
    const temp=[];
    for(let i=11;i<15;i++){
      if($('#'+i).is(':checked')){
        temp.push(i);
      }
    }
   

    let payload_1={
        name: payload.name,  
        phone: payload.phone,
       
        gender:payload.gender, 
        date_of_birth: payload.dob,      
        interested_product_categories: JSON.stringify(temp),
        old_password:payload.old_password,
        new_password:payload.new_password
    }
   
      Profile.update(payload_1).then((response) => {
       AlertSuccess(response.data.message);
        })
        .catch((e)=>{
            console.log(e)
        })
  };

  const handlePayload = (e) => {
  
    setPayload(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    }
    );
  };
  
  React.useEffect(() => {
   
    if (data) {
      setPayload((prevState) => ({
        ...prevState,
        name: data.profile.name,
        phone: data.profile.phone,
        dob: data.profile.dob,
        gender: data.profile.gender,
        interested_product_categories:data.profile.interested_product_categories,
      }));
    }
   
    }, [data]);
     
    const [flag11, setFlag11] = React.useState(false);
    const [flag12, setFlag12] = React.useState(false);
    const [flag13, setFlag13] = React.useState(false);
    const [flag14, setFlag14] = React.useState(false);
    const [total, setTotal] = React.useState(null);
    
    React.useEffect(() => {
          setTotal(data)
      if(data){
          for(let i=0;i<data.profile.interested_product_categories.length;i++){
            if(data.profile.interested_product_categories[i]==11){
                setFlag11(true);
            }
            if(data.profile.interested_product_categories[i]==12){
                setFlag12(true);
            }
            if(data.profile.interested_product_categories[i]==13){
                setFlag13(true);
            }
            if(data.profile.interested_product_categories[i]==14){
              setFlag14(true);
            }
          } 
      }
   }, [data]);

     
       
       
       
     
  
  return (
    <>
      <Box sx={{display:{lg:'blick',md:'none'}}} style={{paddingLeft: "10px",marginBottom: "24px",}}>
        {!isLoading && (
          <Form style={{ maxWidth: "100%",paddingLeft:'10px' }}>  
            <Grid container spacing={3} style={{backgroundColor: "#faf8ff",width:'100%',marginTop:'0px'}}>
            <h2 style={{ padding: "10px 0px 24px 10px",width:'100%'}}>My Profile</h2>
              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>First name</label>
                  <input onChange={handlePayload}
                    type="text"
                    name="name"
                    placeholder="First name"
                    defaultValue={payload.name}
                  ></input>
                </FormControl>
              </Grid>

              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>Mobile</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile" onChange={handlePayload}
                    defaultValue={payload.phone}
                  ></input>
                </FormControl>
              </Grid>

              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>Email address</label>
                  <input name="email"
                    type="email" onChange={handlePayload}
                    placeholder="Email address"
                    defaultValue={payload.email}
                  ></input>
                </FormControl>
              </Grid>
              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>Date of birth</label>
                  <input name="dob" onChange={handlePayload} type="date" defaultValue={payload.dob}></input>
                </FormControl>
              </Grid>
              <Grid item md={12} style={{width:'100%',paddingLeft:'15px'}}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  name="gender"  value={payload.gender}
                  onChange={handlePayload}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <FormControlLabel
                    value="Guy"
                    control={<Radio style={{backgroundColor:'white',color:'black'}} />}
                    label="Guy"
                   
                  />
                  <FormControlLabel
                    value="Girl"
                    control={<Radio style={{backgroundColor:'white',color:'black'}} />}
                    label="Woman"
                  />
                </RadioGroup>
              </Grid>
              <Grid item md={12} style={{width:'100%'}}>
                <div style={{marginBottom:'10px'}}><FormLabel >Most interested in</FormLabel></div>
                {(total != null && total.profile.interested_product_categories != undefined) &&
                    <RadioGroup  name="interested" style={{display: "flex",flexDirection: "row",}}>
                      {/* <Grid item md={3} xs={6}>
                      {
                        flag11===true?<Checkbox id='11' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} defaultChecked/>:<Checkbox id='11' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />
                      }
                        <span>Womenswear</span> 
                      </Grid>
                      <Grid item md={3} xs={6}>
                      {
                        flag12===true?<Checkbox id='12' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} defaultChecked/>:<Checkbox id='12' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />
                      }
                        <span>Menswear</span>
                      </Grid>
                      <Grid item md={3} xs={6}>
                      {
                        flag13===true?<Checkbox id='13' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} defaultChecked/>:<Checkbox id='13' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />
                      } 
                        <span>Kidswear</span>
                      </Grid>
                      <Grid item md={3} xs={6}>
                      {
                        flag14===true?<Checkbox id='14' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} defaultChecked/>:<Checkbox id='14' style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />
                      } 
                      <span>Activewear</span>
                      </Grid> */}
                      {console.log(master_countries,'5343644')}
                      {/* {
                        categories&&
                        categories.map((item)=>(
                          <Grid item md={3} xs={6} key={item.id}>
                            {
                            total.profile.interested_product_categories.indexOf(item.id)===-1?
                            <Checkbox id={item.id} style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} />:
                            <Checkbox id={item.id} style={{color:'black',blackgroundColor:'white',marginBottom:'10px'}} {...label} defaultChecked/>
                            }
                              <span>Kidswear</span>
                          </Grid>
                        ))
                      } */}

                    </RadioGroup>
                }
              </Grid>
              <Grid item md={12} style={{width:'100%'}}>
                    <ActionButton style={{backgroundColor: '#696a70',height:'40px',width:'200px',margin:'0px',marginBottom:'30px'}} onClick={(e)=>update_profile()}>SAVE CHANGES</ActionButton> 
              </Grid>
              </Grid>

            <Grid container spacing={3} style={{marginTop:'20px',backgroundColor: "#faf8ff",width:'100%'}}>


              <Grid item md={12} style={{width:'100%'}}>
                <p style={{ margin: "0px 0px 24px 0px", padding: 0,fontSize:'25px' }}>
                  Change password
                </p>
              </Grid>
              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>Current password</label>
                  <input
                    style={{fontSize:'15px'}}
                    onChange={handlePayload}
                    type="password"
                    name="old_password"
                    placeholder="Current password"
                    defaultValue={payload.old_password}
                  ></input>
                </FormControl>
              </Grid>
              <Grid item md={6} style={{width:'100%'}}>
                <FormControl fullWidth>
                  <label>New Password</label>
                  <input
                    style={{fontSize:'15px'}}
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                    onChange={handlePayload}
                    defaultValue={payload.new_password}
                  ></input>
                  <span>Should include 6 or more characters</span>
                </FormControl>
              </Grid>

              <Grid item md={12} style={{width:'100%'}}>
                  <ActionButton onClick={(e)=>update_profile_pwd()} style= {{backgroundColor: '#696a70',height:'40px',width:'200px',margin:'0px',marginTop:'-30px'}}>SAVE PASSWORD</ActionButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Box>
    </>
  );
}
export default ProfileSettings;
// export const getServerSideProps = async () => {
//   const res = await fetch(`${baseURL}/categories`);
//   const data = await res.json();

//   return {
//     props:{
//       categories: data.data,
//       sub_categories: data.data.sub_categories,
//     }
      
//   };
// };
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
