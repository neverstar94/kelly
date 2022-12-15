import { styled } from '@mui/material/styles';
//category item
const CategoryItem = styled("div")(() => ({
    width: "100%",
    position: "relative",
    marginBottom: "16px",
    a: {
        "&:hover": {
            p: {
                color: "#000"
            }
        }
    }
}));


const ItemTitle = styled("p")(() => ({
    fontSize: "16px",
    color: "#666",
    fontWeight: 400,
    margin: "12px 0px 12px 0px",
    minHeight: "48px",
    transition: ".3s ease",
}));

const ItemPrice = styled("p")(() => ({
    fontSize: "18px",
    fontWeight: 600,
    margin: "0px 0px 11px 0px",
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.4px',
    color: '#666'
}));

const PriceStriped = styled("span")(() => ({
    fontSize: "18px",
    color: "#777",
    fontWeight: 400,
    margin: "0 12px 0px 0px",
    textDecoration: "line-through",
}));


const ItemColor = styled("button")(({ isFocued }) => ({
    fontSize: '1px',
    color: 'white',
    marginRight: "0px",
    // border: "1px solid grey",
    height: "20px",
    width: "20px",
    borderRadius: "100px",
    // boxShadow: "0px 0px 2px #fff",
    cursor: "pointer",

    border: isFocued ? "3px solid #fff" : '1px solid grey',
    boxShadow: isFocued ? "0px 0px 2px #333" : '0px 0px 2px #fff',

    "&:hover": {
        border: "3px solid #fff",
        boxShadow: "0px 0px 2px #333",
    },
    // '&:active': {
    //     border: "3px solid #fff",
    //     boxShadow: "0px 0px 2px #333",
    // },
    // '&:focus': {
    //     border: "3px solid #fff",
    //     boxShadow: "0px 0px 2px #333",
    // },
}));
const Bootbutton = styled("button")(() => ({
    boxShadow: 'none',
    width: '60px',
    height: '30px',
    textTransform: 'none',
    fontSize: 14,
    marginTop: '10px',
    marginLeft: '5px',
    padding: '5px 5px',
    color: 'black',
    borderRadius: 0,
    border: '1px solid',

    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: '#bbb9b9',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white',
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white',
      boxShadow: 'none',
    },
}));

const StockLabel = styled("p")(() => ({
    fontSize: "11px",
    color: "#fff",
    fontWeight: 600,
    margin: 0,
    position: "absolute",
    left: 0,
    top: "160px",
    width: "60px",
    backgroundColor: "#7ab3af",
    padding: "6px 6px 6px 12px",

}));
const BuyOption = styled("p")(() => ({
    fontSize: "13px",
    color: "#fff !important",
    fontWeight: 400,
    margin: 0,
    position: "absolute",
    left: 0,
    top: "200px",
    width: "60px",
    backgroundColor: "#ea9373",
    padding: "6px 6px 6px 12px",

}));


const CategoryTags = styled("div")(() => ({
    fontSize: "18px",
    color: "#000",
    fontWeight: 600,
    margin: 0,
    backgroundColor: "#f6f6f6",
    padding: "24px",
    marginBottom: "24px",
}));

const ButtonTag = styled("a")(() => ({

    fontSize: "13px",
    background: "#fff",
    border: "thin solid #e5e5e5",
    color: "#333",
    fontWeight: 400,
    margin: "0 12px 0px 0px",
    padding: "6px 14px",
    cursor: "pointer",

    "&:hover": {
        background: "#000",
        color: "#fff"
    }

}));


const CategoryPageName = styled("h4")(() => ({
    fontSize: "24px",
    color: "#333",
    fontWeight: 400,
    margin: "0px 0px 0px 0px",
    display: "flex",
    alignItems: "center",

    span: {
        fontSize: "14px",
        marginRight: "12px",
        display: "inline-block",
        marginLeft: "12px",
        color: "#999",

    }
}));

let Size = styled("div")(() => ({

    width: "100%",
    label: {
        marginBottom: "6px",

        "&:hover": {
            span: {
                color: "#000",
            }
        }
    },
    input: {
        border: "thin solid #d8d8d8",
        height: "18px",
        width: "18px",
        marginRight: "12px",
        marginLeft: "12px"
    },

    span: {
        fontSize: "14px",
        color: "#666",
    },
}));

let Collection = Size;
const Color = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    padding: "4px 0px",
    cursor: "pointer",
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
        fontWeight: 400,
    }

}));


const FilterViewMore = styled("a")(() => ({
    fontSize: "12px",
    color: "#202330",
    fontWeight: 600,
    display: "block",
    margin: "12px 0px 12px 0px",
    cursor: 'pointer'

}));

const FilterTitle = styled("p")(() => ({
    borderTop: "thin solid #e5e5e5",
    fontSize: "18px",
    display: "block",
    color: "#202330",
    padding: "24px 0px 0px 0px",
    margin: "0px 0px 16px 0px",
}));




export {
    FilterViewMore,
    FilterTitle,
    CategoryItem,
    CategoryTags,
    ItemTitle,
    ItemPrice,
    ItemColor,
    CategoryPageName,
    ButtonTag,
    StockLabel,
    BuyOption,
    PriceStriped,
    Color,
    Size,
    Collection,
    Bootbutton
}