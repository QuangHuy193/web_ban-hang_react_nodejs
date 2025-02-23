import React, { useEffect, useRef, useState } from "react";
import "../cssReset.css";
import "./productContentCss.css";
import { getProductAPI } from "../../../apis";
import {
  formatPrice,
  getProductByNameSize,
  handelOnTop,
} from "../../../util/helper";
import CustomNotification from "../customNotification/CustomNotification";
import Wiget from "../compo/wiget";

const products = await getProductAPI();
const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43];

const ProductContent = ({
  selectedProduct,
  setSelectedMenu,
  setIsCartChange,
}) => {
  
  let product = {};
  let outOfSize = [];

  const [isErr, setIsErr] = useState("");
  const [isSucc, setIsSucc] = useState("");

  for (const item of products) {
    if (item._id == selectedProduct) {
      product = item;
      break;
    }
  }

  const [productReal, setProductReal] = useState(product);

  setSelectedMenu(product.menu_id);

  for (const item of products) {
    if (item.name == product.name) {
      if (item.qty <= 0) {
        outOfSize.push(Number(item.size));
      }
    }
  }

  const [selectedSize, setSelectedSize] = useState(product.size);
  const [selectedQty, setSelectedQty] = useState(1);  

  const handleSizeClick = (size) => {
    setSelectedSize(size); // Cập nhật size được chọn
    setProductReal(getProductByNameSize(products, product.name, size));
  };
  const handleQtyClickIncrease = () => {
    setSelectedQty((prevQty) => prevQty + 1);
  };
  const handleQtyClickDescrease = () => {
    setSelectedQty((prevQty) => {
      const newQty = prevQty - 1;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const handelAddProductToCart = (productNew, number = 1) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (productNew.qty < number) {
      setIsErr("Số lượng sản phẩm còn ít hơn số lượng bạn chọn!");
      setIsSucc("");
      return;
    }

    const existingproductNewIndex = cart.findIndex(
      (item) => item._id == productNew._id
    );

    if (existingproductNewIndex != -1) {
      // Nếu sản phẩm đã tồn tại, cộng thêm số lượng
      cart[existingproductNewIndex].number += number;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
      let { qty, ...rest } = productNew; // Loại bỏ thuộc tính `qty`
      const newproductNew = { ...rest, number }; // Thêm thuộc tính `number`
      cart.push(newproductNew);
    }
    setIsSucc("Thêm sản phẩm vào giỏ hàng thành công");
    setIsErr("");
    localStorage.setItem("cart", JSON.stringify(cart));
    setIsCartChange((prev) => !prev);
    handelOnTop(0);
  };

  return (
    <>
    <div className="product_content_container">
      <div className="product_content_left">
        <img src={product.thumbail} alt={product.name} />
      </div>

      <div className="product_content_right">
        {isErr ? <CustomNotification err={isErr} /> : ""}
        {isSucc ? <CustomNotification succ={isSucc} /> : ""}
        <div className="product_content_right_name">{product.name}</div>

        <div className="product_content_right_price">
          {formatPrice(product.price)}
        </div>

        <div className="product_content_right_size">
          <div style={{ marginBottom: "10px" }}>Kích thước</div>
          {sizes.map((size, index) => (
            <button
              className={`product_content_right_size_button ${
                outOfSize.includes(size) ? "size_visible" : ""
              }${selectedSize == size ? "size_chosen" : ""}`}
              onClick={() => handleSizeClick(size)}
              key={index}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="product_content_right_number">
          <div>Số lượng</div>
          <div className="input_qty_group">
            <button
              className="button_handel_qty"
              onClick={handleQtyClickDescrease}
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
            <input
              type="text"
              pattern="\d*"
              title="Chỉ cho phép nhập số"
              value={selectedQty}
              className="input_handle_qty"
            />
            <button
              className="button_handel_qty"
              onClick={handleQtyClickIncrease}
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
        </div>

        <div className="product_content_right_button">
          <button
            className="product_content_right_button_cart btn_product_content"
            onClick={() => handelAddProductToCart(productReal, selectedQty)}
          >
            THÊM VÀO GIỎ HÀNG
          </button>          
        </div>
      </div>      
    </div>    
    <Wiget product={product}/>
    </>
  );
};

export default ProductContent;
