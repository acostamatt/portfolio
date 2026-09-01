"use client";

import { useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const visible = isOpen && modalType !== null;

  useEffect(() => {
    if (!visible) return;

    // Save previous active element to restore focus when closing
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Restore focus to previous element
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const titleSection =
    modalType === "danone"
      ? "danone_title"
      : modalType === "odoo"
        ? "odoo_title"
        : "estima_title";
  const descSection =
    modalType === "danone"
      ? "danone_desc"
      : modalType === "odoo"
        ? "odoo_desc"
        : "estima_desc";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-modal-title"
      aria-describedby="tech-modal-desc"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity"
    >
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg space-y-3.5 rounded-xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-[#111726]"
      >
        <div className="flex items-center justify-between gap-3">
          <h4
            id="tech-modal-title"
            className="text-base font-bold text-slate-900 dark:text-white"
          >
            {t("modals", titleSection)}
          </h4>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("modals", "close")}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <p
          id="tech-modal-desc"
          className="text-xs leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {t("modals", descSection)}
        </p>

        <div className="flex justify-end pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {t("modals", "close")}
          </button>
        </div>
      </div>
    </div>
  );
}