"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Boxes,
  Database,
  Layout,
  Lock,
  Radio,
  Server,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import type { ModalType, Project, ProjectCategory } from "@/types";

interface ProjectsProps {
  onOpenModal: (type: Extract<ModalType, "danone" | "odoo" | "estima">) => void;
}

const FILTERS: {
  value: ProjectCategory | "all";
  key: "all" | "iiot" | "erp" | "enterprise" | "web";
}[] = [
  { value: "all", key: "all" },
  { value: "iiot", key: "iiot" },
  { value: "erp", key: "erp" },
  { value: "enterprise", key: "enterprise" },
  { value: "web", key: "web" },
];

const BADGE_TONES: Record<Project["badgeTone"], string> = {
  success:
    "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300",
  warning:
    "border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300",
  neutral:
    "border-slate-300/40 bg-slate-100 text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300",
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
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand dark:text-[#7ba1ee]">
            {t("projects", "tag")}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {t("projects", "title")}
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
          {t("projects", "subtitle")}
        </p>
      </div>

      {/* Accessible Filter Tabs */}
      <div
        role="tablist"
        aria-label={t("projects", "title")}
        className="flex flex-wrap gap-2 font-mono text-xs"
      >
        {FILTERS.map((filterItem) => {
          const isActive = filter === filterItem.value;
          return (
            <button
              key={filterItem.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="projects-grid"
              onClick={() => setFilter(filterItem.value)}
              className={`rounded-lg px-3.5 py-1.5 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                isActive
                  ? "bg-brand text-white shadow-sm font-semibold"
                  : "bg-slate-200/80 text-slate-700 hover:bg-slate-300/90 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700/90"
              }`}
            >
              {t("filters", filterItem.key)}
            </button>
          );
        })}
      </div>

      {/* Projects Grid with smooth transition */}
      <div
        id="projects-grid"
        role="tabpanel"
        className="grid grid-cols-1 gap-5 transition-all duration-300 ease-out md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isPriority={index < 2}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  isPriority: boolean;
  onOpenModal: ProjectsProps["onOpenModal"];
}

function ProjectCard({ project, isPriority, onOpenModal }: ProjectCardProps) {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const title = project.titleKey ? t("projects", project.titleKey) : project.title;
  const badgeLabel = t("badges", project.badgeKey);

  const imageSrc = project.image ?? `/projects/${project.id}.webp`;
  const logoSrc = project.logo ?? `/logos/${project.id}.svg`;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-brand/50 hover:shadow-md dark:border-slate-800 dark:bg-[#111726] dark:hover:border-slate-700">
      {/* Visual Asset Container (Preview or High-Tech Fallback) */}
      <div className="relative h-44 w-full overflow-hidden border-b border-slate-100 bg-slate-100 sm:h-48 dark:border-slate-800/80 dark:bg-slate-900">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={`Previsualización de ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isPriority}
            loading={isPriority ? undefined : "lazy"}
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProjectVisualFallback project={project} />
        )}

        {/* Top Floating Overlay (Tag & Status Badge) */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            {!logoError && (
              <div className="relative flex h-6 w-6 items-center justify-center rounded-md border border-slate-200/80 bg-white/95 p-1 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/90">
                <Image
                  src={logoSrc}
                  alt={project.company ?? title}
                  width={16}
                  height={16}
                  onError={() => setLogoError(true)}
                  className="object-contain"
                />
              </div>
            )}
            <span className="rounded-md border border-slate-200/80 bg-white/90 px-2 py-0.5 font-mono text-[11px] font-semibold text-brand backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-[#7ba1ee]">
              {project.tag}
            </span>
          </div>

          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium backdrop-blur ${BADGE_TONES[project.badgeTone]}`}
          >
            {badgeLabel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-2.5">
          <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-brand dark:text-white dark:group-hover:text-[#7ba1ee]">
            {title}
          </h3>

          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {t("projects", project.descKey)}
          </p>

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1 font-mono text-[11px]">
              {project.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
                  className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 p-1.5 text-slate-700 transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-300"
                >
                  <span className="truncate">{satellite.name}</span>
                  <ArrowUpRight size={10} className="shrink-0 text-slate-400" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold dark:border-slate-800/80">
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-[#7ba1ee] dark:hover:text-blue-300"
            >
              <span>{t("projects", project.link.labelKey)}</span>
              <ArrowUpRight size={12} />
            </a>
          )}

          {project.modal && (
            <button
              type="button"
              onClick={() =>
                onOpenModal(
                  project.modal as Extract<ModalType, "danone" | "odoo" | "estima">,
                )
              }
              className={`inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                project.modalActionKey === "btn_private_summary"
                  ? "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  : "text-brand hover:text-brand-hover hover:underline dark:text-[#7ba1ee] dark:hover:text-blue-300"
              }`}
            >
              {project.modalActionKey === "btn_private_summary" && <Lock size={12} />}
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
            <span className="font-mono text-[11px] font-normal text-slate-500 dark:text-slate-400">
              {t("projects", project.satellitesFooterKey)}
            </span>
          )}

          {!project.link && !project.modal && !project.satellitesFooterKey && (
            <span className="text-slate-400 dark:text-slate-600">—</span>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Visual fallback when preview images are not yet present in /public/projects/
 * High-tech & minimalist aesthetic with subtle grid texture and category-specific iconography.
 */
function ProjectVisualFallback({ project }: { project: Project }) {
  const renderCategoryIcon = () => {
    switch (project.category) {
      case "iiot":
        return <Radio className="h-10 w-10 text-brand/70 dark:text-[#7ba1ee]/70" />;
      case "erp":
        return <Database className="h-10 w-10 text-brand/70 dark:text-[#7ba1ee]/70" />;
      case "enterprise":
        return <Server className="h-10 w-10 text-brand/70 dark:text-[#7ba1ee]/70" />;
      case "web":
      default:
        return <Layout className="h-10 w-10 text-brand/70 dark:text-[#7ba1ee]/70" />;
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-[#D5DEEF]/40 p-4 transition-colors dark:from-[#0A0E17] dark:via-[#111726] dark:to-[#17223b]">
      {/* Subtle high-tech geometric grid lines pattern */}
      <svg
        className="absolute inset-0 h-full w-full stroke-slate-200/70 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-slate-800/70"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${project.id}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 20V.5H20" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill={`url(#grid-${project.id})`} />
      </svg>

      {/* Centered Minimalist Visual Accent */}
      <div className="relative flex flex-col items-center justify-center space-y-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110 dark:border-slate-700/80 dark:bg-slate-900/80">
          {renderCategoryIcon()}
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Boxes className="h-3 w-3 text-brand dark:text-[#7ba1ee]" />
          <span>{project.category}</span>
        </div>
      </div>
    </div>
  );
}