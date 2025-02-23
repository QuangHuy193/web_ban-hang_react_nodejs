import React from "react";
import { Helmet } from "react-helmet";

const HeadLinkAdmin = () => {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
      />

      <link
        rel="stylesheet"
        href="/template/admin/plugins/fontawesome-free/css/all.min.css"
      />

      <link
        rel="stylesheet"
        href="/template/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
      />

      <link rel="stylesheet" href="/template/admin/dist/css/adminlte.min.css" />
      
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
    </Helmet>
  );
};

export default HeadLinkAdmin;
