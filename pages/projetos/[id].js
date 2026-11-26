import { useRouter } from "next/router";
import Link from "next/link";
import Shell from "../../components/Shell";
import store from "../../lib/store";

export default function Projeto({ projeto, tarefas, notas }) {
  const router = useRouter();
  if (router.isFallback) return <Shell title="Projeto"><p>Carregando…</p></Shell>;
  if (!projeto) return <Shell title="Projeto"><p>Projeto não encontrado.</p></Shell>;

  return (
    <Shell title={projeto.nome} subtitle={projeto.orgao} acoes={<Link href="/projetos" className="btn btn-ghost">← Projetos</Link>}>
      <div className="grid" style={{ gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", alignItems: "start" }}>
        <div>
          <div className="card">
            <h2 className="section-title">📋 Detalhes</h2>
            <div className="grid g2" style={{ gap: 12, fontSize: 13 }}>
              <div><strong>Edital:</strong> {projeto.edital || "—"}</div>
              <div><strong>PNCP:</strong> {projeto.pncp || "—"}</div>
              <div><strong>Valor estimado:</strong> R$ {projeto.valor.toLocaleString("pt-BR")}</div>
              <div><strong>Nossa oferta:</strong> {projeto.oferta ? "R$ " + projeto.oferta.toLocaleString("pt-BR") : "—"}</div>
              <div><strong>Prazo proposta:</strong> {projeto.prazo ? new Date(projeto.prazo).toLocaleString("pt-BR") : "—"}</div>
              <div><strong>Início lances:</strong> {projeto.lances ? new Date(projeto.lances).toLocaleString("pt-BR") : "—"}</div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4b5563", marginTop: 16 }}>{projeto.descricao}</p>
            <div className="progress" style={{ marginTop: 16 }}><i style={{ width: projeto.progresso + "%" }} /></div>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="section-title">🔗 Links e arquivos</h2>
            {projeto.site && <div style={{ marginBottom: 10 }}><strong>Site:</strong> <a href={projeto.site} target="_blank" rel="noreferrer" style={{ color: "var(--brand)" }}>{projeto.site} ↗</a></div>}
            {projeto.repo && <div style={{ marginBottom: 10 }}><strong>GitHub:</strong> <a href={projeto.repo} target="_blank" rel="noreferrer" style={{ color: "var(--brand)" }}>{projeto.repo} ↗</a></div>}
            {projeto.proposta && <div><strong>Proposta PDF:</strong> <code style={{ fontSize: 12 }}>{projeto.proposta.split("/").pop()}</code></div>}
            {!projeto.site && !projeto.repo && <p style={{ color: "var(--muted)", fontSize: 13 }}>Nenhum link ainda.</p>}
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="section-title">✅ Tarefas do projeto</h2>
            {tarefas.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>Nenhuma tarefa.</p>}
            {tarefas.map(t => (
              <div className={`task ${t.feito ? "done" : ""}`} key={t.id}>
                <span className="chk">{t.feito ? "✓" : ""}</span>
                <div><div className="t">{t.titulo}</div><div className="d">{t.descricao}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">📝 Notas</h2>
          {notas.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>Nenhuma nota.</p>}
          {notas.map(n => (
            <div className="note" key={n.id}>
              <h4>{n.titulo}</h4>
              <p>{n.texto}</p>
              <div className="who">{n.quem} · {n.quando}</div>
            </div>
          ))}
          <Link href="/notas" style={{ fontSize: 13, color: "var(--brand)", fontWeight: 700 }}>Todas as notas →</Link>
        </div>
      </div>
    </Shell>
  );
}

export function getStaticPaths() {
  return { paths: store.listarProjetos().map(p => ({ params: { id: p.id } })), fallback: true };
}
export function getStaticProps({ params }) {
  return {
    props: {
      projeto: store.projeto(params.id) || null,
      tarefas: store.listarTarefas().filter(t => t.projeto === params.id),
      notas: store.listarNotas().filter(n => n.projeto === params.id),
    },
  };
}
