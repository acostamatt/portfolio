"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Brand {
  name: string;
  logo?: string;
  darkLogo?: string;
  className?: string;
}

const ROW_1: Brand[] = [
  {
    name: "Danone",
    logo: "/logos/danone.png",
    darkLogo: "/logos/danone_white.png",
    className: "max-h-9 sm:max-h-11",
  },
  {
    name: "The Walt Disney Company",
    logo: "/logos/disney.png",
    className: "brightness-0 dark:brightness-100 max-h-10 sm:max-h-12",
  },
  {
    name: "Banco Falabella",
    logo: "/logos/falabella-banco.png",
    className: "brightness-0 dark:brightness-100 max-h-10 sm:max-h-12",
  },
  {
    name: "CMR Falabella",
    logo: "/logos/falabella-cmr.png",
    className: "brightness-0 dark:brightness-100 max-h-10 sm:max-h-12",
  },
  {
    name: "Seguros Falabella",
    logo: "/logos/falabella-seguros.png",
    className: "brightness-0 dark:brightness-100 max-h-10 sm:max-h-12",
  },
];

const ROW_2: Brand[] = [
  {
    name: "Cooperativa Tera",
    logo: "/logos/Texto_Logo_Azul_FdoBco.png",
    darkLogo: "/logos/tera_white.png",
    className: "max-h-11 sm:max-h-13",
  },
  {
    name: "Odoo ERP",
    logo: "/logos/odoo.png",
    className: "dark:brightness-125 max-h-10 sm:max-h-12",
  },
  {
    name: "Sintra Ingeniería",
    logo: "/logos/sintra.png",
    darkLogo: "/logos/sintra_white.png",
    className: "max-h-10 sm:max-h-12",
  },
  {
    name: "Edducity",
    logo: "/logos/edducity_light.png",
    darkLogo: "/logos/edducity.png",
    className: "max-h-14 sm:max-h-16",
  },
  {
    name: "Aprepa",
    logo: "/logos/aprepa.png",
    darkLogo: "/logos/aprepa_white.png",
    className: "max-h-9 sm:max-h-11",
  },
];

export function ClientsMarquee() {
  const { t } = useLanguage();

  const renderLogoCard = (brand: Brand, idx: number) => (
    <div
      key={`${brand.name}-${idx}`}
      className="group/card flex h-20 sm:h-22 min-w-[210px] sm:min-w-[240px] items-center justify-center rounded-2xl border border-slate-200/80 bg-white/70 px-6 shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-brand/50 hover:shadow-md dark:border-slate-800/80 dark:bg-[#111726]/80 dark:hover:border-brand/50"
    >
      {brand.logo ? (
        <div className="relative flex h-14 sm:h-16 w-full items-center justify-center">
          {brand.darkLogo ? (
            <>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={60}
                className={`w-auto object-contain opacity-85 transition-opacity duration-300 group-hover/card:opacity-100 dark:hidden ${
                  brand.className || "max-h-11 sm:max-h-13"
                }`}
              />
              <Image
                src={brand.darkLogo}
                alt={brand.name}
                width={200}
                height={60}
                className={`hidden w-auto object-contain opacity-90 transition-opacity duration-300 group-hover/card:opacity-100 dark:block ${
                  brand.className || "max-h-11 sm:max-h-13"
                }`}
              />
            </>
          ) : (
            <Image
              src={brand.logo}
              alt={brand.name}
              width={200}
              height={60}
              className={`w-auto object-contain opacity-85 transition-opacity duration-300 group-hover/card:opacity-100 dark:opacity-90 ${
                brand.className || "max-h-11 sm:max-h-13"
              }`}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-brand dark:text-[#7ba1ee]" />
          <span
            className={
              brand.className ||
              "text-sm font-bold text-slate-700 dark:text-slate-300"
            }
          >
            {brand.name}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="clientes"
      aria-label={t("clients", "title")}
      className="no-print space-y-6 overflow-hidden py-4 scroll-mt-20"
    >
      <div>
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand dark:text-[#7ba1ee]">
          {t("clients", "tag") || "# TRAYECTORIA & CLIENTES"}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("clients", "title") || "Ecosistemas y Marcas con las que trabajé"}
        </h2>
      </div>

      {/* Contenedor con máscara de desvanecimiento en los extremos */}
      <div className="group/marquee relative w-full space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Fila 1: Derecha a Izquierda */}
        <div className="animate-marquee flex gap-4">
          {[...ROW_1, ...ROW_1, ...ROW_1].map((b, i) => renderLogoCard(b, i))}
        </div>

        {/* Fila 2: Izquierda a Derecha */}
        <div className="animate-marquee-reverse flex gap-4">
          {[...ROW_2, ...ROW_2, ...ROW_2].map((b, i) =>
            renderLogoCard(b, i)
          )}
        </div>
      </div>
    </section>
  );
}

export default ClientsMarquee;
