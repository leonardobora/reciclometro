import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IMG } from "@/lib/images";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reciclômetro da Cidade | Gestão de resíduos & Lixo Zero",
  description:
    "O primeiro Reciclômetro Lixo Meta Zero do Brasil. Indicadores transparentes da geração à destinação dos resíduos sólidos urbanos. Conecte sua cidade ao movimento Lixo Zero.",
  keywords: ["lixo zero", "reciclagem", "gestão de resíduos", "Jacarezinho", "Paraná", "sustentabilidade"],
  icons: { icon: IMG.favicon },
  openGraph: {
    title: "Reciclômetro da Cidade",
    description: "O primeiro Reciclômetro Lixo Meta Zero do Brasil.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: IMG.ogSocial, width: 600, height: 315 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
