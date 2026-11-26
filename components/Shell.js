import Link from "next/link";
import { useRouter } from "next/router";

const NAV = [
  { href: "/", label: "📊 Visão geral", exact: true },
  { href: "/radar", label: "📡 Radar PNCP" },
  { href: "/projetos", label: "📁 Projetos" },
  { href: "/tarefas", label: "✅ Tarefas" },
  { href: "/prazos", label: "⏰ Prazos" },
  { href: "/notas", label: "📝 Notas" },
  { href: "/atividades", label: "🔄 Atividades" },
];

export default function Shell({ title, subtitle, acoes, children }) {
  const router = useRouter();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark" aria-hidden="true">GC</span>
          <span className="logo-txt"><strong>Guilherme + IA</strong><span>Central de Oportunidades</span></span>
        </div>
        <nav aria-label="Menu principal">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className={router.pathname === n.href ? "active" : ""}>{n.label}</Link>
          ))}
        </nav>
        <div className="sec">Projetos ativos</div>
        <nav>
          <Link href="/projetos/mogi">🔵 SEMAE Mogi</Link>
          <Link href="/projetos/maracana">🔵 Maracanaú</Link>
          <Link href="/projetos/riopreto">🟠 Rio das Pedras</Link>
          <Link href="/projetos/enap">🟣 ENAP</Link>
        </nav>
        <div className="foot">
          Trabalho conjunto.<br />
          Você vende e dá suporte.<br />
          Eu programo. 🤝
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div><h1>{title}</h1>{subtitle && <p className="sub">{subtitle}</p>}</div>
          <div>{acoes}</div>
        </div>
        <div className="page">{children}</div>
      </main>
    </div>
  );
}
