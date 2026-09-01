"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { ModalType } from "@/types";

interface TechModalProps {
  isOpen: boolean;
  modalType: ModalType;
  onClose: () => void;
}

export default function TechModal({ isOpen, modalType, onClose }: TechModalProps) {
  const { t } = useLanguage();

  const visible = isOpen && modalType !== null;

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const titleSection = modalType === "danone" ? "danone_title" : modalType === "odoo" ? "odoo_title" : "estima_title";
  const descSection = modalType === "danone" ? "danone_desc" : modalType === "odoo" ? "odoo_desc" : "estima_desc";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-[#111726]"
      >
        <div className="flex items-center justify-between">
          <h4 id="tech-modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
            {t("modals", titleSection)}
          </h4>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {t("modals", descSection)}
        </p>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {t("modals", "close")}
          </button>
        </div>
      </div>
    </div>
  );
}