import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLogged: boolean;
  isAdmin: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ isLogged, isAdmin }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <img src="../biz-logo.png" width="50" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLogged ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                </>
              ) : null}

              <li className="nav-item">
                {isAdmin ? (
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/newcard"
                  >
                    New Card
                  </NavLink>
                ) : null}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/myCards">
                  My Cards
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/allcards"
                >
                  All Cards
                </NavLink>
              </li>
            </ul>
          </div>
          {isLogged ? (
            <button className="btn btn-warning" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
