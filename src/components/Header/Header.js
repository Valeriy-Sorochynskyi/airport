import React from "react";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <img src="./assets/logo.a3d810f.png" alt="logo" />
      </div>
      <div className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <span className="nav-item-sp">For passengers</span>
          </li>
          <li className="nav-item">
            <span className="nav-item-sp">IEV Services</span>
          </li>
          <li className="nav-item">
            <span className="nav-item-sp">VIP</span>
          </li>
          <li className="nav-item">
            <span className="nav-item-sp">Corporate</span>
          </li>
          <li className="nav-item">
            <span className="nav-item-sp">EN</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
