import BrowseCategory from "components/_homepage/BrowseCategory";
import InstagramFeed from "components/_homepage/InstagramFeed";
import Mission from "components/_homepage/Mission";
import NewArrivals from "components/_homepage/NewArrivals";
import Promotion from "components/_homepage/Promotion";
import HomeSlider from "components/_homepage/Slider";
import Head from "next/head";
import { baseURL } from "core/constants/index";
import FlashSale from "components/_homepage/FlashSale";
import { HydrationProvider, Client } from "react-hydration-provider";
import { useSelector } from "react-redux";
export default function Home({banners,categories,newArrivals,collections,flashSale,}) {

  const banner = banners.filter(
    (banner) => banner.banner_type === "New Arrivals"
  )[0];
  const currency = useSelector(state => state.master.currency);
  return (
    <>
      <HydrationProvider>
        <Client>
          <div>
            <Head>
              <title>Home - Kelly Felder</title>
            </Head>
        
            <main>
              {banners && <HomeSlider banners={banners} />}
              {categories && <BrowseCategory categories={categories} banners={banners}/>}
             
              {flashSale && <FlashSale  flashSale={flashSale} currency={currency} />}
              <Promotion banners={banners}/>
              {newArrivals && (
                <NewArrivals newArrivals={newArrivals} banner={banner} currency={currency} />
              )}
              <Mission collections={collections} />
              <InstagramFeed />
            </main>
          </div>
        </Client>
      </HydrationProvider>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(`${baseURL}/app`);
  const data = await response.json();

  return {
    props: {
      banners: data.data.banners,
      categories: data.data.productCategories,
      newArrivals: data.data.newArrivals,
      giftCardCategory: data.data.giftCardCategory,
      collections: data.data.collections,
      flashSale: data.data.flashSale,
    },
  };
};
