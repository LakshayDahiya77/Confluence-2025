"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { glassPanel } from "./glassTokens";
import { useActiveSection } from "./ActiveSectionContext";

const navLinks = [
  { name: "Home", id: "home", link: "/" },
  { name: "Gallery", id: "gallery", link: "/Gallery" },
  { name: "Events", id: "events", link: "/Events" },
  { name: "Developers", id: "developers", link: "/Developers" },
  { name: "Teams", id: "teams", link: "/Teams" },
  { name: "Sponsors", id: "sponsors", link: "/Sponsors" },
];

const GlassNavBar: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0 });
  const [indicatorReady, setIndicatorReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(false);
  const pathname = usePathname();
  const { activeSection, setActiveSection } = useActiveSection();
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const isHome = pathname === "/";

  // Hide navbar during intro video on homepage
  useEffect(() => {
    if (!isHome) {
      setShouldShowNavbar(true);
      return;
    }

    // Check if intro has been completed (stored in sessionStorage)
    const introComplete = sessionStorage.getItem("introComplete");
    if (introComplete === "true") {
      setShouldShowNavbar(true);
      return;
    }

    // Initially hide navbar on homepage
    setShouldShowNavbar(false);

    // Listen for intro completion event
    const handleIntroComplete = () => {
      setShouldShowNavbar(true);
      sessionStorage.setItem("introComplete", "true");
    };

    window.addEventListener("introComplete", handleIntroComplete);

    // Check periodically if we should show navbar (fallback)
    const checkInterval = setInterval(() => {
      const introCompleteFlag = sessionStorage.getItem("introComplete");
      if (introCompleteFlag === "true") {
        setShouldShowNavbar(true);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      window.removeEventListener("introComplete", handleIntroComplete);
      clearInterval(checkInterval);
    };
  }, [isHome]);

  const getActiveLink = () => {
    if (isHome) {
      const activeFromSection = navLinks.find(
        (link) => link.id === activeSection
      );
      return activeFromSection ?? navLinks[0];
    }

    const active = navLinks.find((link) => link.link === pathname);
    return active ?? navLinks[0];
  };

  const updateIndicator = (linkId: string) => {
    const tabElement = tabRefs.current[linkId];
    const container = tabsContainerRef.current;

    if (!tabElement || !container) {
      return;
    }

    const tabRect = tabElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const left = tabRect.left - containerRect.left;
    const width = tabRect.width;
    const height = tabRect.height;

    setIndicator({ left, width, height });
    setIndicatorReady(true);
  };

  useEffect(() => {
    const active = getActiveLink();
    if (!active) return;

    const raf = requestAnimationFrame(() => {
      updateIndicator(active.id);
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection, isHome]);

  useEffect(() => {
    const handleResize = () => {
      const active = getActiveLink();
      if (!active) return;
      updateIndicator(active.id);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, activeSection, isHome]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest(".mobile-nav-container")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = (
    event: React.MouseEvent,
    link: (typeof navLinks)[0]
  ) => {
    if (isHome) {
      event.preventDefault();

      // Special handling for Home - scroll to top
      if (link.id === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const section = document.getElementById(link.id);
        if (section) {
          // Calculate navbar height + padding for offset
          // Mobile: ~56px (navbar) + 8px (top-2) + 16px (buffer) = 80px
          // Desktop: ~64px (navbar) + 16px (top-4) + 16px (buffer) = 96px
          const isMobile = window.innerWidth < 640;
          const offset = isMobile ? 80 : 96;

          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }

    updateIndicator(link.id);

    if (isHome) {
      setActiveSection(link.id);
    }

    // Close mobile menu after click
    setMobileMenuOpen(false);
  };

  // Don't render navbar if it should be hidden
  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <>
      <nav className="mobile-nav-container fixed top-2 left-1/2 z-50 w-[min(96vw,800px)] -translate-x-1/2 sm:top-4">
        {/* Main navbar container */}
        <div
          onMouseLeave={() => setHoveredLink(null)}
          className={`flex items-center justify-between gap-2 overflow-hidden rounded-2xl px-3 py-2 sm:rounded-full sm:px-3 sm:py-1.5 md:px-4 md:py-2 ${glassPanel}`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center px-1 py-1 sm:px-2 sm:py-0 md:px-3"
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setActiveSection("home");
                updateIndicator("home");
              }
              setMobileMenuOpen(false);
            }}
          >
            <Image
              src="/conflu25White.png"
              width={120}
              height={40}
              alt="Confluence Logo"
              className="h-6 w-auto sm:h-8 md:h-10"
              priority
            />
          </Link>

          {/* Desktop navigation links */}
          <div
            ref={tabsContainerRef}
            className="hidden sm:flex tabs-scroll relative flex-1 items-center justify-center gap-0.5 overflow-x-auto overflow-y-hidden sm:gap-1 md:gap-1.5"
            style={{
              minHeight: indicatorReady ? indicator.height : undefined,
              scrollbarWidth: "none",
            }}
          >
            {indicatorReady && (
              <motion.div
                aria-hidden
                initial={false}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 30,
                  mass: 0.8,
                  restDelta: 0.001,
                }}
                className="pointer-events-none absolute top-1/2 -z-10 border border-sky-400/40 bg-sky-500/30"
                style={{
                  transform: "translateY(-50%)",
                  height: `${indicator.height}px`,
                  borderRadius: indicator.height
                    ? `${indicator.height / 2}px`
                    : "999px",
                }}
              />
            )}

            {navLinks.map((link) => {
              const isActive = isHome
                ? activeSection === link.id
                : pathname === link.link;

              return (
                <Link
                  key={link.id}
                  href={link.link}
                  ref={(el) => {
                    tabRefs.current[link.id] = el;
                  }}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onFocus={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onBlur={() => setHoveredLink(null)}
                  onClick={(event) => handleLinkClick(event, link)}
                  className={`relative flex items-center justify-center rounded-full px-2.5 py-1.5 transition-colors capitalize text-[11px] sm:text-xs sm:px-3 sm:py-1.5 md:text-sm md:px-4 md:py-2 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-100/90 hover:text-white"
                  }`}
                >
                  {hoveredLink === link.id && !isActive && (
                    <motion.span
                      layoutId="hover-pill"
                      className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/15"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-5 h-5 flex flex-col items-center justify-center gap-1">
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 !bg-white rounded-full origin-center"
                style={{ backgroundColor: "#ffffff" }}
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  scale: mobileMenuOpen ? 0.8 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 !bg-white rounded-full"
                style={{ backgroundColor: "#ffffff" }}
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 !bg-white rounded-full origin-center"
                style={{ backgroundColor: "#ffffff" }}
              />
            </div>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`sm:hidden mt-2 overflow-hidden rounded-2xl ${glassPanel}`}
            >
              <div className="flex flex-col py-2">
                {navLinks.map((link) => {
                  const isActive = isHome
                    ? activeSection === link.id
                    : pathname === link.link;

                  return (
                    <Link
                      key={link.id}
                      href={link.link}
                      onClick={(event) => handleLinkClick(event, link)}
                      className={`relative px-6 py-3 transition-colors capitalize text-sm ${
                        isActive
                          ? "text-white font-semibold bg-sky-500/20"
                          : "text-slate-100/90 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-bg"
                          className="absolute inset-0 bg-sky-500/20 border-l-2 border-sky-400"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style jsx>{`
        .tabs-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default GlassNavBar;
