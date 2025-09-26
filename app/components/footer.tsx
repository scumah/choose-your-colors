"use client";

import React, { useState } from "react";

import { FaHome, FaInfoCircle, FaGithub } from "react-icons/fa";

import ThemeToggler from "./themeToggler";
import HowItWorksModal from "./howItWorksModal";

import layoutStyles from "../layout.module.css";
import styles from "./footer.module.css";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <footer className={layoutStyles.main}>
      <ul className={styles.footerElements}>
        <li>
          <a href="https://higin.io" className={styles.footerLink}>
            <FaHome /> Home
          </a>
        </li>
        <li>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.footerLink}
          >
            <FaInfoCircle /> How it works
          </button>
        </li>
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
      <HowItWorksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}
