

import { styled } from '@mui/material/styles';
const SliderContainer = styled("div")(() => ({
    width: "430px",
    position: "relative",
    padding: "20px 0px 30px 0px",
}));

const SizePopUp = styled("section")(() => ({
    position: "relative",
    padding: "12px",
    border: "none",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    width: "280px",
    position: "absolute",
    display: "block",
    zIndex: 200,
    bottom: "80px",
    left: "60px",
    backgroundColor: "#fff",
    "h6": {
        margin: "0px 0px 3px 0px",
        fontSize: "13px",
        fontWeight: "500",
    },

    "p": {
        margin: "0px 0px 3px 0px",
        fontSize: "12px",
        color: "#666", fontWeight: "400",
        "span": {
            fontWeight: "400",
            color: "#000",

        }
    }
}));

const ProductDetails = styled("div")(() => ({

    position: "relative",
    height:'565px',
    padding: "24px 24px 0px 20px",
}));

const SliderThumbs = styled("div")(() => ({
    width: "80px",
    position: "relative",
    padding: "25px 0px 25px 10px",
    marginRight: "12px"
}));

const Thumbnail = styled("div")(() => ({
    padding: "0px",
    position: "relative",
    cursor: "pointer",
    "img": {
        width: "70px",
        border: "5px solid #fff",
        boxShadow: "0px 0px 1px #fff",
        transition:".3s ease",
    },
    "&.selected": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    },
    "&:hover": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    },

    "&.active": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    }
}));
const Thumbnail_1 = styled("div")(() => ({
    padding: "0px",
    position: "relative",
    cursor: "pointer",
    "img": {
        width: "120px",
        border: "5px solid #fff",
        boxShadow: "0px 0px 1px #fff",
        transition:".3s ease",
    },
    "&.selected": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    },
    "&:hover": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    },

    "&.active": {
        img: {
            boxShadow: "0px 0px 1px #000",
        }
    }
}));

const ProductTitle = styled("h2")(() => ({
    fontSize: "20px",
    color: "black",
    fontWeight: 400,
    margin: 0,

}));

const ProductPrice = styled("h4")(() => ({
    fontSize: "24px",
    fontWeight: "600",
    margin: "12px 0px",

    span: {
        textDecoration: "line-through",
        color: "#666",
        fontWeight: 400,
        display: "inline-block",
        margin: "0px 12px 0px 0px",
    }
}));

const ProductSKU = styled("p")(() => ({
    fontSize: "16px",
    color: "#666",
    fontWeight: 300,
    margin: "10px 0px 12px 0px",
}));

const ProductDescripton = styled("div")(() => ({
    fontSize: "16px",
    color: "#666",
    fontWeight: 300,
    margin: 0,
    padding: "16px 0px",
    "h5": {
        fontSize: "18px",
        fontWeight: "500",
        color: "#000",
        margin: "16px 0px",
    },

    "p": {
        margin: "0px 0px",
        fontSize: 16,
        lineHeight: "24px",
    },

    "ul": {
        padding: 0,
        margin: "0px 0px",
        listStylePosition: "inside",


        "li": {
            fontSize: 16,
            paddingTop:"6px",
        }
    }
}));

const ProductColor = styled("div")(() => ({
    display: "flex",
    margin: "24px 0px 24px 0px",

    div: {
        marginRight: "12px",
    }

}));
const Color = styled("div")(() => ({
    width: "30px",
    height: "30px",
    borderRadius: "100px",
    border: "4px solid #fff",
    boxShadow: "0px 0px 2px #999",
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0px 0px 3px #555",
    }

}));
const Color_1 = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    padding: " 0px",
    cursor:"pointer",
    "&:hover": {
        div: {
            boxShadow: "0px 0px 2px #000",
        },
        p: {
            color: "#666"
        }
    },

    div: {
        marginRight: "6px",
        border: "4px solid #fff",
        height: "24px",
        width: "24px",
        borderRadius: "100px",
        boxShadow: "0px 0px 2px #666",
        transition: ".3s ease",
    },
    p: {
        color: "#202330",
        margin: 0,
        transition: ".2s ease",
        fontSize: "14px",
        fontWeight:400,
    }

}));
const OtherLink = styled("div")(() => ({
    width: "30px",
    height: "30px",
    borderRadius: "100px",
    border: "4px solid #fff",
    boxShadow: "0px 0px 2px #999",
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0px 0px 3px #555",
    }

}));
const ProductSizes = styled("div")(() => ({

    maxWidth: "360px",
    display: "flex",
    flexFlow: "wrap",
    position: "relative",

    div: {
        fontSize: "13px",
        background: "#fff",
        border: "thin solid #e5e5e5",
        color: "#333",
        fontWeight: 300,
        margin: "0 12px 0px 0px",
        padding: "6px 16px",
        cursor: "pointer",
        margin: "0px 12px 12px 0px",

        "&:hover": {
            background: "#000",
            color: "#fff"
        }
    },

}));

