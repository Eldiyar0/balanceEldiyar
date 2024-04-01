import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Headeer.css";

const Header: React.FC = () => {
  const balance = useSelector((state: unknown) => state.product.balance);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">WALLET</h1>
          <div className="balance-section">
            <span className="balance-text">Balance:</span>
            <span className="balance-amount">${balance}</span>
          </div>
          <nav className="nav-links">
            <NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink>
            <NavLink to="/admin" className="nav-link" activeClassName="active-link">Admin</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
