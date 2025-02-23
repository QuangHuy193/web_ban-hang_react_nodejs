import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./cartPageCss.css";
import { Modal } from "antd";
import { formatPrice } from "../../../util/helper";
import ListOrder from "../listOrder/ListOrder";

const CartPage = ({
  isCartChange,
  setIsCartChange,
  setIsOrderPage,
  setIsCartPage,
  isOrderChange,
}) => {
  // lưu giữ giá trị của cart
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // lưu trữ giá trị tổng tiền của cart
  const [total, setTotal] = useState(0);

  // tính lại tổng tiền khi cart thay đổi
  useEffect(() => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.number * item.price,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  // sử dụng thư viện UI để hiện confirm xác nhận xóa sản phẩm khỏi cart
  const { confirm } = Modal;

  // hàm xóa sản phẩm khỏi cart
  const handleDeleteProductOfCart = (cart, id) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa sản phẩm này không?",
      onOk() {
        const result = cart.filter((product) => product._id !== id);
        localStorage.setItem("cart", JSON.stringify(result));
        setCart(result);
        setIsCartChange((prev) => !prev);
      },
    });
  };

  // hàm update số lượng sản phẩm trong cart
  const handleUpdateQtyProduct = (id, quantityChange) => {
    const updateCart = cart.map((item) => {
      if (item._id == id) {
        return { ...item, number: item.number + quantityChange };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updateCart));
    setCart(updateCart);
    setIsCartChange((prev) => !prev);
  };

  //hàm mở trang order
  const handleOpenOrderPage = () => {
    setIsCartPage((prev) => !prev);
    setIsOrderPage((prev) => !prev);
  };

  return (
    <div className="cart_page_container">
      <div className="cart_page">
        <div className="cart_page_left">
          {Array.isArray(cart) && cart.length > 0 ? (
            <div className="cart_page_product" style={{ height: "40px" }}>
              <div className="cart_page_product_img"></div>
              <div className="cart_page_product_name cart_page_product_title">
                Tên sản phẩm
              </div>
              <div className="cart_page_product_size cart_page_product_title">
                Kích thước
              </div>
              <div className="cart_page_product_number cart_page_product_title">
                Số lượng
              </div>
              <div className="cart_page_product_price cart_page_product_title">
                Giá
              </div>
            </div>
          ) : (
            ""
          )}
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((item, index) => (
              <div className="cart_page_product" key={index}>
                <div className="cart_page_product_img">
                  <img src={item.thumbail} alt={item.name} />
                </div>
                <div className="cart_page_product_name">{item.name}</div>
                <div className="cart_page_product_size">{item.size}</div>
                <div className="cart_page_product_number">
                  <button
                    className="cart_page_btn_handel_qty"
                    onClick={() => handleUpdateQtyProduct(item._id, -1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-minus"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>

                  <div className="cart_page_input_qty">{item.number}</div>

                  <button
                    className="cart_page_btn_handel_qty"
                    onClick={() => handleUpdateQtyProduct(item._id, 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </button>
                </div>
                <div className="cart_page_product_price">
                  {formatPrice(item.price)}
                </div>
                <div
                  className="cart_page_product_delete"
                  onClick={() => handleDeleteProductOfCart(cart, item._id)}
                >
                  XÓA
                </div>
              </div>
            ))
          ) : (
            <div style={{ fontSize: "20px", padding: "20px" }}>
              Giỏ hàng của bạn hiện đang trống
            </div>
          )}
        </div>
        {Array.isArray(cart) && cart.length > 0 && (
          <div className="cart_page_right">
            <div className="cart_page_right_title">ĐƠN HÀNG</div>
            {Array.isArray(cart) && cart.length > 0 ? (
              <>
                <div className="cart_page_right_item">
                  <div className="cart_page_right_item_1">
                    ({cart.length}) Sản phẩm
                  </div>
                  <div className="cart_page_right_item_2">
                    {" "}
                    {formatPrice(total)}
                  </div>
                </div>
                <div className="cart_page_right_total">
                  Thành tiền: {formatPrice(total)}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="cart_page_right_btn_pay"
                    onClick={handleOpenOrderPage}
                  >
                    ĐẶT HÀNG
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {<ListOrder isOrderChange={isOrderChange} />}
    </div>
  );
};

export default CartPage;
