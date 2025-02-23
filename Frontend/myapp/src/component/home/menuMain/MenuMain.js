import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./menuMainCss.css";
import { getMenuAPI, getMenuChildAPI } from "../../../apis";
import { handelOnTop } from "../../../util/helper";

const menuAPI = await getMenuAPI();

const menuChild = async () => {
  const results = []; // Mảng chứa kết quả cuối cùng

  // Dùng vòng lặp for...of để xử lý các item bất đồng bộ
  for (let item of menuAPI) {
    const result = {}; // Mỗi item con sẽ tạo ra một đối tượng result mới

    // Thêm id của item vào result
    result.id = item._id;

    // Lấy các menu con cho item hiện tại
    const menuChild = await getMenuChildAPI(item._id);

    // Thêm menuChild vào result
    result.menuChild = menuChild;

    // Thêm result vào mảng kết quả
    results.push(result);
  }

  return results; // Trả về kết quả cuối cùng
};
const menuC = await menuChild();

const MenuMain = ({
  setSelectedProcduct,
  setSelectedMenu,
  setIsCart,
  setIsCartPage,
  isCartChange,
  setSearchBar,
}) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [isCartChange]);

  const handelReset = (id) => {
    handelOnTop(630);
    setIsCartPage(false);
    setSelectedProcduct("");
    setSelectedMenu(id);
  };

  const handleSearchBar = (search) => {
    setSearchBar(search);
    handelOnTop(630)
  };

  const handleKeyDown = (event) => {
    const search = event.target.value.trim();
    if (event.key === "Enter") {
      handleSearchBar(search);
    }
  };

  return (
    <div className="menu_main_container">
      <div className="menu_main_left">
        <ul className="menu_left">
          <li>
            <a>
              <img src="/images/LOGO.webp" />
            </a>
          </li>
          {menuAPI.map((item, index) => (
            <li key={index} className="menu_item_left">
              <div className="dropdown">
                <div className="dropdown_menu">
                  {item.name}
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
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <div className="dropdown_item">
                  {menuC.map((item2) => {
                    if (item2.id == item._id) {
                      return item2.menuChild.map((item3, index) => (
                        <a key={index} onClick={() => handelReset(item3._id)}>
                          {item3.name}
                        </a>
                      ));
                    }
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="menu_main_right">
        <ul className="menu_right">
          <li className="menu_item_right search">
            <div className="form_group">
              <input
                type="text"
                id="input_search"
                placeholder="Bạn đang tìm gì"
                onKeyDown={handleKeyDown}
              />
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
                className="lucide lucide-search img_seacrch"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </li>

          <li className="menu_item_right cart">
            <a style={{ position: "relative" }}>
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
                className="lucide lucide-shopping-cart"
                onClick={() => setIsCart(true)}
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cart.length > 0 && (
                <span className="cart_count">{cart.length}</span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuMain;
