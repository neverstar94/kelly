import { Menu, MenuItem } from "node_modules/@material-ui/core/index";
import { styled } from "@mui/material/styles";

const ProfileMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    boxShadow: "0 0 10px rgba(0,0,0,.15)",
    top: "108px !important",
    width: "320px",
    padding: "0px",
  },
  ul: {
    padding: "0px",
  },
}));

const CurrencyMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    boxShadow: "0 0 10px rgba(0,0,0,.15)",
    top: "108px !important",
    width: "180px",
    padding: "0px",
  },
  ul: {
    padding: "0px",
  },
}));
const ProfileMenuItem = styled("div")(() => ({
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#000",
  padding: "6px 24px",
  borderBottom: "thin solid #f1f1f1",
  width: "320px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  transition: ".3s ease",

  "ion-icon":{fontSize:"16px"},

  p: {
    margin: 0,
    padding: "6px 24px 6px 12px",
  },
  "&:hover": {
    background: "#fff",
    color: "#d5a688",
  },
}));

const ProfileInfo = styled("div")(() => ({
  backgroundColor: "#fff",
  fontSize: "16px",
  color: "#000",
  padding: "12px 24px",
  display: "flex",

  "&:hover": {
    background: "#f1f1f1",
    color: "#444",
  },

  h5: {
    fontSize: "16px",
    display: "block",
    margin: 0,
    fontWeight: "500",
  },

  img: {
    width: "64px",
    height: "64px",
    borderRadius: "100px",
    boxShadow: "0px 0px 10px rgba(0,0,0,.15)",
    border: "none",
    outline: "none",
    marginRight: "12px",
  },
  p: {
    margin: 0,
  },
}));

const ProfileNavigationWrapper = styled("div")(() => ({
  marginTop: "48px",
  padding: "30px",
  backgroundColor: "#faf8ff",
}));
const ProfileOutlet = styled("div")(() => ({
  marginTop: "48px",
  backgroundColor: "#fff",
}));
const ProfileNavigation = styled("ul")(() => ({
  listStyle: "none",
  padding: "0px",
  margin: "0px",

  li: {
    display: "block",
    borderBottom: "thin solid #e8e7e7",

    "&.active-link": {
      a: {
        color: "#000",
        fontWeight: 500,
      },
    },

    a: {
      color: "#666",
      display: "block",
      padding: "12px 24px 12px 0px",
      fontWeight: 400,
      fontSize: "14px",

      "&:hover": {
        color: "#000",
        fontWeight: 500,
      },
    },
  },
}));

const MyOrderContainer = styled("div")(() => ({
  padding: "30px",
  backgroundColor: "#faf8ff",
  marginBottom: "24px",
  

  h2: {
    margin: 0,
    padding: 0,
    display: "block",
    fontWeight: 300,
    fontSize: "24px",
  },

  h5: {
    fontWeight: 400,
    fontSize: "14px",
    color: "#666",
    margin: 0,
    padding: 0,
  },

  h4: {
    fontWeight: 400,
    fontSize: "14px",
    textAlign: "center",
    margin: 0,
    padding: 0,
  },
  ".MuiGrid-item": {
    padding: "24px",
  },
}));

export {
  ProfileMenuItem,
  ProfileMenu,
  ProfileInfo,
  ProfileNavigation,
  ProfileNavigationWrapper,
  MyOrderContainer,
  ProfileOutlet,
  CurrencyMenu
};
