import React from "react";
import "../cssReset.css";
import "./leftContentCss.css";
import TitleSearch from "./TitleSearch";
import { getMenuAllChildrentAPI } from "../../../apis";

const menu = await getMenuAllChildrentAPI();

const price = [
  { name: "Dưới 1.000.000đ", _id: 1 },
  { name: "1.000.000đ - 2.000.000đ", _id: 2 },
  { name: "2.000.000đ - 3.000.000đ", _id: 3 },
  { name: "Trên 3.000.000đ", _id: 4 },
];

const LeftContent = ({ setSelectedSearch }) => {
  return (
    <div className="left_content_container">
      <TitleSearch
        name={"DANH MỤC"}
        item={menu}
        setSelectedSearch={setSelectedSearch}
      />
      <TitleSearch
        name={"GIÁ"}
        item={price}
        setSelectedSearch={setSelectedSearch}
      />
    </div>
  );
};

export default LeftContent;
