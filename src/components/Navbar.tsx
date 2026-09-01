"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { siteLangLabels } from "@/data/translations";

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
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-[#0A0E17]/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-mono text-sm font-bold text-white">
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

        <nav className="hidden items-center gap-1.5 text-sm text-slate-600 md:flex dark:text-slate-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-1.5 font-medium text-slate-600 transition-all hover:bg-slate-200/70 hover:font-semibold hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
            >
              {t(link.section, link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Cambiar idioma"
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {siteLangLabels[lang === "es" ? "en" : "es"]}
          </button>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Cambiar tema"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contacto"
            className="hidden rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-hover sm:inline-flex"
          >
            {t("nav", "cta")}
          </a>
        </div>
      </div>
    </header>
  );
}