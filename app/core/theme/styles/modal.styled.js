import { styled } from "@mui/material/styles";
import { Modal } from "node_modules/@material-ui/core/index";

export const ModalContainer = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    "> div:first-child": {
        backgroundColor:"rgba(255,255,255,.5) !important",
   }
}));
export const ModalTitle = styled("div")(() => ({
    padding: "0px 0px",
    fontSize: "44px",
    textAlign:"center",
}));

export const ModalBody = styled("div")(() => ({  padding:"30px 0px",}));

export const ModalAction = styled("div")(() => ({}));

export const ModalContent = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor: "#fff",
    maxWidth: "550px",
    margin: "0 auto",
    width: "100%",
    outline:0,
    padding: "30px",
    boxSizing:"border-box",
    height: "340px",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.15)",
  p: {
    fontSize: "22px",
    textAlign: "center",
    fontWeight: 300,
  },

  "&.error": {
    "svg, p": {
      color: "#f03a4c",
    },
  },

  "&.success": {
    "svg, p": {
      color: "#77b255",
    },
  },

  "&.warning": {},

  "&.info": {},
}));
