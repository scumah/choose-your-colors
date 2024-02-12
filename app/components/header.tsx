"use client";

import React from "react";

import { Archivo_Black } from "next/font/google";

const archivo = Archivo_Black({ subsets: ["latin"], weight: "400" });

import layoutStyles from "../layout.module.css";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header
      className={`${styles.title} ${layoutStyles.main} ${archivo.className}`}
    >
      <div className={styles.titleSmall}>CHOOSE YOUR</div>
      <div className={styles.titleBig}>COLORS</div>
    </header>
  );
}
