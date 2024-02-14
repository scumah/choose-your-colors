"use client";

import React from "react";

import { FaHome, FaInfoCircle, FaGithub } from "react-icons/fa";

import ThemeToggler from "./themeToggler";

import layoutStyles from "../layout.module.css";
import styles from "./footer.module.css";

export default function Header() {
  return (
    <footer className={layoutStyles.main}>
      <ul className={styles.footerElements}>
        <li>
          <a href="https://higin.io" className={styles.footerLink}>
            <FaHome /> Home
          </a>
        </li>
        {/* <li>
          <a href="#" className={styles.footerLink}>
            <FaInfoCircle /> About
          </a>
        </li> */}
        <li>
          <a
            href="https://github.com/scumah/choose-your-colors"
            target="_blank"
            className={styles.footerLink}
          >
            <FaGithub /> Github
          </a>
        </li>
        <li>
          <ThemeToggler />
        </li>
      </ul>
    </footer>
  );
}
