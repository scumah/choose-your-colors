import Link from "next/link";

import styles from "./not-found.module.css";
import layoutStyles from "./layout.module.css";

export default function Custom404() {
  return (
    <div className={`${layoutStyles.main} ${styles.main}`}>
      <h1>There&apos;s nothing here :(</h1>
      <p className={styles.goHomeLinkWrapper}>
        <Link className={styles.goHomeLink} href="/">
          Let&apos;s take you to the app
        </Link>
      </p>
    </div>
  );
}
