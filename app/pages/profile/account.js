import { MyOrderContainer } from "core/theme/styles/profile.styled";
import Profile1 from "core/services/profile";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from "node_modules/next/link";
import {Box,CircularProgress,Grid,} from "node_modules/@material-ui/core/index";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "./index";

function Account() {
  const { data, isLoading } = useSelector((state) => state.auth.user);

  const [wish_num, setWish_num] = React.useState(0);

  React.useEffect(() => {

    Profile1.wishlist().then((response) => {
        setWish_num(response.data.data.wishlist.length)
       
      })
      .catch(()=>{
          console.log(e)
      })

  }, []);
  
  return (
    <Profile>
      
      {
        <>
          {isLoading && (
            <MyOrderContainer
              style={{
                justifyContent: "center",
                display: "flex",
                minHeight: "400px",
                alignItems: "center",
              }}
            >
              <CircularProgress size="16px" color="#000" />
            </MyOrderContainer>
          )}

          {!isLoading && (
            <>
              <MyOrderContainer style={{color:'#666'}}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>My Orders</h2>

                  <Link href="/profile/orders">View all</Link>
                </Box>
                <Grid
                  container
                  style={{
                    background: "#faf8ff",
                  }}
                >
                  <Grid item md={3}>
                    <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>
                      {data && data.profile.completed_orders_count
                        ?data.profile.completed_orders_count
                        : 0}
                    </h4>
                    <h4 style={{fontSize:'18px'}}>Completed</h4>
                  </Grid>

                  <Grid item md={3}>
                    <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>
                      {data && data.profile.returned_orders_count
                        ? data.profile.returned_orders_count
                        : 0}
                    </h4>
                    <h4 style={{fontSize:'18px'}}>Returns</h4>
                  </Grid>

                  <Grid item md={3}>
                    <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>
                      {data && data.profile.processing_orders_count
                        ?data.profile.processing_orders_count
                        : 0}
                    </h4>
                    <h4 style={{fontSize:'18px'}}>Processing</h4>
                  </Grid>

                  <Grid item md={3}>
                    <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>
                      {data && data.profile.shipped_orders_count
                        ? data.profile.shipped_orders_count
                        : 0}
                    </h4>
                    <h4 style={{fontSize:'18px'}}>Shipped</h4>
                  </Grid>
                </Grid>
              </MyOrderContainer>

              <Grid container spacing={3} mt={3} style={{color:'#666'}}>
                <Grid item md={6}>
                  <MyOrderContainer>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>Points earned</h2>

                      <a href="/profile/points">More details</a>
                    </Box>

                    <Grid container>
                      <Grid item md={6}>
                        <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>
                          {data && data.profile.store_credits
                            ?data.profile.store_credits
                            : 0}
                        </h4>
                        <h4 style={{fontSize:'18px'}}>Store credits</h4>
                      </Grid>
                      <Grid item md={6}>
                        <h4 style={{fontSize:'18px',marginBottom:'10px',fontWeight:'bold',color:'black'}}>{data && data.profile.total_redeemable_loyalty_points && (data.profile.total_redeemable_loyalty_points)}</h4>
                        <h4 style={{fontSize:'18px'}}>Angel points</h4>
                      </Grid>
                    </Grid>
                  </MyOrderContainer>
                </Grid>
                <Grid item md={6}>
                  <MyOrderContainer>
                    <Box style={{display: "flex",justifyContent: "space-between",height:'55px',}}>
                      <h2>Wishlist</h2>
                      <Link href={`/profile/wishlist`}>
                          More details
                      </Link>
                    </Box>
                   
                  {
                    wish_num===0?
                    <>
                        <div style={{marginTop:'-25px',textAlign:'center',height:'100px',backgroundColor:'#faf8ff',fontSize:'30px',width:'100%',display:'flex',justifyContent:'center'}}>
                        <div style={{height:'60px',width:'60px',borderRadius:'60px',backgroundColor:'white'}}>
                          <FavoriteBorderIcon style={{fontSize:'30px',position:'relative',top:'20px',color:'#666'}}></FavoriteBorderIcon>
                        </div>
                        </div>
                        <div style={{width:'100%',color:'#666',fontSize:'18px',textAlign:'center',marginTop:'-30px',paddingBottom:'10px'}}>
                            Nothing in the wishlist at the moment
                        </div>
                    </>:
                    <>
                        <div style={{marginTop:'-25px',textAlign:'center',height:'100px',backgroundColor:'#faf8ff',fontSize:'30px',width:'100%',display:'flex',justifyContent:'center'}}>
                          <div style={{height:'60px',width:'60px',borderRadius:'60px',backgroundColor:'white'}}>
                             <FavoriteBorderIcon style={{fontSize:'30px',position:'relative',top:'20px',color:'#666'}}></FavoriteBorderIcon>
                          </div>
                        </div>
                        <div style={{width:'100%',color:'black',fontSize:'18px',textAlign:'center',marginTop:'-30px',paddingBottom:'10px',fontWeight:'bold'}}>
                           {wish_num}
                        </div>
                    </>
                  }
                  
                  </MyOrderContainer>
                </Grid>
              </Grid>

              <MyOrderContainer>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>Recently Viewed</h2>
                </Box>
                <Grid
                  container
                  style={{
                    background: "#faf8ff",
                  }}
                >
                  <Grid item md={2}></Grid>
                </Grid>
              </MyOrderContainer>
            </>
          )}
        </>
      }
    </Profile>
  );
}

export default Account;

