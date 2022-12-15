import { styled } from "@mui/material/styles";

import { Container } from "node_modules/@material-ui/core/index";
import { Stack } from "node_modules/@mui/material/index";
import Link from "node_modules/next/link";

//banner
const BannerWrapper = styled("div")(() => ({
  width: "100%",
  height: "700px",
  width: "100%",
  overflow: "hidden",
  position: "relative",
}));

const BannerImage = styled("img")(() => ({
  position: "absolute",
  height: "auto",
  width: "100%",
  top: 0,
  left: "50%",
  zIndex: 1000,
  transform: "translateX(-50%)"
}));

const BannerStack = styled(Stack)(() => ({
  height: "700px",
  justifyContent: "center",
  alignItems: "flex-start",
}));

const BannerButton = styled("button")(({ theme }) => ({
  fontFamily: "'Raleway', sans-serif",
  width: "180px",
  height: "50px",
  padding: "16px",
  backgroundColor: theme.palette.secondary.main,
  position: "relative",
  zIndex: 1100,
  color: theme.palette.secondary.contrastText,
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  transition: ".3s ease",

  "&:hover": {
    backgroundColor: "#000",
    color: "#fff",
  },
}));

const BannerText = styled("h2")(() => ({
  fontSize: "50px",
  fontWeight: "700",
  lineHeight: "normal",
  color: "#202330",
  position: "relative",
  zIndex: 1100,
  margin: "24px 0px",
}));
//categories
const CategoryLink = styled(Link)(() => ({
  width: "100%",
  display: "block",
  transition: ".3s ease",
  position: "relative",
  maxHeight: "436px",
  background: "#eee",

  "&:hover": {
    background: "#eee",

    p: {
      padding: "12px 24px",
    },
  },
}));
const FullImage = styled("img")(() => ({
  width: "100%",
}));

const CategoryName = styled("p")(() => ({
  fontSize: "18px",
  margin: "0px",
  fontWeight: "600",
  padding: "12px 12px",
  position: "relative",
  transition: ".3s ease",
  "&:hover": {
    background: "#eee",
  },
}));

const CategoryNameHighlited = styled("p")(() => ({
  fontSize: "18px",
  margin: "0px",
  fontWeight: "600",
  padding: "12px 12px",
  position: "relative",
  transition: ".3s ease",
  "&:hover": {
    background: "#fff",
  },
  background: "#eee",
}));

const CategoryTitle = styled("h2")(() => ({
  fontSize: "24px",
  textAlign: "center",
  margin: "48px 0px",
  color: "#000",
  fontWeight: "300",
}));

//promo

const PromoContainer = styled("section")(() => ({
  
  width: "100%",
  padding: "36px",
  margin: "0px 0px",
}));

const PromoTitle = styled("h2")(() => ({
  fontSize: "36px",
  fontWeight: "700",
  color: "#fff",
  textAlign: "center",
  margin: "0px 0px 2px 0px",
}));

const PromoDesc = styled("h4")(() => ({
  fontSize: "16px",
  fontWeight: "normal",
  textAlign: "center",
  margin: "6px auto",
}));

const PromoCode = styled("p")(() => ({
  fontSize: "16px",
  fontWeight: "normal",
}));
const PromoLink = styled("button")(() => ({
  fontSize: "16px",
  fontWeight: "normal",
  maxWidth: "240px",
  padding: "0px",
  color: "#6c76b0",
  border: "none",
  margin: "0px 24px",
}));

const NAContainer = styled(Container)(() => ({
  padding: "48px 0px",
  backgroundColor: "#ffe1e7",
  position: "relative",
  height: "620px",
  margin: "90px 0px",
}));

const NAFloatingText = styled("div")(() => ({
  width: "400px",
  position: "absolute",
  right: "50px",
  top: "150px",
  zIndex: 1100,
  padding: "12px",
  textAlign: "center",
}));

const NAFloatingImage = styled("img")(() => ({
  width: "960px",
  height: "550px",
  position: "absolute",
  left: "50px",
  top: "-50px",
  zIndex: 1000,
}));

const NATitle = styled("h2")(() => ({
  color: "#b50b63",
  fontWeight: "700",
  margin: 0,
  fontSize: "48px",
}));

const NADesc = styled("p")(() => ({
  color: "#000000",
  fontWeight: "400",
  marginTop: "12px",
  textAlign: "left",
}));

