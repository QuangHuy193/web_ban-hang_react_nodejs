import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./orderCss.css";
import { provinces } from "../../../util/constants";
import { formatPrice, handleSaveOrder } from "../../../util/helper";
import CustomNotification from "../customNotification/CustomNotification";
import { createNewOrder } from "../../../apis";

const Order = ({ setIsCartPage, isCartchange, setIsOrderPage, setIsOrderChange }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [total, setTotal] = useState(0);
  const [isErr, setIsErr] = useState("");
  const [isSucc, setIsSucc] = useState("");

  useEffect(() => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.number * item.price,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0); // Nếu giỏ hàng trống, đặt total = 0
    }
  }, [cart, isCartchange]);

  const handleOpentCart = () => {
    setIsCartPage(true);
    setIsOrderPage(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Ngăn reload trang

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Chuyển đổi giá trị đúng kiểu dữ liệu
    const formattedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: parseInt(data.city, 10),
      district: data.district,
      ward: data.ward,
      address: data.address,
      total: total,
      products: cart,
    };

    // Gọi hàm xử lý
    try {
      const {
        name,
        email,
        phone,
        city,
        district,
        ward,
        address,
        total,
        products,
      } = formattedData;
      const response = await createNewOrder(
        name,
        email,
        phone,
        city,
        district,
        ward,
        address,
        total,
        products
      );
      window.scrollTo({
        top: 0, // Vị trí trên cùng
        behavior: "smooth", // Cuộn mượt
      });
      event.target.reset();
      setIsErr("");
      setIsSucc("Đặt hàng thành công!");
      handleSaveOrder(response);
      setIsOrderChange((prev)=>!prev)   
    } catch (error) {
      window.scrollTo({
        top: 0, // Vị trí trên cùng
        behavior: "smooth", // Cuộn mượt
      });
      setIsSucc("");
      setIsErr(error.message);
    }
  };

  return (
    <div className="order_container">
      <div className="order_title">
        <img src="/images/LOGO.webp" />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
            onClick={handleOpentCart}
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
      </div>
      <div className="order_content">
        <div className="order_content_left">
          {isErr ? <CustomNotification err={isErr} /> : ""}
          {isSucc ? <CustomNotification succ={isSucc} /> : ""}
          <form onSubmit={handleFormSubmit}>
            <div className="form_info_contact">
              <div className="form_title">Thông tin liên lạc</div>
              <input
                className="form_order_input"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="form_ship">
              <div className="form_title">Giao hàng</div>
              <div style={{ color: "#C9C9C9" }}>
                Phương thức thanh toán: Thanh toán khi nhận hàng
              </div>
              <div className="form_select_group ">
                <div>Tỉnh/Thành phố</div>
                <select className="form_order_input" name="city">
                  {provinces.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form_input_group_2">
                <input
                  type="text"
                  className="form_order_input"
                  name="district"
                  placeholder="Quận/Huyện"
                  style={{ marginRight: "20px" }}
                  required
                />
                <input
                  type="text"
                  className="form_order_input"
                  name="ward"
                  required
                  placeholder="Phường/Xã"
                />
              </div>
              <input
                type="text"
                className="form_order_input"
                name="address"
                required
                placeholder="Địa chỉ nhận hàng (Số nhà, đường phố, hẻm, căn hộ,...)"
              />
              <input
                type="text"
                className="form_order_input"
                name="name"
                required
                placeholder="Họ và tên"
              />
              <input
                type="text"
                className="form_order_input"
                name="phone"
                placeholder="Số điện thoại"
                pattern="(03|07|08|09|01[2|6|8|9])+([0-9]{8})"
                title="Vui lòng nhập số điện thoại hợp lệ"
                required
              />
              <div className="form_submit">
                <button type="submit">ĐẶT HÀNG</button>
              </div>
            </div>
          </form>
        </div>
        <div className="order_content_right">
          {cart.map((item, index) => (
            <div key={index} className="order_content_right_product">
              <div>
                <img src={item.thumbail} alt={item.name} />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div className="order_content_right_product_info">
                  <div style={{ paddingTop: "10px" }}>{item.name}</div>
                </div>
                <div
                  className="order_content_right_product_info"
                  style={{ marginTop: "10px" }}
                >
                  <div>
                    size {item.size}, số lượng {item.number}
                  </div>
                  <div>{formatPrice(item.number * item.price)}</div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "30px 35px 20px 50px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            <div>Tổng</div>
            <div>{formatPrice(total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
