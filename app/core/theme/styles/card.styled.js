import { styled } from '@mui/material/styles';

const ButtonPrimary = styled("button")(() => ({
    fontSize: "16px",
    width: "240px",
    border: "none",
    fontWeight: "normal",
    color: "#FFF",
    padding: "12px 24px",
    background: "#202330",
    margin: "24px 0px",
    cursor: "pointer",
    height: "52px",
    transition: ".3s ease",
    "&:hover": {
        background: "#000",
    }

}));

const CartCount = styled("div")(() => ({
    position: "absolute",
    borderRadius: "44px",
    backgroundColor: "fff",
    color: "#000",
    width: "24px",
    height: "24px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    top: "15px",
    right:"-8px",

}));

const ButtonOutlined = styled("button")(() => ({
    fontSize: "16px",
    width: "240px",
    border: "none",
    fontWeight: "normal",
    color: "#202330",
    padding: "12px 24px",
    border: "thin solid #202330",
    backgroundColor: "#fff",
    cursor: "pointer",
    height: "52px",
    transition: "background .3s ease",
    "&:hover": {
        background: "#000",
                color:"#fff",
    },

    "&:active:focus": {
        background: "#000",
        transform: "scale(0.98)",
        color:"#fff",
    }

}));

const ButtonOutlinedLight = styled("button")(() => ({
    fontSize: "16px",
    width: "240px",
    border: "none",
    fontWeight: "normal",
    color: "#202330",
    padding: "12px 24px",
    border: "thin solid #d8d8d8",
    backgroundColor: "#faf8ff",
    cursor: "pointer",
    height: "52px",
    transition: ".3s ease",
    "&:hover": {
        background: "#f6f6f6", border: "thin solid #d8d8d8", 
    },
    "&.active": {
        background: "#fff", border: "thin solid #d8d8d8",
        
    }

}));

const EmptyCart = styled("div")(() => ({

    padding: "100px 0px",
    minHeight: "calc(100vh - 127px)",
    textAlign:"center",

    "h3": {
        fontSize: "26px",
        fontWeight: 300,
        margin: "12px 0px"
    },

    "p": {
        margin: "12px 0px",

    }

}));
const EmptyCart1 = styled("div")(() => ({

    padding: "100px 0px",
    minHeight: "400px",
    textAlign:"center",

    "h3": {
        fontSize: "26px",
        fontWeight: 300,
        margin: "12px 0px"
    },

    "p": {
        margin: "12px 0px",

    }

}));

const ItemPrice = styled("p")(() => ({
    fontSize: "22px",
    fontWeight: "500",
    color: "#000",
    margin: "0px 0px 6px 0px",

}));

const ItemName = styled("p")(() => ({
    fontSize: "14px",
    color: "#666",
    margin: "0px 0px 6px 0px",
}));
let Size = styled("div")(() => ({

    width:"100%",
    label: {
        marginBottom: "0px",

        "&:hover":{
            span: {
                color:"#000",
            }
        }
    },
    input: {
        border:"thin solid #d8d8d8",
        height: "18px",
        width: "18px",
        marginRight: "12px",
        marginLeft:"12px"
    },

    span: {
        fontSize: "14px",
        color:"#666",
    },
}));

let Collection = Size;

const ButtonRemove = styled("button")(() => ({
    background: "none",
    border: "none",
    width: "44px",
    height: "44px",
    cursor: "pointer",
    position: "absolute",
    right: "-15px",
    top: "15px",

    "&:hover": {
        color: "#666"
    }
}));

const ItemsWrapper = styled("div")(() => ({
    padding: "0px 24px 24px 24px",
    backgroundColor: "#faf8ff",

    p: {
        fontSize: 16,
        fontWeight: 300,
        color:"#333"
    }
}));



const CartItems = styled("div")(() => ({

    padding: "0px 0px",


    "h4": {
        fontSize: "20px",
        fontWeight: 300,
        margin: "24px 0px"
    },



    "table": {
        width: "100%",
        padding: 0,
        margin: 0,

        "select, input[type='number']": {
            border: "thin solid #d8d8d8",
            padding: "12px",
            margin: "0px 12px",
            maxWidth: "100px",
            textAlign: "center",
        },

        "tr:last-child": {
            "td": {
                borderBottom: "none",
                padding: "24px 0px 0px 0px",
            }

        },


        "td": {
            position: "relative",
            backgroundColor: "#faf8ff",
            padding: "24px 0px 24px 0px",
            verticalAlign: "top",
            borderBottom: "thin solid #d8d8d8",
        },

        "img": {
            width: "110px",
            marginRight: "24px",
        }
    }

}));


const LineDivider = styled("div")(() => ({
    borderTop: "thin solid #d8d8d8",
    marginBottom:"30px",
}));
const PaymentModes = styled("div")(() => ({
    padding:"12px 0px 0px 0px",
    p: {
        color: "#333",
        fontWeight: 300,
        fontSize: "16px",
        marginBottom:"12px",
    },
    
    img: {
        width: "40px",
        marginRight: "2px",
        border:"none",
    }
}));
const CartTotal = styled("div")(() => ({

    padding: "30px",
    backgroundColor: "#faf8ff",
    width:"390px",
button: {
        width: "100%",
    },
    h3: {
        fontSize: "24px",
        fontWeight: 300,
        margin: "0px 0px 18px 0px"
    },
   
    table: {
        width: "100%",
        padding: "12px 0px",
        margin: 0,
        borderTop: "thin solid #d8d8d8",
    

        td: {
            position: "relative",
            backgroundColor: "#faf8ff",
            padding: "0px 0px 12px 0px",
            verticalAlign: "middle",
            fontWeight:500,    
            
        },

        p: {
            margin: "6px 0px",
            fontSize: "16px",
            fontWeight: 300, 
            color:"#333",
            padding: 0.
        }

    }
}));

const CheckoutWrapper = styled("div")(() => ({

    "h3": {
        fontWeight: 300,
        fontSize: "24px",
        color: "#777",
        margin: 0,
    },
    "form": {
        padding: "24px 0px",
    },
    "input": {
        borderRadius: 0,
        border: "thin solid #d8d8d8",
        height: "52px",
        width: "280px",
        padding: "24px 24px",
        fontSize: "16px",
        width: "100%",
        marginBottom: "24px",
    },

    "label": {
        fontSize: "14px",
        color: "#777",
        fontWeight: 300,
    },
    "button": {
        margin: "0px 24px 0px 0px",
    },

    "section": {
        padding: "24px",
        backgroundColor: "#faf8ff",
        marginBottom: "24px",

        "p": {
            margin: "0px 0px 6px 0px", fontWeight: 300,
            color: "#777",
            "strong": {
                fontWeight: 300,
            }
        }
    }

}));

export {
    CheckoutWrapper,
    ButtonOutlinedLight,
    ButtonPrimary,
    ButtonOutlined,
    EmptyCart,
    EmptyCart1,
    CartItems,
    ItemPrice,
    ItemName,
    ButtonRemove,
    ItemsWrapper,
    CartTotal,
    CartCount,
    LineDivider,
    PaymentModes,
    Size
}