import React from "react";
import {
  ButtonOutlined,
  ButtonPrimary,
  EmptyCart,
} from "core/theme/styles/card.styled";
import { Box } from "node_modules/@material-ui/core/index";
import { useRouter } from "node_modules/next/router";
import { useSelector } from "react-redux";

import Link from "node_modules/next/link";
const CartButtons = ({ user }) => {
  
  const currency = useSelector((state) => state.master.currency);
  const router = useRouter();
  return (
    <>
      {!user && (
        <>
          <p>Sign in to view your bag and start shopping.</p>
          <ButtonPrimary
            onClick={() => {
              router.push("/auth/sign-in");
            }}
          >
            SIGN IN
          </ButtonPrimary>
          {
              currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
                 <ButtonOutlined>
                     CONTINUE SHOPPING
                  </ButtonOutlined>
              </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
                 <ButtonOutlined>
                      CONTINUE SHOPPING
                  </ButtonOutlined>
              </Link>
            }
        </>
      )}

      {

        user && 
        <>
          <p>Looks like you haven't made any choice yet. </p>
           
            {
              currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
                 <ButtonOutlined>
                     VIEW PRODUCTS
                  </ButtonOutlined>
              </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
                 <ButtonOutlined>
                      VIEW PRODUCTS
                  </ButtonOutlined>
              </Link>
            }
           
          </>
      }
    </>
  );
};
function CartEmpty({ user }) {
  
  const currency = useSelector((state) => state.master.currency);
  return (
    <EmptyCart>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "150px",
            borderRadius: "150px",
            height: "150px",
            backgroundColor: "#f6f6f6",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/bag.svg" />
        </div>
        <h3>Your bag is empty</h3>
        {
            currency===null?<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=LKR`}>
              <CartButtons user={user} />
          </Link>:<Link href={`/category?page=1&per_page=50&category_id=&sub_category_id=&price_min=&price_max=&sort=&color=&size=&attributes=&collection_id=&page_type=NEW_ARRIVAL&currency=${currency.code}`}>
              <CartButtons user={user} />
          </Link>
          }
        
      </Box>
    </EmptyCart>
  );
}

export default CartEmpty;
