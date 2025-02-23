import React, { useEffect, useState } from "react";
import Top from "./top/Top";
import MenuMain from "./menuMain/MenuMain";
import HeaderLink from "./headerLink/HeaderLink";
import LayoutContent from "./layoutContent/LayoutContent";
import Footer from "./footer/Footer";
import ProductContent from "./productContent/ProductContent";
import Cart from "./cart/Cart";
import CartPage from "./cartPage/CartPage";
import Order from "./order/Order";
import "./homeCss.css";
import { handelOnTop } from "../../util/helper";

const Home = () => {
  // quản lý sản phẩm được chọn
  const [selectedProduct, setSelectedProcduct] = useState("");
  // quản lý danh mục được chọn
  const [selectedMenu, setSelectedMenu] = useState("");
  // quản lý mount, unmount xem nhanh giỏ hàng
  const [isCart, setIsCart] = useState(false);
  // quản lý mount, unmount trang giỏ hàng
  const [isCartPage, setIsCartPage] = useState(false);
  // quản lý sự thay đổi của giỏ hàng
  const [isCartChange, setIsCartChange] = useState(false);
  // quản lý mount, unmount trang đặt hàng
  const [isOrderPage, setIsOrderPage] = useState(false);
  // quản lý mount, unmount nút on top
  const [isOnTop, setIsOnTop] = useState(false);
  // quản lý tìm kiếm từ thanh tìm kiếm ở menu
  const [searchBar, setSearchBar] = useState("");
  // quản lý thay đổi của đơn hàng
  const [isOrderChange, setIsOrderChange] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    };

    // Thêm sự kiện scroll khi component mount
    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isOrderPage ? (
        <Order
          setIsCartPage={setIsCartPage}
          setIsOrderPage={setIsOrderPage}
          setIsOrderChange={setIsOrderChange}
        />
      ) : (
        ""
      )}

      {!isOrderPage ? (
        <>
          <Top />
          <MenuMain
            setSelectedProcduct={setSelectedProcduct}
            setSelectedMenu={setSelectedMenu}
            setIsCart={setIsCart}
            setIsCartPage={setIsCartPage}
            isCartChange={isCartChange}
            setSearchBar={setSearchBar}
          />
          <HeaderLink
            selectedMenu={selectedMenu}
            selectedProduct={selectedProduct}
            setSelectedProcduct={setSelectedProcduct}
            setSelectedMenu={setSelectedMenu}
            setIsCartPage={setIsCartPage}
            isCartPage={isCartPage}
          />
        </>
      ) : (
        ""
      )}

      {selectedProduct ? (
        <ProductContent
          selectedProduct={selectedProduct}
          setSelectedMenu={setSelectedMenu}
          setIsCartChange={setIsCartChange}
        />
      ) : (
        ""
      )}
      {isCartPage ? (
        <CartPage
          isCartChange={isCartChange}
          setIsCartChange={setIsCartChange}
          setIsOrderPage={setIsOrderPage}
          setIsCartPage={setIsCartPage}
          isOrderChange={isOrderChange}
        />
      ) : (
        ""
      )}

      {!selectedProduct && !isCartPage && !isOrderPage ? (
        <>
          <img
            src="/images/slider1.jpg"
            style={{ height: "450px", width: "100%" }}
            alt="loi"
          />
          <LayoutContent
            setSelectedProcduct={setSelectedProcduct}
            selectedMenu={selectedMenu}
            searchBar={searchBar}
          />
        </>
      ) : (
        ""
      )}

      {isCart ? (
        <Cart
          setIsCart={setIsCart}
          isCartChange={isCartChange}
          setIsCartPage={setIsCartPage}
          setSelectedProcduct={setSelectedProcduct}
          setSelectedMenu={setSelectedMenu}
        />
      ) : (
        ""
      )}
      {!isOrderPage ? <Footer /> : ""}

      {isOnTop ? (
        <div className="on_top" onClick={() => handelOnTop(0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-up"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
