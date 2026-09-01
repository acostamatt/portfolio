"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { siteLangLabels } from "@/data/translations";

const emptySubscribe = () => () => {};

const NAV_LINKS = [
  { href: "#proyectos", section: "nav" as const, key: "projects" as const },
  { href: "#experiencia", section: "nav" as const, key: "experience" as const },
  { href: "#docencia", section: "nav" as const, key: "teaching" as const },
  { href: "#stack", section: "nav" as const, key: "stack" as const },
  { href: "#contacto", section: "nav" as const, key: "contact" as const },
];

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on Escape key press or click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const isDark = mounted && resolvedTheme === "dark";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-[#0A0E17]/90"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-mono text-sm font-bold text-white shadow-sm">
            MA
          </div>
          <div>
            <span className="block text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Matias Acosta
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {t("nav", "role")}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 text-sm md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-1.5 font-semibold text-slate-700 transition-all hover:bg-slate-200/60 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white"
            >
              {t(link.section, link.key)}
            </a>
          ))}
        </nav>

        {/* Actions (Lang, Theme, CTA, Mobile Trigger) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Cambiar idioma / Switch language"
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {siteLangLabels[lang === "es" ? "en" : "es"]}
          </button>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Cambiar tema de color / Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contacto"
            className="hidden rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:inline-flex"
          >
            {t("nav", "cta")}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={t("nav", mobileMenuOpen ? "close_menu" : "open_menu")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-lg md:hidden dark:border-slate-800 dark:bg-[#0A0E17]/95"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200/60 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white"
              >
                {t(link.section, link.key)}
              </a>
            ))}

            <div className="pt-2">
              <a
                href="#contacto"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {t("nav", "cta")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}