const LastItem = styled("div")(() => ({
    width: "70px",
    fontSize: "12px",
    fontWeight: "normal",
    color: "#fff",
    padding: "8px 12px",
    background: "#7ab3af",
    textAlign: "center",
}));

const PriceTag = styled("div")(() => ({
    fontSize: "14px",
    width: "240px",

    fontWeight: "normal",
    color: "#1f83a8",
    padding: "8px 12px",
    background: "#dbebf1",
    marginLeft: "6px",

    img: {
        width: "18px",
        marginRight: "6px",
    },

    span: {
        fontWeight: 600,
    }
}));

const AddToBag = styled("button")(() => ({
    fontSize: "16px",
    width: "240px",
    border: "none",
    fontWeight: "normal",
    color: "#FFF",
    padding: "12px 24px",
    background: "#4a5274",
    margin: "24px 0px",
    cursor: "pointer",
    height: "48px",
    transition: "background .3s ease",

    "&:hover": {
        background: "#000",
        boxShadow:"0 1px 10px rgba(0,0,0,.25)",
    },
    "&:active:focus": {
        transform:"scale(.98)",
        background: "#000",
    },
}));
const AddToBag1 = styled("button")(() => ({
    fontSize: "14px",
    width: "180px",
    border: "1px solid black",
    fontWeight: "normal",
    color: "black",
    padding: "12px 18px",
    background: "white",
    margin: "24px 0px",
    cursor: "pointer",
    height: "40px",
    transition: "background .3s ease",

    "&:hover": {
        background: "#000",
        boxShadow:"0 1px 10px rgba(0,0,0,.25)",
    },
    "&:active:focus": {
        transform:"scale(.98)",
        background: "#000",
    },
}));

const FavButton = styled("button")(() => ({
    fontSize: "16px",
    border: "thin solid #000",
    fontWeight: "normal",
    padding: "12px 12px",
    height: "48px",
    background: "#fff",
    margin: "24px 0px 0px 6px",
    cursor: "pointer",
    transition: "background .3s ease",

    "&:hover": {
        color: "#fff",
        background: "#000",
    },
    "&:active:focus": {
        transform:"scale(.98)",
        background: "#000",
    },
}));

const FreeShipping = styled("div")(() => ({
    fontSize: "14px",
    border: "none",
    width: "400px",
    fontWeight: "normal",
    padding: "12px 12px",
    background: "#f2f2f2",
    color: "#777",
    margin: "24px 0px 0px 6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-start",
    img: {
        margin: "0px 12px 0px 0px",

    },
    span: {
        display: "block",
        color: "#000",
        fontWeight: "600",
    },
    p: {
        margin: "0px",
    },
}));

const BreadCrumb = styled("div")(() => ({
    a: {
        fontSize: "13px",
        background: "#fff",
        border: "thin solid #e5e5e5",
        color: "#333",
        fontWeight: 300,
        margin: "0 12px 0px 0px",
        padding: "6px 16px",
        cursor: "pointer",
        margin: "0px 12px 12px 0px",

        "&:hover": {
            background: "#000",
            color: "#fff"
        }
    }
}));

export {
    BreadCrumb,
    SizePopUp,
    ProductSizes,
    FreeShipping,
    FavButton,
    AddToBag,
    AddToBag1,
    LastItem,
    ProductTitle,
    ProductColor,
    ProductSKU,
    ProductPrice,
    SliderContainer,
    SliderThumbs,
    Thumbnail,
    Thumbnail_1,
    ProductDetails,
    PriceTag,
    Color,
    Color_1,
    ProductDescripton,
}