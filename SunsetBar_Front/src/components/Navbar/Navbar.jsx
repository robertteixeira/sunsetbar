import React from "react";
import { FcPlus } from "react-icons/fc";
import logo from "../../assets/img/logo_sunset_branca.png";
import Styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={Styles.navbar}>
      <div>
        <p className={Styles.title}>Sunset Arena</p>
        <p className={Styles.subtitle}>Beach Sports Trairi</p>
      </div>
      <Link to="/order">
        <button type="button" className={Styles.button}>
          <FcPlus size={50} />
        </button>
      </Link>

      <Link to="/">
        <img src={logo} alt="Sunset" className={Styles.logo} />
      </Link>
    </nav>
  );
}

export default Navbar;
