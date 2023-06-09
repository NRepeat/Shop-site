import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ItemDetails from "./scenes/itemDetails/itemDeatails";
import Checkout from "./scenes/checkout/checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Home from "./scenes/home/home";
import Navbar from "./scenes/global/navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";






const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="item/:itemId" element = {<ItemDetails/>} />
        <Route path="checkout/" element = {<Checkout/>} />
        <Route path="checkout/success" element = {<Confirmation/>} />
      </Routes>
      <CartMenu/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
