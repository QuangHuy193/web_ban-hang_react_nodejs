import React, { useEffect, useState } from "react";
import "../cssReset.css";
import "./wigetCss.css";
import {
  findOneProductAPI,
  getMenuAllAPI,
  getMenuAllChildrentAPI,
  getMenuAPI,
  getOneMenuAPI,
  getProductAPI,
  getProductByMenuIdAPI,
} from "../../../apis";

const Wiget = ({ product }) => {
  const [productReal, setProductReal] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const products = await getProductByMenuIdAPI(product.menu_id);    

      setProductReal([]);
      setProductReal(products);
    };

    getProduct();
  }, []);

  return (
    <div className="wiget_container">
      {productReal.map((item, index) => (
        <div className="col_1">
          <div>
            <img src={item.thumbail} alt={item.name} />
          </div>
          <div>{item.name}</div>
          <div>{item.price}</div>
        </div>
      ))}
    </div>
  );
};

export default Wiget;
