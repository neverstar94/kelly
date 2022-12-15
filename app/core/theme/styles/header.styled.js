import { styled } from '@mui/material/styles';
import { Box } from 'node_modules/@material-ui/core/index';
const LogoLink = styled("a")(() => ({
    display: "block",
    outline: 0,
    margin: "0 auto",
    cursor:"pointer",
}));


const AppHeader = styled("header")(() => ({
    height: "108px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 7px rgb(0, 0, 0,.10)",
    transition:".3s ease",
   
    "&:hover": {
        boxShadow: "0px 0px 7px rgb(0, 0, 0,.15)",
    }
}));

const NavList = styled("ul")(() => ({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center"

}));

const NavListRight = styled("ul")(() => ({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"

}));

const IconWrapper = styled(Box)(() => ({

}));

const IconButton = styled("button")(() => ({
    border: "none",
    background: "none",
    padding: "14px 16px",
    cursor: "pointer",
    transition:".3s ease-in",
    "ion-icon": {
        fontSize: "20px",
   },
    "&:hover": {
        background: "#fff",
        color: "#d5a688",
    }
}));

const IconButtonDropdown = styled("button")(() => ({
    border: "none",
    background: "none",
    width: "40px",
    height: "40px",
    marginLeft:"8px",
    fontSize: "18px",
    fontWeight: "500",
    borderRadius:"0px",
    cursor: "pointer",
    transition: ".2s ease",
    background: "#fff",
    border:"1px solid #fff",
    color:"#000",
    "ion-icon": {
        fontSize: "20px",
   },
    "&:hover": {
        background: "#fff",
        color: "#d5a688",
        border:"1px solid #d5a688",
    }
}));

const IconCurrencyDropdown = styled("button")(() => ({
    border: "none",
    background: "none",
    justifyContent: "center",
    alignItems: "center",
display:"flex",
    marginLeft:"8px",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius:"0px",
    cursor: "pointer",
    transition: ".2s ease",
    background: "#fff",
    color:"#000",
    "ion-icon": {
        fontSize: "14px",
        marginLeft:"4px",
   },
    "&:hover": {
        background: "#fff",
        color: "#d5a688",

    }
}));


const NavListItem = styled("li")(() => ({
    listStyle: "none",
    position:"relative",
    padding: 0,
    margin: "0 10px 0px 0px",
    display: "inline-block",
    "a": {
        display: "block",
        padding: "12px 12px",
  
        
        outline: 0,
        textDecoration: "none",
        transition: ".3s ease",
        background: "#fff",
        color: "#000",
        fontWeight: "500",
        fontSize:"16px",


    },
    "a:hover": {
        color: "#d5a688",
        background: "#fff"
    }
}));
export {
    LogoLink,
    AppHeader,
    NavList,
    NavListRight,
    NavListItem,
    IconWrapper,
    IconButton,
    IconButtonDropdown,
    IconCurrencyDropdown
}