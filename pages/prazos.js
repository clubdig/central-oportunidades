import Shell from "../components/Shell";
import store from "../lib/store";

const NOME = { mogi: "SEMAE Mogi", maracana: "Maracanaú", riopreto: "Rio das Pedras", enap: "ENAP", monitor: "Monitor" };

function dias(iso) {
  if (!iso) return null;
  return Math.ceil((new Date(iso) - new Date()) / 864e5);
}

export default function Prazos({ tarefas, projetos }) {
  const itens = [
    ...projetos.filter(p => p.prazo).map(p => ({ id: p.id, titulo: `Proposta — ${p.nome}`, descricao: `${p.edital} · ${p.oferta ? "R$ " + p.oferta.toLocaleString("pt-BR") : "valor a definir"}`, prazo: p.prazo, tipo: "edital" })),
    ...tarefas.filter(t => t.prazo && !t.feito).map(t => ({ id: t.id, titulo: t.titulo, descricao: t.descricao, prazo: t.prazo, tipo: "tarefa" })),
  ].sort((a, b) => (a.prazo || "9").localeCompare(b.prazo || "9"));

  return (
    <Shell title="Prazos" subtitle="Tudo que vence — ordem cronológica">
      <div className="alert alert-warn">⏰ Hoje é 26/11. Os prazos mais urgentes estão no topo. Não perca o da Mogi (08:00).</div>
      <div className="card">
        {itens.map((it, i) => {
          const d = new Date(it.prazo);
          const restante = dias(it.prazo);
          const cls = restante <= 0 ? "b-danger" : restante <= 1 ? "b-warn" : "b-ok";
          return (
            <div className="deadline" key={i}>
              <div className="date"><b>{d.toLocaleDateString("pt-BR", { day: "2-digit" })}</b><span>{d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</span></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{it.titulo}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{it.descricao}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</div>
                <span className={`badge ${cls}`}>{restante <= 0 ? "hoje/vencido" : restante + " dia(s)"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

export function getStaticProps() {
  return { props: { tarefas: store.listarTarefas(), projetos: store.listarProjetos() } };
}
