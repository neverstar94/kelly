import LoggedLayout from "components/layouts/LoggedLayout";
import {
  ProfileNavigation,
  ProfileNavigationWrapper,
  ProfileOutlet,
} from "core/theme/styles/profile.styled";
import { Container, Grid } from "node_modules/@material-ui/core/index";

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Link from "node_modules/next/link";
import { useRouter } from "node_modules/next/router";
import React from "react";
import ProfileSettings from "./settings";
import { baseURL } from "core/constants/index";
import Profile1 from "core/services/profile";
import $ from 'jquery'

import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";
import { useSelector } from "react-redux";
import Auth from "core/services/auth";
function Profile({ children, master_countries }) {

  const { data, isLoading } = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [path, setPath] = React.useState("/profile/account");
  const [img_data, setImg_data] = React.useState("");
  const [img_url, setImg_url] = React.useState('');
  const [name_1, setName_1] = React.useState('');

  React.useEffect(() => {
    setPath(router.asPath);
  }, [router]);
  
  React.useEffect(() => {
    if(data) {
       setName_1(data.profile.name,'profilename');
       setImg_url(data.profile.image_url);
    }
  }, [data]);

  const picture_change=()=>{
    const file=document.getElementById('file_input').files[0];
    let fileReader= new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
    const imgstr=fileReader.result;
      $('#img').attr('src',imgstr);
      setImg_data(imgstr)
    }
  }
  const picture_save=()=>{
    const payload={
      photo : img_data
    }
    Profile1.imgupdate(payload).then((response) => {
          AlertSuccess(response.data.message);
    })
    .catch(()=>{
         AlertError(response.data.message);
    })
  }

  const toLogout = () => {
    Auth.logout();
    router.push("/auth/logout");
  };
  const isActive = (url) => {
    if (path === url) {
      return "active-link";
    }

    return "";
  }
  
  return (
    <LoggedLayout>
      <Container style={{paddingLeft:'5px'}}>
        <Grid container spacing={4} style={{width:'100%'}} >
          <Grid item md={4} xs={12}  style={{paddingLeft:'24px',paddingRight:'12px'}}>
            <ProfileNavigationWrapper xs={12}>
              <ProfileNavigation>
                <li>
                  <img id='img' style={{width:'60px',height:'60px',borderRadius:'50px'}} src={`${img_url}`}/>
                  <div style={{marginTop:'-60px'}}><input style={{height:'60px',width:'60px',opacity:'0'}} type="file"    id="file_input" onChange={()=>picture_change()}/>
                  </div>
                    <div style={{marginTop:'-25px',marginLeft:'57px'}}>
                        <AddAPhotoIcon onClick={()=>picture_save()} style={{zIndex:'100', color: 'grey',cursor:'pointer'}} />
                    </div>
                    <div style={{marginTop:'-50px',marginLeft:'70px',float:'left',fontWeight:'700'}}>
                         <p>{name_1}</p>
                    </div>
                </li>
                <li className={isActive("/profile/account")} >
                  <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><GridViewOutlinedIcon style={{color:'#666'}} /></p><a href="/profile/account"  style={{padding:'20px',fontSize:'17px'}}>Account Overview</a>
                </li>

                <li className={isActive("/profile")}>
                   <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><PermIdentityOutlinedIcon style={{color:'#666'}} /></p><a href="/profile" style={{padding:'20px',fontSize:'17px'}}>My Profile</a>
                </li>

                <li className={isActive("/profile/orders")}>
                   <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><HttpsOutlinedIcon style={{color:'#666'}} /></p><a href="/profile/orders" style={{padding:'20px',fontSize:'17px'}}>My Orders </a>
                </li>

                <li className={isActive("/profile/wishlist")}>
                   <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><FavoriteBorderOutlinedIcon style={{color:'#666'}} /></p><a href="/profile/wishlist" style={{padding:'20px',fontSize:'17px'}}>Wishlist</a>
                </li>

                <li className={isActive("/profile/address")}>
                   <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><ContactMailOutlinedIcon style={{color:'#666'}} /></p><a href="/profile/address" style={{padding:'20px',fontSize:'17px'}}>Address book</a>
                </li>

                <li className={isActive("/profile/points")}>
                  <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><StarOutlineOutlinedIcon style={{color:'#666'}} /></p><a href="/profile/points" style={{padding:'20px',fontSize:'17px'}}>
                    Store credits / Angel Points
                    </a>
                  
                </li>

                <li className={isActive("/profile/newsletter")}>
                  <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><MarkunreadOutlinedIcon style={{color:'#666'}} /></p> <a href="/profile/newsletter" style={{padding:'20px',fontSize:'17px'}}>Newsletter</a>
                </li>
                <li onClick={()=>toLogout()}> 
                  <p style={{marginTop: '16px',float: 'left',marginRight: '20px'}}><ExitToAppOutlinedIcon  style={{color:'#666'}}/></p><a style={{padding:'20px',fontSize:'17px'}}>Logout</a>
                </li>
              </ProfileNavigation>
            </ProfileNavigationWrapper>
          </Grid>

          <Grid item md={8} style={{paddingRight:'0px'}}>
            <ProfileOutlet>
              {children && children}
              {!children && <ProfileSettings master_countries={master_countries} />}
            </ProfileOutlet>
          </Grid>
        </Grid>
      </Container>
    </LoggedLayout>
  );
}

export default Profile;
export const getStaticProps = async () => {
  const response = await fetch(`${baseURL}/countries`);
  const data = await response.json();
  return {
    props: {
      master_countries: data.data.countries,
    },
  };
};
