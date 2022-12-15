import ActionButton from "components/ActionButton/index";
import { actionCreateAddress, actionDeleteAddress, actionGetAddress, actionMakeDefault ,actionEditAddress} from "core/redux/profile.actions";
import { ButtonOutlined } from "core/theme/styles/card.styled";
import { MyOrderContainer } from "core/theme/styles/profile.styled";
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton } from "node_modules/@material-ui/core/index";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./index";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActionSubmit, Form } from "core/theme/styles/auth.styled";
import EditIcon from "@mui/icons-material/Edit";
import { baseURL } from "core/constants/index";
import Profile1 from "core/services/profile";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import HouseSidingOutlinedIcon from '@mui/icons-material/HouseSidingOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import SystemSecurityUpdateWarningOutlinedIcon from '@mui/icons-material/SystemSecurityUpdateWarningOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";

import Link from "node_modules/next/link";
import $ from 'jquery';
function address({master_countries}) {
  const dispatchAction = useDispatch();

  const user = useSelector((state) => state.auth.user.data);
  const currency = useSelector((state) => state.master.currency);
  const { data, isLoading } = useSelector((state) => state.profile.address);
  const [cityList, setCityList] = React.useState();
  const [payload, setPayload] = React.useState({
    name: "",
    address_1: "",
    address_2: "",
    country_id: "",
    city_id: "",
    postal_code: "",
    phone: "",
    secondary_phone: "",
    set_as_default: "",
  });
  const handleChange = (e) => {
    setPayload(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  React.useEffect(() => {
    let value = 'United Kingdom';
    let c = master_countries.filter((c) => c.name === value)[0];
    setCityList(c.cities);
    }, []);

  const [open, setOpen] = React.useState(false);
 const handleCountrySelect = (e) => {
    let value = e.target.value;
    let c = master_countries.filter((c) => c.name === value)[0];
    
    setCityList(c.cities);
    setPayload((prevState) => ({
      ...prevState,
      country_id: c.id,
    }));
 };
  
    const handleCityChange = (e) => {
    let value = e.target.value;
    let c = cityList && cityList.filter((c) => c.name === value)[0];
    setPayload((prevState) => ({
      ...prevState,
      city_id: c.id,
    }));
  };

  const defaultLoading = useSelector(state => state.profile.default.isLoading);
  const create = useSelector(state => state.profile.create);
  React.useEffect(() => {
    if (user) {
      dispatchAction(actionGetAddress());
    }
  }, [user]);

  const handleDefault = (id) => {
    dispatchAction(actionMakeDefault(id));
  };

  const handleDelete = (id) => {
    dispatchAction(actionDeleteAddress(id));
  }

  const handleCreateAddress = (e) => {
    
    e.preventDefault();
    dispatchAction(actionCreateAddress(payload));

    Profile1.add_address(payload).then((response) => {
      AlertSuccess(response.data.message);
    
        })
        .catch((e)=>{
            console.log(e)
        })

  }
  const [flag, setFlag] = React.useState(false);
  const [addressID, setAddressID] = React.useState(0);
  const handleEdit=(e)=>{
    
    let value = $('#country'+e).text();
    let c = master_countries.filter((c) => c.name === value)[0];
    setCityList(c.cities);
    setFlag(true);
    setPayload(() => ({
    name: $('#name'+e).text(),
    address_1: $('#adress1'+e).text(),
    address_2: $('#adress2'+e).text(),
    country_name: $('#country'+e).text(),
    city_name: $('#city'+e).text(),
    postal_code: $('#code'+e).text(),
    phone: $('#phone1'+e).text(),
    secondary_phone: $('#phone2'+e).text(), 
    }));
    setOpen(true)
    setAddressID(e)
  }
  const handleEditAddress=(e)=>{
    
    e.preventDefault();
    Profile1.edit_address(payload,addressID).then((response) => {
      AlertSuccess(response.data.message);
      $('#name'+addressID).text(payload.name);
      $('#adress1'+addressID).text(payload.address_1);
      $('#adress2'+addressID).text(payload.address_2)
      $('#country'+addressID).text(payload.country_id);
      $('#city'+addressID).text(payload.city_id);
      $('#code'+addressID).text(payload.postal_code);
      $('#phone1'+addressID).text(payload.phone);
      $('#phone2'+addressID).text(payload.secondary_phone)
        })
        .catch((e)=>{
            console.log(e)
        })
  }
  React.useEffect(() => { 

    if (create && create.data) {
      setOpen(false);
    }

  }, [create]);
  return (
    <Profile>

      <Dialog open={open} fullWidth={true}>
        {
          flag===false?<DialogTitle style={{background: "#eee",textAlign:"center",}}>Add new address</DialogTitle>:<DialogTitle style={{background: "#eee",textAlign:"center",}}>Edit address</DialogTitle>
        }
        
        <DialogContent>
          <Form style={{ maxWidth: "100%" }}>
           
           <Grid container spacing={2}>
                      <Grid item md={12}>
                        
                        <FormControl fullWidth>
                        <larbel>Your name</larbel>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            onChange={handleChange}
                            defaultValue={payload.name}
                          />
                        </FormControl>
                        </Grid>
                        <Grid item md={6}>
                        
                            <FormControl fullWidth>
                            <larbel>Mobile number</larbel>
                              <input
                                type="text"
                                name="phone"
                                placeholder="Mobile number"
                                required
                                onChange={handleChange}
                                defaultValue={payload.phone}
                              />
                            </FormControl>
                      </Grid>

                      <Grid item md={6}>
                     
                        <FormControl fullWidth>
                        <larbel>Secondary number</larbel>
                          <input
                            type="text"
                            name="secondary_phone"
                            placeholder="Secondary number"
                            required
                            onChange={handleChange}
                            defaultValue={payload.secondary_phone}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                    
                        <FormControl fullWidth>
                        <larbel>Address line 1</larbel>
                          <input
                            type="text"
                            name="address_1"
                            placeholder="Address line 1"
                            required
                            onChange={handleChange}
                            defaultValue={payload.address_1}
                          />
                        </FormControl>
                        
                        <FormControl fullWidth>
                          <label>Country</label>
                          <select
                            style={{
                              height: " 48px",
                              padding: "0px 24px",
                              fontSize: "16px",
                            }}
                            placeholder="Country"
                            name="country_id"
                            required
                            onChange={handleCountrySelect}
                            defaultValue={payload.country_name}
                          >
                            {master_countries &&
                              master_countries.map((country) => (
                                <option
                                  value={country.name}
                                  key={country.name}
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
                        <FormControl fullWidth>
                        <larbel>Address line 2</larbel>
                          <input
                            type="text"
                            name="address_2"
                            placeholder="Address line 2"
                            required
                            onChange={handleChange}
                            defaultValue={payload.address_2}
                          />
                        </FormControl>
                        <FormControl fullWidth>
                          <label>City</label>
                          {payload.country_id !== 196 && (
                            <input
                              type="text"
                              name="city_id"
                              placeholder="City name"
                              required
                              onChange={handleChange}
                              defaultValue={payload.city_name}
                            />
                          )}
                          {cityList &&
                            payload.country_id === 196 && (
                              <select
                                style={{
                                  height: " 48px",
                                  padding: "0px 24px",
                                  fontSize: "16px",
                                }}
                                onChange={handleCityChange}
                              >
                                {cityList &&
                                  cityList.map((city) => (
                                    <option value={city.name} key={city.name}>
                                      {city.name}
                                    </option>
                                  ))}
                              </select>
                            )}
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <FormControl fullWidth>
                          <label>Post Code</label>
                  <input
                    onChange={handleChange}
                            type="text"
                            placeholder="Post Code"
                            name="postal_code"
                            defaultValue={payload.postal_code}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

            <Box style={{
              display: "flex",
              justifyContent:"space-between"
            }}>
                <ButtonOutlined type="button" onClick={()=>{
                  setOpen(false);
                }} 
                  style={{ width: "160px",}}>
                      Close
                </ButtonOutlined>
              {
                flag===false?<ActionButton type="button"  onClick={handleCreateAddress}  style={{width: "160px"}} >
                      Create
              </ActionButton>:<ActionButton type="button"  onClick={handleEditAddress}  style={{width: "160px"}} >
                      Edit
              </ActionButton>
              }
              
                 </Box>
          </Form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <MyOrderContainer style={{ marginBottom: "12px",display: "flex",justifyContent: "space-between",alignItems: "center",}}>
          <Box style={{ display: "flex", alignItems:"center"}}>
          <h2 style={{marginRight:"24px"}}>Address Book</h2>
          {
              defaultLoading && (<CircularProgress color="#000" size="16px"/>)
          }
          {
            create && create.isLoading && <CircularProgress color="#000" size="16px"/>
          }
          </Box>
          <Box>
            <ActionButton type="button" onClick={()=>{
              setOpen(true);
              setFlag(false)
            }}
              style={{width: "160px",backgroundColor:'#757575'}}>
              Add new
            </ActionButton>
          </Box>      
      </MyOrderContainer>
        {/* {
          isLoading &&
          <MyOrderContainer style={{ height: "320px",justifyContent: "center",display: "flex",alignItems:"center" }}>
              <CircularProgress size="16px" color="#000"/>
          </MyOrderContainer>
        } */}
      
        {
          !isLoading && data && data.addresses &&(
            data.addresses.length>0?
            <>
              <MyOrderContainer style={{height:'600px',overflowY:'auto'}}>
                <Grid container>
                  {data &&
                    data.addresses &&
                    data.addresses.map((address) => (
                      <Grid md={12} item style={{ padding: 0, marginBottom: "24px",backgroundColor:'white' }} key={address.id}>
                        <Box
                          style={{
                          
                            justifyContent: "space-between",
                          
                          }}
                        >
                          <Box>
                                <Grid container>
                                    <Grid item md={12} style={{padding:'0px'}}>
                                      <Grid container>
                                          <Grid item md={2} style={{paddingRight:'0px'}}>
                                              <p style={{fontSize:'15px',marginTop:'60px',}}><HouseOutlinedIcon /></p>
                                              <p><HouseSidingOutlinedIcon /></p>
                                              <p><FlagCircleOutlinedIcon/></p>
                                              <p> <FactCheckOutlinedIcon/></p>
                                              <p><QrCode2OutlinedIcon/></p>
                                              <p><PhoneAndroidOutlinedIcon/></p>
                                              <p><SystemSecurityUpdateWarningOutlinedIcon/></p>
                                          </Grid>
                                          <Grid item md={8} style={{paddingLeft:'0px'}}>
                                                <div style={{marginLeft:'-115px',marginTop:'18px'}}>
                                                    <p style={{fontSize:'20px' }}>
                                                      <strong><span id={`name${address.id}`}>{address.name}</span></strong><span style={{fontSize:'15px'}}>&nbsp;&nbsp;&nbsp;{address.is_default ? "(Default address)" : ""}{" "}</span>
                                                    </p>
                                                </div>
                                                <div style={{height:'21px'}}>
                                                    <p id={`adress1${address.id}`} style={{fontSize:'18px',marginTop:'20px'}}>{address.address_1}</p>
                                                </div>
                                                <div style={{height:'21px'}}>
                                                    <p id={`adress2${address.id}`} style={{fontSize:'18px',marginTop:'6px'}}>{address.address_2 && address.address_2}</p>
                                                </div>
                                                <div style={{height:'21px'}}>
                                                    <p id={`country${address.id}`} style={{fontSize:'18px',marginTop:'6px'}}>{address.country_name}</p>
                                                </div>
                                                <div style={{height:'20px'}}>
                                                    <p id={`city${address.id}`} style={{fontSize:'18px',marginTop:'9px'}}>{address.city_name}</p>
                                                </div>
                                                <div style={{height:'20px'}}>
                                                    <p id={`code${address.id}`} style={{fontSize:'18px',marginTop:'8px'}}>{address.postal_code}</p>
                                                </div>
                                                <div style={{height:'21px'}}>
                                                    <p id={`phone1${address.id}`} style={{fontSize:'18px',marginTop:'8px'}}>{address.phone}</p>
                                                </div>
                                                <div style={{height:'21px'}}>
                                                    <p id={`phone2${address.id}`} style={{fontSize:'18px',marginTop:'8px'}}>{address.secondary_phone}</p>
                                                </div>
                                          </Grid>
                                          <Grid item md={2} style={{paddingTop:'40px'}}>
                                                <Box>
                                                    {
                                                      !address.is_default && (
                                                        <IconButton onClick={()=>handleDelete(address.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                      )
                                                    }
                                                        <IconButton onClick={()=>handleEdit(address.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                </Box>
                                                <Box style={{float:'right'}}>
                                                  {!address.is_default && (
                                                    <ActionSubmit style={{width:'110px',height:'30px',borderRadius:'15px',backgroundColor:'#757575',paddingLeft:'0px',paddingRight:'0px'}} onClick={()=>handleDefault(address.id)}>Make Default</ActionSubmit> )}
                                                </Box>
                                          </Grid>
                                      </Grid>
                                    
                                    </Grid>
                                </Grid>
                            
                          </Box>

                          
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </MyOrderContainer>
            </>:
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
               <AccountCircleOutlinedIcon style={{fontSize:'75px',color:'#666'}} />
             </div>
             <h4 style={{marginBottom:'30px',marginTop:'20px'}}>Nothing in the your address at the moment.</h4>
           
            </Box>
             </MyOrderContainer>
          )
        }
   
      
          
       

    </Profile>
  );
}

export default address;


export const getStaticProps = async () => {
  const response = await fetch(`${baseURL}/countries`);
  const data = await response.json();
  return {
    props: {
      master_countries: data.data.countries,
    },
  };
};