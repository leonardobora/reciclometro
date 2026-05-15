import Image from "next/image";
import { Mail, Phone, AtSign } from "lucide-react";
import { NETWORK } from "@/lib/data";
import { IMG } from "@/lib/images";

export function Footer() {
  return (
    <footer id="contato" className="mt-24 border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="mb-4">
            <Image src={IMG.logoDark} alt="Reciclômetro da Cidade" width={1301} height={419} className="h-10 w-auto" />
            <div className="text-xs text-[var(--muted-foreground)] mt-2">O primeiro Lixo Meta Zero do Brasil</div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            &quot;Não se gerencia o que não se mede.&quot;
            <br />
            <span className="italic">— William Deming (1900–1993)</span>
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[var(--primary)]" />
              <a href={`mailto:${NETWORK.contact.email}`} className="hover:text-[var(--primary)]">
                {NETWORK.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[var(--primary)]" />
              <a href={`tel:+554391072050`} className="hover:text-[var(--primary)]">
                {NETWORK.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <AtSign size={16} className="text-[var(--primary)]" />
              <a href="https://instagram.com/reciclometrodacidade" className="hover:text-[var(--primary)]">
                {NETWORK.contact.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Rede Lixo Zero</h4>
          <p className="text-sm text-[var(--muted-foreground)]">
            {NETWORK.cities.PR.length} municípios no Paraná e {NETWORK.cities.SP.length} em São Paulo já usam o
            Reciclômetro para medir, comunicar e reduzir resíduos.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted-foreground)]">
        © 2026 Reciclômetro da Cidade — feito com ♻ para o movimento Lixo Zero.
      </div>
    </footer>
  );
}
