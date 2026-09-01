"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";

const EMAIL = "macosta@tera.coop.ar";
const WHATSAPP_URL = "https://wa.me/5493415152771";
const LINKEDIN_URL = "https://www.linkedin.com/in/acostamati";

const REPOS = [
  { label: "acostamatt (Personal)", href: "https://github.com/acostamatt" },
  { label: "CoopTera (Cooperativa)", href: "https://github.com/CoopTera/" },
  { label: "acosta4038 (Educativo)", href: "https://github.com/acosta4038" },
];

export default function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contacto" className="space-y-6 border-t border-slate-200 pt-6 scroll-mt-20 dark:border-slate-800">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("contact", "title")}
          </h3>
          <p className="font-mono text-xs text-slate-500">{t("contact", "location")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400"
          >
            <WhatsappIcon className="h-3.5 w-3.5" /> {t("contact", "whatsapp")}
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 font-mono text-xs text-slate-700 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:text-slate-300"
          >
            {copied ? <Check size={14} /> : <Mail size={14} />}
            {copied ? t("contact", "copied") : EMAIL}
          </button>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-700 dark:text-slate-300 dark:hover:text-[#7ba1ee]"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-100/60 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/40">
        <span className="font-mono text-slate-600 dark:text-slate-400">{t("contact", "repos")}</span>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          {REPOS.map((repo, index) => (
            <span key={repo.href} className="flex items-center gap-3">
              {index > 0 && <span className="text-slate-400">•</span>}
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-700 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-300 dark:hover:text-[#7ba1ee]"
              >
                <GithubIcon className="h-3 w-3" /> {repo.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      <div className="pb-4 text-center font-mono text-[11px] text-slate-400 dark:text-slate-500">
        © 2026 Matias Acosta • Cooperativa Tera • Rosario, Santa Fe
      </div>
    </footer>
  );
}