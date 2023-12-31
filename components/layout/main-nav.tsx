"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavLinks } from "../../helpers/navlinks-utils";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileNav from "./mobile-nav";

const MainNavigation = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const navLinks = getNavLinks();

  const pathName = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleDarkTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header>
      <nav className="flex items-center justify-between pt-5 pb-8 px-12 text-3xl font-semibold sm:px-2">
        <div className="font-bold text-4xl hover:scale-105 sm:text-3xl">
          <Link href="/">Cassy Van</Link>
        </div>
        <ul className="flex ">
          <div className="sm:hidden flex gap-8 space-x-4">
            {navLinks.map((link) => (
              <li
                key={link.toLowerCase()}
                className="hover:text-red-300 dark:hover:text-sky-200"
              >
                <Link
                  href={`/${link.toLowerCase()}`}
                  className={
                    pathName === `/${link.toLowerCase()}`
                      ? "text-red-400 dark:text-sky-300"
                      : ""
                  }
                >
                  {link}
                </Link>
              </li>
            ))}
          </div>
          <li className="pt-2 px-6">
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125"
                onClick={toggleDarkTheme}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125"
                onClick={toggleDarkTheme}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </li>
          <li className="hidden sm:flex cursor-pointer">
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleMenu}
              className="hover:text-red-300 dark:hover:text-sky-200"
            />
          </li>
        </ul>
      </nav>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
    </header>
  );
};

export default MainNavigation;
