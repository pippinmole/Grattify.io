import Link from "next/link"

export default function Footer() {

  return (
    <footer className="mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 dark:border-slate-50/5 py-10">
        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2023 Daily Gratitude. All rights reserved.
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <Link href="/policy">Privacy policy</Link>
          {/*<div className="h-4 w-px bg-slate-500/20"></div>*/}
          {/*<Link href="/changelog">Changelog</Link>*/}
        </div>
      </div>
    </footer>
  )
}
