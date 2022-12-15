import { AppFooter, FooterNavList } from "core/theme/styles/footer.styled";
import { Container, Grid } from "node_modules/@material-ui/core/index";
import React from "react";

const Footer = () => {
  return (
    <AppFooter>
      <Container>
        <Grid container spacing={0}>
          <Grid container spacing={0} item md={10}>
            <Grid item md={3}>
              <FooterNavList>
                <li>Stay Updated</li>
                <li>Get latest updates on new collections, offers,...</li>
              </FooterNavList>
            </Grid>
            <Grid item md={3}>
              <FooterNavList>
                <li>Services</li>
                <li>
                  <a href="#">Shipping & Returns</a>
                </li>
                <li>
                  <a href="/policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
              </FooterNavList>
            </Grid>
            <Grid item md={3}>
              <FooterNavList>
                <li>Information</li>
                <li>
                  <a href="/about">About Us</a>
                </li>

                <li>
                  <a href="/contact">Contact</a>
                </li>

                <li>
                  <a href="#">Kelly Felder on Mobile</a>
                </li>
              </FooterNavList>
            </Grid>
            <Grid item md={3}>
              <FooterNavList>
                <li>Get In Touch</li>
                <li>
                  <a href="mailto:online@kellyfelder.com">online@kellyfelder.com</a>
                </li>
                <li>
                  <a href="tel:+94717255255">+94 717 255 255</a>
                </li>
              </FooterNavList>
            </Grid>
          </Grid>
          <Grid item md={2}>
            <img src="/images/logo-white.png" width="200" />
            <FooterNavList>
              <li></li>
              <li>
                © 2022 All rights reserved. <br />
                Solution by Syncbridge
              </li>{" "}
            </FooterNavList>
          </Grid>
        </Grid>
      </Container>
    </AppFooter>
  );
};

export default Footer;
