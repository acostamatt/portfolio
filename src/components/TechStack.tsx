import { useLanguage } from "@/context/LanguageContext";

interface StackLayer {
  layerKey: "layer_backend" | "layer_erp" | "layer_cloud" | "layer_frontend";
  items: string[];
}

export default function TechStack() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";

  const layers: StackLayer[] = [
    {
      layerKey: "layer_backend",
      items: ["PHP / Laravel", "Python / Django", "PostgreSQL / MySQL", "Redis Streams"],
    },
    {
      layerKey: "layer_erp",
      items: [
        "Odoo 18 / 19",
        "AFIP / ARCA (WSFE)",
        isEn
          ? "Node-RED (IoT Connection Interface & Middleware)"
          : "Node-RED (Interfaz de Conexión & Middleware IoT)",
        isEn ? "PLC Telemetry / MQTT" : "Telemetría de PLCs / MQTT",
      ],
    },
    {
      layerKey: "layer_cloud",
      items: ["Docker & Compose", "Linux (Debian/Ubuntu)", "AWS (Lambda, S3)", "NGINX / CI-CD"],
    },
    {
      layerKey: "layer_frontend",
      items: ["Next.js / React", "TypeScript / Tailwind", "Mercado Pago API", "Gigya Identity SSO"],
    },
  ];

  return (
    <section id="stack" className="space-y-4 scroll-mt-20">
      <div>
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand dark:text-[#7ba1ee]">
          {t("stack", "tag")}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          {t("stack", "title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {layers.map((layer) => (
          <div
            key={layer.layerKey}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111726]"
          >
            <h3 className="mb-2 text-xs font-bold text-slate-900 dark:text-white">
              {t("stack", layer.layerKey)}
            </h3>
            <ul className="space-y-1.5 font-mono text-xs text-slate-600 dark:text-slate-300">
              {layer.items.map((item) => {
                const isHighlighted = item.includes("Node-RED");
                return (
                  <li
                    key={item}
                    className={
                      isHighlighted
                        ? "flex items-center gap-1 font-bold text-brand dark:text-[#7ba1ee]"
                        : "flex items-center gap-1"
                    }
                  >
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}