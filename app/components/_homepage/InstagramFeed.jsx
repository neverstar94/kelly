import { FullImage, InstaFeed } from "core/theme/styles/home.styled";
import { Container, Grid } from "node_modules/@material-ui/core/index";
import React from "react";

function InstagramFeed() {
  return (
    <>
      <Container>
        <Grid container spacing={0} style={{
          marginBottom:"48px",
        }}>
          <Grid item md={6}>
            <InstaFeed>
              <h2>SHOP THE ‘GRAM</h2>
              <h4>#lovelykellyfelder</h4>
              <h5>
                Upload your favourite Kelly Felder outfit on Instagram with
                <br />
                #lovelykellyfelder for a chance to be featured.
              </h5>
            </InstaFeed>
          </Grid>
          <Grid item md={3}>
            <FullImage src="/images/insta-1.png" />
          </Grid>
          <Grid item md={3}>
            <FullImage src="/images/insta-2.png" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default InstagramFeed;
