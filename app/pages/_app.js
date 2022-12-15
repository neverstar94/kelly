import "core/sass/globals.scss";

import Script from "next/script";
import { DefaultLayout } from "components/layouts/DefaultLayout";
import { KellyTheme } from "core/theme/index";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "core/store/index";
import { useRouter } from "node_modules/next/router";
// import 'bootstrap/dist/css/bootstrap.css';
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
    {/* <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      /> */}
      <Provider store={store}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
     
      </Provider>
    </>
  );
}

export default MyApp;
