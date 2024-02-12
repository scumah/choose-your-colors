"use client";

import React from "react";

import layoutStyles from "../layout.module.css";
import styles from "./footer.module.css";

export default function Header() {
  return (
    <footer className={layoutStyles.main}>
      <ul className={styles.footerElements}>
        <li>
          <a href="#" className="footer__link">
            <i className="fab fa-facebook-f"></i>
            facebook
          </a>
        </li>
        <li>
          <a href="#" className="footer__link">
            <i className="fab fa-twitter"></i>
            twitter
          </a>
        </li>
        <li>
          <a href="#" className="footer__link">
            <i className="fab fa-instagram"></i>
            instagram
          </a>
        </li>
        <li>
          <a href="#" className="footer__link">
            <i className="fab fa-youtube"></i>
            youtube
          </a>
        </li>
      </ul>
    </footer>
  );
}
