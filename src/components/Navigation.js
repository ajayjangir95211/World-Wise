import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import logo from "../../src/images/logo.png";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isHamburger, setIsHamburger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsHamburger(window.innerWidth < 610);

    const handleResize = () => {
      const isMobile = window.innerWidth < 610;

      setIsHamburger((prevIsHamburger) => {
        if (prevIsHamburger === isMobile) return prevIsHamburger;
        else {
          setIsOpen(false);
          return isMobile;
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      {isHamburger && (
        <button
          className="hamburger btn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "☰"}
        </button>
      )}

      <ul
        className={
          "nav-links " +
          (isHamburger ? (isOpen ? "col visible" : "col hidden") : "row")
        }
      >
        <li>
          <NavLink
            className="nav-link"
            to="/pricing"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link"
            to="/product"
            onClick={() => setIsOpen(false)}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link disabled"
            to="/login"
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
