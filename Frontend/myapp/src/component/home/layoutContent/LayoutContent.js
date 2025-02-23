import React, { useState } from "react";
import "../cssReset.css";
import "./layoutContentCss.css";
import LeftContent from "../leftContent/LeftContent";
import RightContent from "../rightContent/RightContent";

const LayoutContent = ({ setSelectedProcduct, selectedMenu, searchBar }) => {
  const [selectedSearch, setSelectedSearch] = useState("");

  return (
    <div className="layout_content_container">
      <div className="layout_content_left">
        <LeftContent setSelectedSearch={setSelectedSearch} />
      </div>

      <div className="layout_content_right">
        <RightContent
          searchBar={searchBar}
          selectedSearch={selectedSearch}
          setSelectedProcduct={setSelectedProcduct}
          selectedMenu={selectedMenu}
        />
      </div>
    </div>
  );
};

export default LayoutContent;