const NALink = styled("a")(() => ({
  color: "#000000",
  fontWeight: "400",
  background: "#fff",
  padding: "16px 24px",
  display: "block",
  maxWidth: "240px",
  marginTop: "12px",
  textAlign: "center",
  fontWeight: "600",
  transition: ".3s ease",
  background: "#fff",

  "&:hover": {
    background: "#000",
    color: "#fff",
  },
}));
const NewArrivalContainer = styled(Container)(() => ({
  position: "relative",
  padding: "0px 0px",
  marginTop: "-150px",
}));
const NewArrivalItem = styled("div")(() => ({
  position: "relative",

  h3: {
    fontSize: "16px",
    fontWeight: 400,
    margin: "0px 0px 12px 12px",
  },

  p: {
    fontSize: "15px",
    margin: "0px 0px 6px 12px",
    color: "#666",
  },
  ".MuiLinearProgress-root": {
    marginTop: "12px",
    height: "6px",
    borderRadius: "12px",
    backgroundColor: "#3a3a3a",
  },
  ".MuiLinearProgress-barColorPrimary": {
    backgroundColor: "#f67100",
  },
}));

const FavIconButton = styled("button")(() => ({
  position: "absolute",
  width: "36px",
  height: "36px",
  borderRadius: "100px",
  top: "12px",
  right: "12px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,.75)",
  cursor: "pointer",
  transition: "color .2s ease",
  fontWeight: 500,
  fontSize: "20px",
  
  "&.active": {
    backgroundColor: "rgba(255,255,255,1)",
    color: "#d5a688",
  },

  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
    color: "#d5a688",
  },

  "&:active": {
    backgroundColor: "rgba(255,255,255,1)",
    color: "#d5a688",
    transform: "scale(.99)",
  },
}));

const FavItemImage = styled("img")(() => ({
  width: "100%",
  marginBottom: "12px",
}));

const MissionContainer = styled("section")(() => ({
  background: "#f6f6f6",
  position: "relative",
  width: "100%",
  padding: "44px",
  margin: "44px 0px",
  h3: {
    fontWeight: "300",
    fontSize: "24px",
    margin: "0px 0px 44px 0px",
    textAlign: "center",
    color: "#333",
  },

  h4: {
    fontWeight: "600",
    fontSize: "30px",
    margin: "12px 0px 12px 0px",
    textAlign: "left",
    color: "#000",
  },
  p: {
    fontSize: "16px",
    fontWeight: "300",
    color: "#666",
    margin: 0,
  },
  a: {
    fontSize: "16px",
      fontWeight: "600",
    marginTop:"12px",
    padding: "6px 0px 6px 0px",
    display: "inline-block",
    borderBottom: "thin solid #000",

    "&:hover": {
      color: "#666",
      borderBottom: "thin solid #666",
    },
  },
}));

const InstaFeed = styled("section")(() => ({
  background: "#a45d96",
  height: "308px",
  padding: "48px",

  h2: {
    margin: "0px",
    color: "#fff",
    fontSize: "48px",
    fontWeight: "700",
    margin: "12px 0px",
  },
  h4: {
    fontSize: "24px",
    margin: "12px 0px",
  },
  h5: {
    fontSize: "18px",
    fontWeight: "300",
    color: "#fff",
    margin: "12px 0px",
  },
}));

const SwiperArrow = styled("div")(() => ({
  padding: "12px",
  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.5)",
  backgroundColor: "#fff",
  width: "50px",
  height: "50px",
  borderRadius: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  cursor: "pointer",
  color: "#666",
  position: "absolute",
  zIndex: 1000,
  left: "15px",
  top: "40%",
  marginTop: "-25px",

  "&:hover": {
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.25)",
    color:"#000",
  },

  "&:active": {
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.25)",
    transform:"scale(.98)"
  }
}));

export {
  BannerText,
  BannerButton,
  BannerImage,
  BannerWrapper,
  BannerStack,
  CategoryTitle,
  CategoryName,
  CategoryLink,
  PromoContainer,
  PromoTitle,
  PromoDesc,
  PromoCode,
  PromoLink,
  NAContainer,
  NAFloatingImage,
  NATitle,
  NADesc,
  NALink,
  NAFloatingText,
  NewArrivalContainer,
  NewArrivalItem,
  FavIconButton,
  FavItemImage,
  MissionContainer,
  FullImage,
  InstaFeed,
  CategoryNameHighlited,
  SwiperArrow
};
