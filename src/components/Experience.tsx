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
  const { t } = useLanguage();

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
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print flex items-center gap-1.5 font-mono text-xs text-slate-600 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-400 dark:hover:text-[#7ba1ee]"
        >
          <FileDown size={14} />
          <span>{t("experience", "btn_cv_full")}</span>
        </button>
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