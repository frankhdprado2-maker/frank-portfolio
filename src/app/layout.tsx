import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frank Cristian Prado Ccopa | Desarrollador Web y Móvil",
  description:
    "Portafolio de Frank Cristian Prado Ccopa, especialista en desarrollo web, aplicaciones móviles, datos y automatización en Lima, Perú.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
