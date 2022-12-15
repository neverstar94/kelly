import { styled } from '@mui/material/styles';
const RadioWrapper = styled("div")(() => ({
    ".MuiFormGroup-root": {
        display: "flex",
        flexDirection:"row",
    },
    ".MuiRadio-colorSecondary.Mui-checked": {
        color:"#000",
    },
    ".MuiFormControlLabel-label": {
        color:"#000",
    },
    ".MuiSvgIcon-root": {
        fill:"#d8d8d8",
    },

    ".MuiRadio-colorSecondary.Mui-checked": {
        color: "#000",
        
        ".MuiSvgIcon-root": {
            fill:"#000",
        },
    },

    "input[type='checkbox']": {
        width: "18px",
        padding: "0px",
        margin: "0px 12px 0px 0px"
    }
  
}));

const AuthLinkTabs = styled("div")(() => ({
    width: "100%",
    div: {
        
    },
    a: {
        display: "flex",
        alignItems: "center",
        width:"100%",
        fontSize: "18px",
        color: "#202330",
        height: "50px",
        borderBottom: "1px solid #d8d8d8",
        justifyContent:"center",
        textAlign: "center",
        "&:hover": {
            borderBottom:"1px solid #202330",
        },
        "&.active": {
            borderBottom:"1px solid #202330",
        }
    }
}));
const AuthWrapper = styled("div")(() => ({
    maxWidth: 800,
    minHeight: 600,
    backgroundColor: "#faf8ff",
    padding: "36px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",

    "h4": {
        fontWeight: 300,
        fontSize: "24px",
        textAlign: "center",
        padding: "12px 0px",
    }
}));
const Form = styled("div")(() => ({
    minWidth: "340px",
    margin: "0 auto",
    display: "block",
    width: "100%",

    "label": {
        fontWeight: 400,
        color: "#666",
        fontSize: "14px",
        marginBottom: "6px",

        
    },

    ".MuiInputBase-root": {
        "&:after, &:before":{display:"none"},
    },

    "input": {
        boxSizing:"border-box",
        height: "50px",
        border: "solid 1px #d8d8d8",
        background: "#fff",
        borderRadius: 0,
        fontSize: "16px",
        boxShadow: "none",
        margin: "0px 0px 24px 0px",
        padding: "12px 16px",
        transition:".1s ease",

        "&:focus": {
            border: "2px solid #202330",
            boxShadow: "none",
            outline:0,
        }

    },

    "input[type='password']": {
        fontSize:"24px",
    }


}));

const SocialButton = styled("button")(() => ({
    padding: "16px 48px",
    backgroundColor: "#faf8ff",
    width: "100%",
    height: "50px",
    margin: "12px 12px",
    fontSize: "14px",
    border: "thin solid #000",
    cursor: "pointer",
    display: "flex",

    "&:hover": {
        backgroundColor: "#fff",
    },

    "&:active:focus": {
        backgroundColor: "#fff",
        transform: "scale(.98)",
        
  },
}));


const ActionSubmit = styled("button")(() => ({
    padding: "24px 48px",
    backgroundColor: "#202330",
    height: "50px",
    width: "280px",
    margin:"0 auto",
    fontSize: "14px",
    padding: "0px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    boxShadow: "0 1px 10px rgb(0 0 0 / 0%)",
    "&:hover": {
        backgroundColor: "#000",
        boxShadow: "0 1px 10px rgb(0 0 0 / 25%)",
    },

      "&:active:focus": {
          backgroundColor: "#000",
          transform: "scale(.98)",
          
    },
    "& .MuiCircularProgress-colorSecondary": {
        marginRight:"12px",
        color:"#fff",
    }
}));

const ForgetPasswordWrapper = styled("p")(() => ({
    textAlign: "right",
    padding: "6px 0px 24px 0px",

    a: {
        fontWeight:"600",
        display: "block",
        color:"#202330",
        "&:hover": {
            color:"#000",
        }
    }
}));
const ActionButton = styled("a")(() => ({
    cursor: "pointer",
    display: "block",
    borderBottom: "thin solid #d9d9d9",
    padding: "16px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 500,
    color: "#666",
    width: "50%",
    transition: ".3s ease",
    height: "64px",

    "&:hover": {
        borderBottom: "2px solid #202330",
        color: "#000",
    },

    "&.selected": {
        borderBottom: "2px solid #202330",
        color: "#000",
    }

}));

const LogoutWrapper = styled("a")(() => ({
    width: "280px",
    minHeight: "500px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "100px 0px",

    "h1": {
        fontWeight: 400,
        textAlign: "center",
    },
    "p": {
        fontWeight: 300,
        textAlign: "center",
    }
}));




export {
    AuthLinkTabs,
    LogoutWrapper,
    AuthWrapper,
    ActionButton,
    ActionSubmit,
    Form,
    SocialButton,
    ForgetPasswordWrapper,
    RadioWrapper
}