import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./listOrderCss.css";
import { getAllOrderAPI } from "../../../apis";
import { formatPrice, formattedDate } from "../../../util/helper";
import { provinces } from "../../../util/constants";

const ListOrder = ({ isOrderChange }) => {
  // lưu trữ giá trị của đơn hàng
  const [order, setOrder] = useState([]);
  // trạng thái đóng mở của danh sách đơn hàng
  const [isListOrder, setIsListOrder] = useState(false);

  // thay đổi danh sách đơn hàng khi danh sách đơn hàng đặt thay đổi
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getAllOrderAPI(); // Gọi API lấy danh sách đơn hàng
        let listOrderId = JSON.parse(localStorage.getItem("order")); // Lấy danh sách ID từ localStorage
        let orderTemp = [];

        if (listOrderId) {
          // Lọc các đơn hàng có ID trùng khớp
          orderTemp = orders.filter((order) =>
            listOrderId.includes(order._id.toString())
          );
        }

        setOrder(orderTemp); // Cập nhật state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, [isOrderChange]);

  return (
    <div className="list_order_container">
      {order.length > 0 && (
        <>
          <div
            className="list_order_title"
            onClick={() => setIsListOrder((prev) => !prev)}
          >
            <button className="list_order_title_btn">
              XEM DANH SÁCH ĐƠN HÀNG
            </button>
            <i
              className={`fa-solid ${
                isListOrder ? "fa-caret-down" : "fa-caret-right"
              }`}
            ></i>
          </div>
          {isListOrder && (
            <div className="list_order_list_item">
              {order.map((item, index) => (
                <div className="list_order_item" key={index}>
                  <div className="list_order_item_info">
                    <div className="list_order_item_label">Ngày đặt hàng</div>
                    <div className="list_order_item_date">{formattedDate(item.create_at)}</div>
                    <div className="list_order_item_label">
                      Thông tin người nhận
                    </div>
                    <div className="list_order_item_content">
                      {item.name} - {item.email}- {item.phone}
                    </div>
                  </div>
                  <div className="list_order_item_address">
                    <div className="list_order_item_label">
                      Địa chỉ nhận hàng
                    </div>
                    <div className="list_order_item_content">
                      {item.address} - {item.ward} - {item.district} -{" "}
                      {provinces.find(
                        (province) => province.value === item.city
                      )?.name || "Không xác định"}
                    </div>
                  </div>
                  <div className="list_order_item_label">
                    Danh sách sản phẩm
                  </div>
                  <div>
                    {item.products.map((item2, index) => (
                      <div className="list_order_item_product" key={index}>
                        Tên sản phẩm: {item2.name} - Size: {item2.size} - Số
                        lượng mua: {item2.number} - Đơn giá: {item2.price}
                      </div>
                    ))}
                  </div>
                  <div className="list_order_item_total">
                    {formatPrice(item.total)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListOrder;
