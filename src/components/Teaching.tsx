import { useLanguage } from "@/context/LanguageContext";
import { teaching } from "@/data/experience";
import { GithubIcon } from "@/components/icons";

export default function Teaching() {
  const { t } = useLanguage();

  return (
    <section id="docencia" className="space-y-4 scroll-mt-20">
      <div>
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand dark:text-[#7ba1ee]">
          {t("teaching", "tag")}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("teaching", "title")}
        </h2>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111726]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/ispi4038.png"
                alt="Logo Instituto N° 4038 Juan Pablo II"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t("teaching", "role")}
              </h3>
              <span className="block text-xs font-semibold text-brand dark:text-[#7ba1ee]">
                Instituto Superior Particular N° 4038 «Juan Pablo II» (Roldán, Santa Fe)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Mayo 2021 – Actualidad
            </span>
            <a
              href="https://github.com/acosta4038"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-slate-600 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-400 dark:hover:text-[#7ba1ee]"
            >
              <GithubIcon className="h-3.5 w-3.5" /> github.com/acosta4038
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1 text-xs sm:grid-cols-3">
          {teaching.map((subject) => (
            <div
              key={subject.name}
              className="rounded border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900"
            >
              <strong className="mb-0.5 block text-slate-900 dark:text-white">
                {subject.name}
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {t("teaching", subject.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}