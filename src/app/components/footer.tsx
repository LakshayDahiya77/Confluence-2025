"use client";

import React from "react";
import { glassFooter, glassElement } from "./glassTokens";

const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ConfluenceNITKurukshetra",
    img: "/Social Media Logos/Youtube.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/confluence.nitkkr",
    img: "/Social Media Logos/instagram.png",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Conflu",
    img: "/Social Media Logos/Facebook.png",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className={`relative w-full left-0 ${glassFooter}`}>
      <div className="mx-auto flex max-w-7xl w-full flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Confluence 2025
            </h3>
            <p className="mt-1.5 text-xs text-slate-200/80 sm:mt-2 sm:text-sm">
              NIT Kurukshetra, Thanesar, Haryana - 136119
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:text-sky-300 sm:h-10 sm:w-10 ${glassElement}`}
              >
                <img
                  src={social.img}
                  alt={social.name}
                  className="h-5 w-5 object-contain"
                />

              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/12 pt-4 text-center sm:pt-6">
          <p className="text-xs text-slate-300/90 sm:text-sm">
            © 2025 Confluence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
