import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-slate-200 py-6 sm:py-10 dark:border-slate-800/80">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-md border border-slate-300/50 bg-slate-200/70 px-3 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>{t("hero", "badge")}</span>
        </div>

        <h1 className="text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {t("hero", "title")}
        </h1>

        <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {t("hero", "desc")}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-medium">
          <a
            href="#proyectos"
            className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-white transition-colors hover:bg-brand-hover"
          >
            <span>{t("hero", "cta_projects")}</span>
            <ArrowRight size={14} />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/acostamatt"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Personal"
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-700 transition-colors hover:border-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <GithubIcon className="h-4 w-4" /> acostamatt
            </a>
            <a
              href="https://www.linkedin.com/in/acostamati"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-700 transition-colors hover:border-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <LinkedinIcon className="h-4 w-4" /> acostamati
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}