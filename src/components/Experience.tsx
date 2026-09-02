"use client";

import { FileDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/types";

const DOT_CLASSES: Record<ExperienceItem["accent"], string> = {
  brand: "bg-brand",
  muted: "bg-slate-400 dark:bg-slate-700",
};

export default function Experience() {
  const { t, lang } = useLanguage();

  return (
    <section id="experiencia" className="space-y-6 scroll-mt-20">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand dark:text-[#7ba1ee]">
            {t("experience", "tag")}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {t("experience", "title")}
          </h2>
        </div>
        <a
          href={lang === "es" ? "/cvs/CV_Es_Acosta_Matias.pdf" : "/cvs/CV_En_Acosta_Matias.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          download={lang === "es" ? "CV_Es_Acosta_Matias.pdf" : "CV_En_Acosta_Matias.pdf"}
          className="group no-print inline-flex items-center gap-2 rounded-xl border border-brand/40 bg-brand/10 px-3.5 py-2 font-mono text-xs font-semibold text-brand shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white hover:shadow-md active:scale-95 dark:border-[#7ba1ee]/40 dark:bg-[#7ba1ee]/10 dark:text-[#7ba1ee] dark:hover:border-transparent dark:hover:bg-[#395CAA] dark:hover:text-white"
          title={lang === "es" ? "Descargar CV completo en PDF" : "Download full CV in PDF"}
        >
          <FileDown className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>{t("experience", "btn_cv_full")}</span>
          <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand group-hover:bg-white/20 group-hover:text-white dark:bg-[#7ba1ee]/20 dark:text-[#7ba1ee]">
            PDF
          </span>
        </a>
      </div>

      <div className="space-y-6 border-l-2 border-slate-200 pl-4 sm:pl-6 dark:border-slate-800">
        {experience.map((item) => (
          <div key={item.role} className="relative">
            <span
              className={`absolute -left-[23px] top-1.5 h-3 w-3 rounded-full sm:-left-[31px] ${DOT_CLASSES[item.accent]}`}
            />
            <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.role}</h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{item.period}</span>
            </div>
            <div className="mb-1.5 text-xs font-semibold text-brand dark:text-[#7ba1ee]">{item.company}</div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {t("experience", item.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}