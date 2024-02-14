import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";

import Header from "./components/header";
import Footer from "./components/footer";

import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team colors",
  description: "Choose a sports team to support from their colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Providers>
          <div className={styles.mainWrapper}>
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
