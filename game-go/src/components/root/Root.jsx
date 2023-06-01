import React from "react";
import "./root.css";
import { useState } from "react";
import CompanyLogo from "../../assets/branding/Logo.png";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
        <div
          className='menu-container'
          onMouseEnter={() => {
            setActiveMenu(true);
          }}
          onMouseLeave={() => {
            setActiveMenu(false);
          }}
        >
          <div>
            <img className={activeMenu ? "menu-logo-active" : "menu-logo"} src={CompanyLogo} alt=' ' />
          </div>
          {/* <div>{activeMenu ? <></> : <FontAwesomeIcon icon='fa-sharp fa-solid fa-arrow-right-long' />}</div> */}
          {activeMenu ? (
            <nav className='navbar-wrapper-active'>
              <Link className='nav-link' to={`/`}>
                Home
              </Link>
              <Link className='nav-link' to={`game`}>
                Play Game
              </Link>
              <Link className='nav-link' to={`leaderboard`}>
                Leaderboard
              </Link>
              <Link className='nav-link' to={`rules`}>
                Rules
              </Link>
              <Link className='nav-link' to={`github`}>
                Github
              </Link>
            </nav>
          ) : (
            <></>
          )}
        </div>
        <Outlet />
    </>
  );
};

export default Root;
