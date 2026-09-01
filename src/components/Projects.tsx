"use client";

import { useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import type { ModalType, Project, ProjectCategory } from "@/types";

interface ProjectsProps {
  onOpenModal: (type: Extract<ModalType, "danone" | "odoo" | "estima">) => void;
}

const FILTERS: { value: ProjectCategory | "all"; key: "all" | "iiot" | "erp" | "enterprise" | "web" }[] = [
  { value: "all", key: "all" },
  { value: "iiot", key: "iiot" },
  { value: "erp", key: "erp" },
  { value: "enterprise", key: "enterprise" },
  { value: "web", key: "web" },
];

const BADGE_TONES: Record<Project["badgeTone"], string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  neutral: "text-slate-500",
};

export default function Projects({ onOpenModal }: ProjectsProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );

  return (
    <section id="proyectos" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            {t("projects", "tag")}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {t("projects", "title")}
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
          {t("projects", "subtitle")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {FILTERS.map((filterItem) => {
          const isActive = filter === filterItem.value;
          return (
            <button
              key={filterItem.value}
              type="button"
              onClick={() => setFilter(filterItem.value)}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "bg-slate-200/80 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {t("filters", filterItem.key)}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  onOpenModal: ProjectsProps["onOpenModal"];
}

function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const { t } = useLanguage();

  const title = project.titleKey ? t("projects", project.titleKey) : project.title;

  const badgeLabel = t("badges", project.badgeKey);

  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#111726]">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-semibold text-brand">{project.tag}</span>
          <span className={BADGE_TONES[project.badgeTone]}>{badgeLabel}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {t("projects", project.descKey)}
        </p>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
            {project.tech.map((techItem) => (
              <span
                key={techItem}
                className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800"
              >
                {techItem}
              </span>
            ))}
          </div>
        )}

        {project.satellites && (
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs">
            {project.satellites.map((satellite) => (
              <a
                key={satellite.href}
                href={satellite.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded bg-slate-50 p-1.5 border border-slate-200 transition-colors hover:border-brand dark:border-slate-800 dark:bg-slate-900"
              >
                <span>{satellite.name}</span>
                <ArrowUpRight size={10} className="text-slate-400" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium dark:border-slate-800/80">
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand hover:underline"
          >
            <span>{t("projects", project.link.labelKey)}</span>
            <ArrowUpRight size={10} />
          </a>
        )}

        {project.modal && (
          <button
            type="button"
            onClick={() => onOpenModal(project.modal as Extract<ModalType, "danone" | "odoo" | "estima">)}
            className={`flex items-center gap-1 transition-colors ${
              project.modalActionKey === "btn_private_summary"
                ? "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                : "text-brand hover:underline"
            }`}
          >
            {project.modalActionKey === "btn_private_summary" && <Lock size={10} />}
            <span>
              {t(
                "projects",
                project.modalActionKey === "btn_details"
                  ? "btn_details"
                  : project.modalActionKey === "btn_arch"
                    ? "btn_arch"
                    : "btn_private_summary",
              )}
            </span>
          </button>
        )}

        {project.satellitesFooterKey && (
          <span className="font-mono text-[11px] text-slate-500">
            {t("projects", project.satellitesFooterKey)}
          </span>
        )}

        {!project.link && !project.modal && !project.satellitesFooterKey && (
          <span className="text-slate-400 dark:text-slate-600">—</span>
        )}
      </div>
    </article>
  );
}