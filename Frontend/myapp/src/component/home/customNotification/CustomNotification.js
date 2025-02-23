import React from "react";
import "../cssReset.css";
import "./customNotificationCss.css";

const CustomNotification = ({ err, succ, warn }) => {

  return (
    <div>
      {err ? <div className="alert_danger">{err}</div> : ""}
      {succ ? <div className="alert_success">{succ}</div> : ""}
      {warn ? <div className="alert_warning">{warn}</div> : ""}
    </div>
  );
};

export default CustomNotification;
