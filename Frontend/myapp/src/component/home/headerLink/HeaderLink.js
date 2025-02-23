import React, { useEffect, useRef, useState } from "react";
import "../cssReset.css";
import "./headerLinkCss.css";
import { getMenuAllChildrentAPI, getProductAPI } from "../../../apis";

const products = await getProductAPI();
const menus = await getMenuAllChildrentAPI();

const HeaderLink = ({
  selectedProduct,
  selectedMenu,
  setSelectedMenu,
  setSelectedProcduct,
  isCartPage,
  setIsCartPage,
}) => {
  let product = {};
  let menu = {};

  for (const item of products) {
    if (item._id == selectedProduct) {
      product = item;
      break;
    }
  }
  for (const item of menus) {
    if (item._id == selectedMenu) {
      menu = item;
      break;
    }
  }

  const handelToHome = () => {
    setSelectedMenu("");
    setSelectedProcduct("");
    setIsCartPage("");
  };

  return (
    <div className="headerlink_container">
      <a className="item" onClick={handelToHome}>
        Trang chủ
      </a>
      {selectedMenu && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            Linecap="round"
            Linejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <a className="item" onClick={() => setSelectedProcduct("")}>
            {menu.name}
          </a>
        </>
      )}
      {selectedProduct && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            Linecap="round"
            Linejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <a className="item">{product.name}</a>
        </>
      )}
      {isCartPage && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            Linecap="round"
            Linejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <a className="item">Giỏ hàng</a>
        </>
      )}
    </div>
  );
};

export default HeaderLink;
