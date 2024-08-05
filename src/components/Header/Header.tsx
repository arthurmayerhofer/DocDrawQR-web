"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-colors duration-300 ease-in-out py-0 ${
        scrolled ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="container mx-auto flex justify-between items-center py-0">
        <div className="flex items-center transition duration-300 ease-in-out transform hover:scale-105">
          <Image
            src="/logo-ddqr.png"
            alt="Logo"
            width={90}
            height={50}
            className={`transition duration-1000 ease-in-out ${
              scrolled
                ? "filter invert brightness-100"
                : "filter invert brightness-0"
            }`}
          />
          {/* <span className="ml-4 text-xl font-semibold">DocDraw QR</span> */}
        </div>
        <nav className="flex space-x-4">
          <a
            href="#about"
            className={`text-sm transition duration-300 ease-in-out ${
              scrolled
                ? "text-gray-900 hover:text-gray-700"
                : "text-gray-300 hover:text-gray-100"
            }`}
          >
            Sobre
          </a>
          <a
            href="#contact"
            className={`text-sm transition duration-300 ease-in-out ${
              scrolled
                ? "text-gray-900 hover:text-gray-700"
                : "text-gray-300 hover:text-gray-100"
            }`}
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
