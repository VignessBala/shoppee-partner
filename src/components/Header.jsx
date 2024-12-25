import React from "react";

const Header = ({ headerName }) => {
  return (
    <h1 className="text-2xl font-bold fixed top-4 ">
      {headerName}
    </h1>
  );
};

export default Header;
