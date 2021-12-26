import Link from "next/link";
import s from "./Footer.module.css";

import Logo from "components/icons/Logo";
import GitHub from "components/icons/GitHub";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-gray-900">
      <div className="grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 bg-gray-900 border-b border-gray-600 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex items-center flex-initial font-bold md:mr-24">
              <span className="mr-2 border border-gray-700 rounded-full">
                <Logo />
              </span>
              <span>ACME</span>
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  Home
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  About
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  Careers
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold text-white transition duration-150 ease-in-out hover:text-gray-200">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/">
                <a className="text-white transition duration-150 ease-in-out hover:text-gray-200">
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-start col-span-1 text-white lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 bg-gray-900 md:flex-row">
        <div>
          <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center">
          <span className="text-white">Crafted by</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="inline-block h-6 ml-4 text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
