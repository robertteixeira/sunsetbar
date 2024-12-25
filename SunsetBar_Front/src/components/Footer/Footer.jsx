import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={Styles.footer}>
      <ul className={Styles.social_list}>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaWhatsapp />
        </li>
      </ul>
      <p className={Styles.copy_right}>
        <span>Sunset Arena Beach Sports</span> &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
