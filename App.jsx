import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { Login } from "./components/Login/Login.jsx";
import { Register } from "./components/Register/Register.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Navbars } from "./components/Navbar/Navbar.jsx";
import { Admin } from "./components/Admin Panel/Admin.jsx";
import { Headphones } from "./components/Home/Products/Headphones/Headphones.jsx";
import { ProductDetails } from "./components/ProductDetails/ProductDetails.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { Cart } from "./components/Cart/Cart.jsx";
import { Wishlist } from "./components/Wishlist/Wishlist.jsx";
import { CheckOut } from "./components/CheckOut/CheckOut.jsx";
import { Accessories } from "./components/Home/Products/Accessories/Accessories.jsx";
import { PaymentSuccess } from "./components/PaymentSuccess.jsx";
import { Protected } from "./Protected.jsx";
import { UserDashboard } from "./components/UserDashboard/UserDashboard.jsx";
import { LoginAdmin } from "./components/Admin Panel/Login.jsx";
import { Tv } from "./components/Home/Products/TV/Tv.jsx";
import { Camera } from "./components/Home/Products/Camera/Camera.jsx";
import { Gaming } from "./components/Home/Products/Gaming/Gaming.jsx";
import { Landline } from "./components/Home/Products/Landline/Landline.jsx";
import { Radio } from "./components/Home/Products/Radio/Radio.jsx";
import { Speaker } from "./components/Home/Products/Speaker/Speaker.jsx";
import { Page404 } from "./components/Page404.jsx";
// import { Protected } from "./Protected";

export const AppContext = createContext();

function App() {
  const [cartNumber, setCartNumber] = useState(0);
  const [searchProducts, setSearchProducts] = useState([]);
  return (
    <>
      <AppContext.Provider value={{ cartNumber, setCartNumber }}>
        <Router id="router">
          <Navbars search={setSearchProducts} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home searchProducts={searchProducts} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/admin" element={<Protected Component={Admin} />} />

            {/* <Route path="/dashboard/:id" element={<UserDashboard />} /> */}
            <Route
              path="/dashboard/:id"
              element={<Protected Component={UserDashboard} />}
            />

            <Route
              path="/headphones"
              element={<Headphones searchProducts={searchProducts} />}
            />
            <Route
              path="/accessories"
              element={<Accessories searchProducts={searchProducts} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            {/* <Route
              path="/products/:id"
              element={<Protected Component={ProductDetails} />}
            /> */}
            <Route
              path="/headphones/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/tv/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/camera/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/gaming/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/landline/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/radio/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/speaker/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/accessories/products/:id"
              element={<ProductDetails searchProducts={searchProducts} />}
            />
            <Route
              path="/tv"
              element={<Tv searchProducts={searchProducts} />}
            />
            <Route
              path="/camera"
              element={<Camera searchProducts={searchProducts} />}
            />
            <Route
              path="/gaming"
              element={<Gaming searchProducts={searchProducts} />}
            />
            <Route
              path="/landline"
              element={<Landline searchProducts={searchProducts} />}
            />
            <Route
              path="/radio"
              element={<Radio searchProducts={searchProducts} />}
            />
            <Route
              path="/speaker"
              element={<Speaker searchProducts={searchProducts} />}
            />

            {/* <Route path="/user/cart" element={<Cart />} /> */}
            <Route path="/user/cart" element={<Protected Component={Cart} />} />

            {/* <Route path="/user/wishlist" element={<Wishlist />} /> */}
            <Route
              path="/user/wishlist"
              element={<Protected Component={Wishlist} />}
            />

            {/* <Route path="/checkout" element={<CheckOut />} /> */}
            <Route
              path="/checkout"
              element={<Protected Component={CheckOut} />}
            />

            <Route path="/checkout/products/:id" element={<ProductDetails />} />
            <Route
              path="user/wishlist/products/:id"
              element={<ProductDetails />}
            />

            {/* <Route path="/paymentsuccess" element={<PaymentSuccess />} /> */}
            <Route
              path="/paymentsuccess"
              element={<Protected Component={PaymentSuccess} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
