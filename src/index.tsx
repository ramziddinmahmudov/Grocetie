import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/sass/main.scss";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ProductContextProvider } from "./store/ProductContext";
import { CategoryContextProvider } from "./store/CategoryContext";
import { NewsContextProvider } from "./store/NewsContext";
import { CartContextProvider } from "./store/CartContext";
import { UserContextProvider } from "./store/UserContext";
import { AuthContextProvider } from "./store/AuthContext";
import { OrderContextProvider } from "./store/OrderContext";
import { ReviewContextProvider } from "./store/ReviewsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId="529868702526-c086gqce1m0fe92mif4lujk6j22onfsq.apps.googleusercontent.com">
    <AuthContextProvider>
      <UserContextProvider>
        <OrderContextProvider>
          <CategoryContextProvider>
            <NewsContextProvider>
              <CartContextProvider>
                <ProductContextProvider>
                  <ReviewContextProvider>
                    <BrowserRouter>
                      <React.StrictMode>
                        <App />
                      </React.StrictMode>
                    </BrowserRouter>
                  </ReviewContextProvider>
                </ProductContextProvider>
              </CartContextProvider>
            </NewsContextProvider>
          </CategoryContextProvider>
        </OrderContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
