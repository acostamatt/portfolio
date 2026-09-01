"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";
import TechModal from "@/components/TechModal";
import type { ModalType } from "@/types";

export default function Home() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = useCallback(
    (type: Extract<ModalType, "danone" | "odoo" | "estima">) => setModalType(type),
    [],
  );
  const closeModal = useCallback(() => setModalType(null), []);

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-20 px-4 py-10 sm:px-6">
        <Hero />
        <Projects onOpenModal={openModal} />
        <Experience />
        <Teaching />
        <TechStack />
        <Footer />
      </main>
      <TechModal isOpen={modalType !== null} modalType={modalType} onClose={closeModal} />
    </div>
  );
}