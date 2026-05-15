import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Recycle, Trash2, Leaf, TrendingUp, Factory, MapPin, Calendar, DollarSign, Cloud, Target, ArrowLeft,
} from "lucide-react";
import { Mascot } from "@/components/mascot";
import { StatCard } from "@/components/stat-card";
import { DiversionGauge } from "@/components/diversion-gauge";
import { MonthlyTrend } from "@/components/monthly-trend";
import { CompositionDonut, CompositionLegend } from "@/components/composition-donut";
import { SectorsBar } from "@/components/sectors-bar";
import { CentersGrid } from "@/components/centers-grid";
import { AnimatedCounter } from "@/components/animated-counter";
import { getCity, listCitySlugs } from "@/lib/cities-source";

type Params = Promise<{ city: string }>;

export async function generateStaticParams() {
  const slugs = await listCitySlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const c = await getCity(city);
  if (!c) return { title: "Cidade não encontrada | Reciclômetro da Cidade" };
  return {
    title: `${c.name} (${c.state}) — Painel | Reciclômetro da Cidade`,
    description: `Dashboard em tempo real dos indicadores de coleta seletiva, desvio de aterro e reciclagem de ${c.name}/${c.state}.`,
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { city } = await params;
  const j = await getCity(city);
  if (!j) notFound();

  const capacityTotal = j.centers.reduce((s, c) => s + c.capacityT, 0);
  const progressToGoal = j.goalJune2026 > 0 ? (j.current.diversionRate / j.goalJune2026) * 100 : 0;

  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        {j.bannerImageUrl && (
          <Image
            src={j.bannerImageUrl}
            alt=""
            width={1758}
            height={1172}
            priority
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:opacity-[0.12] pointer-events-none select-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-10 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]"
            >
              <ArrowLeft size={14} /> voltar à home
            </Link>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
                <MapPin size={12} /> {j.name} · {j.state}
              </span>
              {j.period && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--muted)] text-xs font-semibold">
                  <Calendar size={12} /> {j.period}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Painel do <span className="shimmer-text">Reciclômetro</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
              Indicadores atualizados de coleta seletiva, recuperação de materiais e desvio de aterro sanitário no
              município de {j.name}.
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              <Snapshot label="Taxa de desvio" value={`${j.current.diversionRate}%`} tone="primary" />
              <Snapshot label="Gerados/mês" value={`${j.current.monthlyWasteT} t`} tone="neutral" />
              <Snapshot label="Recuperados" value={`${j.current.recoveredT} t`} tone="accent" />
              <Snapshot label="Centrais" value={`${j.current.sortingCenters}`} tone="primary" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Mascot size={300} percentage={j.current.diversionRate} expression="wave" />
          </div>
        </div>
      </section>

      {/* GAUGE PRINCIPAL + META */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-stretch">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl font-bold">Taxa de desvio de aterro</h2>
              {j.period && (
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  {j.period}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Quanto do resíduo gerado foi <strong>desviado</strong> do aterro sanitário.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
              <DiversionGauge value={j.current.diversionRate} goal={j.goalJune2026} size={280} />
              <div className="flex-1">
                <div className="text-7xl font-extrabold text-[var(--primary)] leading-none tabular-nums">
                  <AnimatedCounter value={j.current.diversionRate} suffix="%" />
                </div>
                {j.goalJune2026 > 0 && (
                  <>
                    <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                      Atual · meta para <strong>junho/2026</strong>:{" "}
                      <strong className="text-[var(--foreground)]">{j.goalJune2026}%</strong>
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
                        style={{ width: `${Math.min(100, progressToGoal)}%` }}
                      />
                    </div>
                    <div className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                      {progressToGoal.toFixed(0)}% do caminho até a meta
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:p-8">
          <h3 className="text-lg font-bold">Resumo do mês</h3>
          {j.period && <p className="text-xs text-[var(--muted-foreground)] mb-5">{j.period}</p>}
          <ul className="space-y-4">
            <Row icon={Trash2} label="Resíduos gerados" value={`${j.current.monthlyWasteT} t`} sub={`${j.current.monthlyWasteT} toneladas / mês`} />
            <Row icon={Leaf} label="Material recuperado" value={`${j.current.recoveredT} t`} sub="reaproveitado" tone="primary" />
            <Row icon={Recycle} label="Para aterro sanitário" value={`${j.current.landfillT} t`} sub="rejeitos destinados" tone="warning" />
            <Row icon={Factory} label="Centrais de triagem" value={`${j.current.sortingCenters}`} sub="em operação" />
          </ul>
        </div>
      </section>

      {/* KPIs ACUMULADOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Acumulado do período</h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Histórico consolidado do programa em {j.name}.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={<Trash2 size={20} />} label="Total de resíduos" value={j.cumulative.totalKg} unit="kg" tone="neutral" index={0} />
          <StatCard icon={<Recycle size={20} />} label="Para aterro" value={j.cumulative.landfillKg} unit="kg" tone="warning" index={1} />
          <StatCard icon={<Leaf size={20} />} label="Reaproveitado" value={j.cumulative.recoveredKg} unit="kg" tone="accent" index={2} />
          <StatCard icon={<TrendingUp size={20} />} label="Desvio acumulado" value={j.cumulative.diversionRate} decimals={1} unit="%" tone="primary" index={3} />
          <StatCard icon={<Cloud size={20} />} label="CO₂ evitado" value={j.cumulative.co2AvoidedKg} unit="kg" tone="accent" description="redução estimada" index={4} />
          <StatCard icon={<DollarSign size={20} />} label="Economia" value={j.cumulative.savingsBRL} prefix="R$ " tone="primary" description="custo de aterro evitado" index={5} />
        </div>
      </section>

      {/* CHARTS */}
      {(j.monthly.length > 0 || j.composition.length > 0 || j.sectors.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-6">
          {j.monthly.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:col-span-2">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Tendência mensal</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Toneladas recuperadas vs. destinadas ao aterro · taxa de desvio
                  </p>
                </div>
              </div>
              <MonthlyTrend data={j.monthly} />
            </div>
          )}

          {j.composition.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-xl font-bold">Composição gravimétrica</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Proporção dos materiais nos resíduos sólidos urbanos
              </p>
              <div className="grid sm:grid-cols-[1fr_180px] gap-4 items-center">
                <CompositionDonut data={j.composition} />
                <CompositionLegend data={j.composition} />
              </div>
            </div>
          )}

          {j.sectors.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-xl font-bold">Coleta por setor</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Proporção (%) de resíduos coletados seletivamente
              </p>
              <SectorsBar data={j.sectors} />
            </div>
          )}
        </section>
      )}

      {/* MAPA COLETA */}
      {j.mapImageUrl && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 lg:p-8">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold">Mapa da coleta seletiva</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Bairros atendidos pela coleta seletiva em {j.name}
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                <MapPin size={12} className="inline -mt-0.5 mr-1" /> {j.sectors.length} setores
              </span>
            </div>
            <Image
              src={j.mapImageUrl}
              alt={`Mapa da coleta seletiva em ${j.name}`}
              width={657}
              height={371}
              className="w-full h-auto rounded-lg border border-[var(--border)]"
            />
          </div>
        </section>
      )}

      {/* CENTRAIS */}
      {j.centers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Centrais de triagem</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                {j.current.sortingCenters} unidades operacionais no município
              </p>
            </div>
            <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
              Capacidade total:{" "}
              <strong className="text-[var(--foreground)]">{capacityTotal} t/mês</strong>
            </div>
          </div>
          <CentersGrid data={j.centers} />
        </section>
      )}

      {/* META + CTA */}
      {j.goalJune2026 > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="rounded-3xl bg-gradient-to-br from-[#1F2C5C] to-[#15803d] p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 opacity-25">
              <Mascot size={260} percentage={j.goalJune2026} expression="cheer" floating={false} showLabel={false} />
            </div>
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
                <Target size={14} /> Meta · junho de 2026
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                Chegar a <span className="text-[#a3e635]">{j.goalJune2026}%</span> de desvio de aterro
              </h2>
              <p className="mt-4 text-white/90 leading-relaxed">
                Mais coleta seletiva, mais educação ambiental, mais centrais de triagem ativas. Cada quilo recuperado
                reduz CO₂, gera renda para catadores e economia para o município.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
                <Mini label="CO₂ evitado / mês" value={`${Math.round(j.current.recoveredT * 3.4)} t`} />
                <Mini
                  label="Renda gerada / mês"
                  value={`R$ ${Math.round(j.current.recoveredT * 580).toLocaleString("pt-BR")}`}
                />
                <Mini label="Catadores na rede" value={`${j.current.sortingCenters * 12}`} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Snapshot({ label, value, tone }: { label: string; value: string; tone: "primary" | "accent" | "neutral" }) {
  const toneMap = {
    primary: "bg-[var(--primary)]/10 text-[var(--primary)]",
    accent: "bg-[var(--accent)]/15 text-[#4d7c0f] dark:text-[var(--accent)]",
    neutral: "bg-[var(--muted)] text-[var(--foreground)]",
  };
  return (
    <div className={`rounded-xl px-3 py-2.5 ${toneMap[tone]}`}>
      <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</div>
      <div className="text-xl font-extrabold tabular-nums">{value}</div>
    </div>
  );
}

function Row({
  icon: Icon, label, value, sub, tone = "neutral",
}: {
  icon: typeof Trash2; label: string; value: string; sub: string; tone?: "primary" | "warning" | "neutral";
}) {
  const colors = {
    primary: "bg-[var(--primary)] text-white",
    warning: "bg-[var(--warning)] text-white",
    neutral: "bg-[var(--muted)] text-[var(--foreground)]",
  };
  return (
    <li className="flex items-center gap-3">
      <span className={`grid place-items-center w-10 h-10 rounded-lg shrink-0 ${colors[tone]}`}>
        <Icon size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-[var(--muted-foreground)]">{label}</div>
        <div className="text-xs text-[var(--muted-foreground)]/70">{sub}</div>
      </div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
    </li>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur p-3 border border-white/15">
      <div className="text-[10px] uppercase tracking-wider text-white/70">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}
