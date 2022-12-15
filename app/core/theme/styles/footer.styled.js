

import { styled } from '@mui/material/styles';

const AppFooter = styled("footer")(() => ({
    width: "100%",
    padding: "48px 0px 48px 0px",
    backgroundColor: "#202330",
    display: "block",
}));

const FooterNavList = styled("ul")(() => ({
    margin: "0px 24px 0px 0px",
    padding: "0px",
    li: {
        fontSize: "14px",
        listStyle: "none",
        color: "#fff",
        padding: "6px 0px",
        lineHeight: "1.6rem"
    },

    "li a": {
        display: "block",
        transition: ".3s ease",
        color: "#d4d4d4",
        "&:hover": {
            color: "#ffffff"
        }
    },
    "li:first-child": {
        fontSize: "20px",
        color: "#fff",
        fontWeight: 600,
        marginBottom: "6px",

    }
}));



export {
    AppFooter,
    FooterNavList

}

