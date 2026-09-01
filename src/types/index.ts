export type Lang = "es" | "en";

export type ProjectCategory = "iiot" | "erp" | "enterprise" | "web";

export type ModalType = "danone" | "odoo" | "estima" | null;

export interface ProjectLink {
  href: string;
  labelKey: "link_live" | "link_demo";
}

export interface SatelliteLink {
  name: string;
  href: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  tag: string;
  badgeKey: "prod" | "countries7" | "nda" | "staging" | "mp" | "afip" | "more_apps";
  badgeTone: "success" | "warning" | "neutral";
  title: string;
  titleKey?: "other_title";
  descKey:
    | "proj_terasync"
    | "proj_danone"
    | "proj_odoo"
    | "proj_estima"
    | "proj_agro"
    | "proj_edducity"
    | "proj_tramite"
    | "proj_facturador"
    | "proj_other";
  tech: string[];
  link?: ProjectLink;
  modal?: Extract<ModalType, "danone" | "odoo" | "estima">;
  modalActionKey?: "btn_details" | "btn_arch" | "btn_private_summary";
  satellites?: SatelliteLink[];
  satellitesFooterKey?: "text_live_demos";
  image?: string;
  logo?: string;
  company?: string;
}

export type ExperienceItemDescKey = "tera" | "danone" | "falabella";

export type ExperienceAccent = "brand" | "muted";

export interface ExperienceItem {
  role: string;
  period: string;
  company: string;
  descKey: ExperienceItemDescKey;
  accent: ExperienceAccent;
}

export interface TeachingItem {
  name: string;
  descKey: "so" | "is1" | "is2";
}