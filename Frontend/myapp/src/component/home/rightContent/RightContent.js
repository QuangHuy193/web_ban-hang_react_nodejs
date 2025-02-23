import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./rightContentCss.css";
import { getMenuAllChildrentAPI, getProductAPI } from "../../../apis";
import { formatPrice, removeVietnameseTones } from "../../../util/helper";

const products = await getProductAPI();
const menus = await getMenuAllChildrentAPI();
const uniqueProducts = [];
const productNames = new Set(); // Sử dụng Set để lưu các giá trị `name` đã gặp

for (const product of products) {
  if (!productNames.has(product.name)) {
    productNames.add(product.name); // Thêm `name` vào Set
    uniqueProducts.push(product); // Thêm sản phẩm vào mảng kết quả
  }
}

const RightContent = ({
  selectedSearch,
  setSelectedProcduct,
  selectedMenu,
  searchBar,
}) => {
  let [resultSearch, setResultSearch] = useState(uniqueProducts);

  useEffect(() => {
    const filterByMenu = (menuId, products) =>
      products.filter((item) => item.menu_id == menuId);

    const filterByPrice = (priceRange, products) => {
      priceRange = Number(priceRange);

      let rsProducts = [];
      switch (priceRange) {
        case 1:
          for (const item of products) {
            if (item.price < 1000000) {
              rsProducts.push(item);
            }
          }
          break;
        case 2:
          for (const item of products) {
            if (item.price >= 1000000 && item.price < 2000000) {
              rsProducts.push(item);
            }
          }
          break;
        case 3:
          for (const item of products) {
            if (item.price >= 2000000 && item.price < 3000000) {
              rsProducts.push(item);
            }
          }
          break;
        case 4:
          for (const item of products) {
            if (item.price >= 3000000) {
              rsProducts.push(item);
            }
          }
          break;
        default:
          return products;
      }
      return rsProducts;
    };

    let filteredProducts = uniqueProducts;

    // Lọc theo `selectedMenu`
    if (selectedMenu) {
      filteredProducts = filterByMenu(selectedMenu, filteredProducts);
    }

    // Lọc theo `selectedSearch`
    if (selectedSearch) {
      if (menus.some((m) => m._id == selectedSearch)) {
        filteredProducts = filterByMenu(selectedSearch, uniqueProducts);
      } else {
        filteredProducts = filterByPrice(selectedSearch, filteredProducts);
      }
    }

    setResultSearch(filteredProducts);
  }, [selectedSearch, selectedMenu]);

  useEffect(() => {
    if (searchBar !== "") {
      const filteredProducts = uniqueProducts.filter((product) => {
        const productName = removeVietnameseTones(product.name.toLowerCase());
        const searchInput = removeVietnameseTones(searchBar.toLowerCase());
        return productName.includes(searchInput);
      });
      setResultSearch(filteredProducts);
    }
  }, [searchBar]);

  //hàm trả kết quả tim kiếm
  const findProduct = (condition) => {
    if (!condition) {
      for (const product of products) {
        if (!productNames.has(product.name)) {
          productNames.add(product.name); // Thêm `name` vào Set
          uniqueProducts.push(product); // Thêm sản phẩm vào mảng kết quả
        }
      }
      setResultSearch(uniqueProducts);
    } else {
      const filteredProducts = uniqueProducts.filter((product) =>
        product.name.toLowerCase().includes(condition.toLowerCase())
      );
      setResultSearch(filteredProducts);
    }
  };

  let debounceTimeout;
  // Hàm để kích hoạt tìm kiếm sau khi người dùng dừng nhập 1 giây
  const debounceSearch = (event) => {
    const searchQuery = event.target.value;

    // Nếu người dùng gõ thêm, hủy bỏ việc gọi hàm cũ và đặt lại thời gian
    clearTimeout(debounceTimeout);

    // Đặt lại thời gian gọi hàm tìm kiếm sau 1 giây
    debounceTimeout = setTimeout(() => {
      findProduct(searchQuery);
    }, 1000);
  };
  return (
    <div className="right_content_container">
      <div className="right_content_form_group">
        <input
          type="text"
          id="right_content_input_search"
          placeholder="Nhập tên sản phẩm cần tìm"
          onInput={debounceSearch}
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
          style={{ cursor: "pointer" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <div style={{ paddingTop: "10px", fontSize: "18px" }}>
        {resultSearch.length} sản phẩm
      </div>
      <div className="right_content_product_list">
        {resultSearch.map((item, index) => (
          <div className="product_item" key={index}>
            <img
              src={item.thumbail}
              alt={`Product ${item.name}`}
              onClick={() => setSelectedProcduct(item._id)}
            />
            <h2
              className="product_item_name"
              onClick={() => setSelectedProcduct(item._id)}
            >
              {item.name}
            </h2>
            <div className="product_item_price">{formatPrice(item.price)}</div>
          </div>
        ))}
      </div>
      {resultSearch.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Rất tiếc, chúng tôi không có sản phẩm bạn cần tìm, hãy thử lại với từ
          khóa khác
        </div>
      )}
    </div>
  );
};

export default RightContent;
