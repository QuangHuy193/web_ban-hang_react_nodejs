import React, { useState } from "react";
import "../cssReset.css";
import "./titleSearchCss.css";

const TitleSearch = ({
  name,
  item,
  setSelectedSearch,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleShowDropMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e) => {
    const checkboxes = document.querySelectorAll(".item_checkbox");

    checkboxes.forEach((checkbox) => {
      if (checkbox !== e.target) {
        checkbox.checked = false;
      }
    });

    if (e.target.checked) {
      setSelectedSearch(e.target.name);
    } else {
      setSelectedSearch("");
    }
  };

  return (
    <div className="search_container">
      <div className="title_search_container">
        <div className="title_search_name">{name}</div>
        <div
          className="title_search_button_dropdown"
          onClick={handleShowDropMenu}
        >
          <i
            className={`fa-solid ${
              isOpen ? "fa-caret-down" : "fa-caret-right"
            }`}
          ></i>
        </div>
      </div>
      {isOpen && ( // Hiển thị hoặc ẩn menu dựa trên trạng thái
        <div className="item_search_container">
          {item.map((item, index) => (
            <div key={index} className="item_search">
              <input
                type="checkbox"
                className="item_checkbox"
                name={item._id}
                onChange={handleCheckboxChange}
              />
              <span className="item_name">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleSearch;
