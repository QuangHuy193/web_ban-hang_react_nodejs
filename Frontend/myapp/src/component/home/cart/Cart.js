import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./cartCss.css";
import { formatPrice } from "../../../util/helper";

const Cart = ({
  setIsCart,
  isCartChange,
  setIsCartPage,
  setSelectedMenu,
  setSelectedProcduct,
}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    if (Array.isArray(storedCart) && storedCart.length > 0) {
      const totalAmount = storedCart.reduce(
        (acc, item) => acc + item.number * item.price,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0); // Nếu giỏ hàng trống, đặt total = 0
    }
  }, [isCartChange]);

  const handleViewCartPage = () => {
    setSelectedProcduct("");
    setSelectedMenu("");
    setIsCartPage(true);
    setIsCart(false);
  };

  return (
    <div className="cart_container">
      <div className="cart_title">
        <div style={{ fontSize: "20px" }}>Giỏ hàng</div>
        <div style={{ cursor: "pointer" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#171716"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
            onClick={() => {
              setIsCart(false);
            }}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>

      <div className="cart_content">
        {Array.isArray(cart) && cart.length > 0 ? (
          <div className="cart_product" style={{ height: "40px" }}>
            <div className="cart_product_img"></div>
            <div className="cart_product_name cart_product_title">
              Tên sản phẩm
            </div>
            <div className="cart_product_size cart_product_title">
              Kích thước
            </div>
            <div className="cart_product_number cart_product_title">
              Số lượng
            </div>
            <div className="cart_product_price cart_product_title">Giá</div>
          </div>
        ) : (
          ""
        )}
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item, index) => (
            <div className="cart_product" key={index}>
              <div className="cart_product_img">
                <img src={item.thumbail} alt={item.name} />
              </div>
              <div className="cart_product_name">{item.name}</div>
              <div className="cart_product_size">{item.size}</div>
              <div className="cart_product_number">{item.number}</div>
              <div className="cart_product_price">
                {formatPrice(item.price)}
              </div>
            </div>
          ))
        ) : (
          <div style={{ fontSize: "20px", padding: "20px" }}>
            Giỏ hàng của bạn hiện đang trống
          </div>
        )}

        {total != 0 ? (
          <>
            <div className="cart_footer">
              <div className="cart_footer_left">Tạm tính:</div>
              <div className="cart_footer_right">{formatPrice(total)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="cart_footer_view_cart"
                onClick={handleViewCartPage}
              >
                Xem giỏ hàng
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
