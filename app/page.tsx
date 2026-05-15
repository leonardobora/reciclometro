import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Recycle, Trash2, Leaf, TrendingUp, Globe2, Sparkles } from "lucide-react";
import { Mascot } from "@/components/mascot";
import { StatCard } from "@/components/stat-card";
import { CitiesGrid } from "@/components/cities-grid";
import { NETWORK } from "@/lib/data";
import { listCities, listCitySlugs } from "@/lib/cities-source";
import { IMG } from "@/lib/images";

export default async function Home() {
  const [cities, slugs] = await Promise.all([listCities(), listCitySlugs()]);
  const featured = cities[0];
  const totalCities = NETWORK.cities.PR.length + NETWORK.cities.SP.length;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16 lg:pt-16 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)] text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} /> O primeiro Lixo Meta Zero do Brasil
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="shimmer-text">O progresso</span>
              <br />
              da nossa cidade,
              <br />
              em tempo real.
            </h1>
            <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              O <strong className="text-[var(--foreground)]">Reciclômetro da Cidade</strong> mede, comunica e
              acelera o Plano Municipal de Gestão Integrada de Resíduos Sólidos — da geração à destinação
              ambientalmente adequada.
            </p>
            <blockquote className="mt-6 border-l-4 border-[var(--primary)] pl-4 italic text-[var(--muted-foreground)]">
              &quot;Não se gerencia o que não se mede.&quot;
              <span className="block text-sm not-italic mt-1 text-[var(--muted-foreground)]/80">
                — William Deming (1900–1993)
              </span>
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/jacarezinho"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-sm hover:opacity-90 transition"
              >
                Ver dashboard de Jacarezinho <ArrowRight size={16} />
              </Link>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] font-semibold hover:bg-[var(--muted)] transition"
              >
                Conheça o movimento
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Municípios</dt>
                <dd className="mt-1 text-2xl font-bold">{totalCities}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Estados</dt>
                <dd className="mt-1 text-2xl font-bold">2</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Movimento</dt>
                <dd className="mt-1 text-2xl font-bold">Lixo&nbsp;Zero</dd>
              </div>
            </dl>
          </div>

          <div className="relative flex justify-center items-center">
            <Image
              src={IMG.planetaTerra}
              alt=""
              width={2000}
              height={1636}
              priority
              className="absolute inset-0 m-auto w-[90%] max-w-[480px] opacity-[0.12] dark:opacity-[0.18] blur-[1px] pointer-events-none select-none"
            />
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
              }}
            />
            <div className="relative">
              <Mascot size={340} percentage={90} expression="wave" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS GLOBAIS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Resultados acumulados</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Indicadores consolidados das cidades pioneiras da rede.
            </p>
          </div>
          <Link
            href="/jacarezinho"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            Detalhes por cidade <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Trash2 size={20} />}
            label="Total de resíduos"
            value={featured?.cumulative.totalKg ?? 0}
            unit="kg"
            tone="neutral"
            description="Coletados no período"
            index={0}
          />
          <StatCard
            icon={<Recycle size={20} />}
            label="Para aterro sanitário"
            value={featured?.cumulative.landfillKg ?? 0}
            unit="kg"
            tone="warning"
            description="Rejeitos destinados"
            index={1}
          />
          <StatCard
            icon={<Leaf size={20} />}
            label="Reaproveitado"
            value={featured?.cumulative.recoveredKg ?? 0}
            unit="kg"
            tone="accent"
            description="Desviado do aterro"
            index={2}
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Desvio de aterro"
            value={featured?.cumulative.diversionRate ?? 0}
            decimals={1}
            unit="%"
            tone="primary"
            description="Acumulado"
            index={3}
          />
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                <Globe2 size={14} /> Movimento Global
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                Lixo Zero não é uma meta. <br />É uma nova forma de pensar.
              </h2>
              <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
                Lixo Zero é um movimento internacional que propõe reduzir ao máximo a geração de resíduos e garantir
                que tudo que for descartado seja reaproveitado. Defende que &quot;lixo&quot; não existe — o que existe
                são <em>resíduos mal geridos</em>.
              </p>
              <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                <strong className="text-[var(--foreground)]">Menos resíduos no aterro</strong>, mais meio ambiente
                preservado, mais renda, dignidade e reconhecimento.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Educa</span>
                <span className="px-3 py-1.5 rounded-full bg-[var(--accent)]/15 text-[#4d7c0f] dark:text-[var(--accent)]">Sensibiliza</span>
                <span className="px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">Engaja</span>
                <span className="px-3 py-1.5 rounded-full bg-[var(--accent)]/15 text-[#4d7c0f] dark:text-[var(--accent)]">Transforma</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Pillar
                title="ILZB"
                subtitle="Instituto Lixo Zero Brasil"
                body="Fundado em 2010, representa no Brasil a Zero Waste International Alliance e mobiliza pessoas, empresas e governos."
              />
              <Pillar
                title="Paraná Lixo Zero"
                subtitle="Rede estadual"
                body="Conecta coletivos, organizações e municípios em torno de políticas públicas sustentáveis."
              />
              <Pillar
                title="Semana Lixo Zero"
                subtitle="Outubro · todos os anos"
                body="Maior movimento de mobilização do país em torno da sustentabilidade, com milhares de eventos."
              />
              <Pillar
                title="Reciclômetro"
                subtitle="Ferramenta de gestão"
                body="Mede e dá transparência ao Plano Municipal de Gestão Integrada de Resíduos Sólidos."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CIDADES */}
      <section id="cidades" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Cidades pioneiras</h2>
            <p className="text-[var(--muted-foreground)] mt-2">
              Os primeiros municípios a usarem o Reciclômetro da Cidade. Clique em uma cidade para ver seu painel.
            </p>
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-sm">
              <Image
                src={IMG.networkMap}
                alt="Mapa da rede Reciclômetro nos estados do Paraná e São Paulo"
                width={1062}
                height={935}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <div>
            <CitiesGrid availableSlugs={slugs} />
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[#1F2C5C] p-8 lg:p-10">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635]">
              Parceiros institucionais
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white">Movimento Lixo Zero no Brasil</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 items-center">
            <PartnerLogo src={IMG.partnerILZB} alt="Instituto Lixo Zero Brasil" />
            <PartnerLogo src={IMG.partnerPRLixoZero} alt="Paraná Lixo Zero" />
            <PartnerLogo src={IMG.partnerSemanaLixoZero} alt="Semana Lixo Zero" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[#0e5a2a] p-10 lg:p-16 text-[var(--primary-foreground)] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-30">
            <Mascot size={240} percentage={50} expression="cheer" floating={false} showLabel={false} />
          </div>
          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Cada escolha consciente move a cidade e transforma o futuro.
            </h2>
            <p className="mt-4 text-white/90 leading-relaxed">
              Quer trazer o Reciclômetro para sua cidade? Fale com a gente e meça o impacto da sua gestão de
              resíduos com transparência.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${NETWORK.contact.email}`}
                className="px-5 py-3 rounded-xl bg-white text-[var(--primary)] font-semibold hover:bg-white/90 transition"
              >
                Entrar em contato
              </a>
              <a
                href={`tel:+554391072050`}
                className="px-5 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                {NETWORK.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center h-20 px-4">
      <Image src={src} alt={alt} width={400} height={200} className="max-h-16 w-auto object-contain" />
    </div>
  );
}

function Pillar({ title, subtitle, body }: { title: string; subtitle: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">{subtitle}</div>
      <div className="text-lg font-bold mt-1">{title}</div>
      <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
