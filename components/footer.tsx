import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {

  return (
      <footer className="mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-900/5 dark:border-slate-50/5 py-10">
          <p className="mt-5 text-center text-sm leading-6 text-slate-500">
              © 2023 Daily Gratitude. All rights reserved.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
            <Link href="/policy">Privacy policy</Link>
            <div className="h-4 w-px bg-slate-500/20"></div>
            <Link href="/changelog">Changelog</Link></div>
        </div>
      </footer>
  )

  // return (
  //   <footer className={styles.footer}>
  //     <hr />
  //     <ul className={styles.navItems}>
  //       <li className={styles.navItem}>
  //         <a href="https://next-auth.js.org">Documentation</a>
  //       </li>
  //       <li className={styles.navItem}>
  //         <a href="https://www.npmjs.com/package/next-auth">NPM</a>
  //       </li>
  //       <li className={styles.navItem}>
  //         <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
  //       </li>
  //       <li className={styles.navItem}>
  //         <Link href="/policy">Policy</Link>
  //       </li>
  //       <li className={styles.navItem}>
  //         <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
  //       </li>
  //     </ul>
  //   </footer>
  // )
}
