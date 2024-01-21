import React from 'react';
import { FaChartBar, FaStar, FaMoneyBill, FaCalendarAlt } from 'react-icons/fa'; 

const Menu = () => {
  return (
    <div className="menu-top">
      <div className="icon-buttons">
        <a href="/dashboard" className="icon-dashboard">
          <FaChartBar className="icon-dashboard" />
        </a>
        <a href="/star" className="icon-star">
          <FaStar className="icon-star" />
        </a>
        <a href="/money" className="icon-money">
          <FaMoneyBill className="icon-money" />
        </a>
        <a href="/calendar" className="icon-calendar">
          <FaCalendarAlt className="icon-calendar" />
        </a>
      </div>
    </div>
  );
};

export default Menu;
