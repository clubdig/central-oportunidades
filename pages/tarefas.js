import { useState } from "react";
import Shell from "../components/Shell";
import store from "../lib/store";

const PRIO = { critica: "b-danger", alta: "b-warn", media: "b-info", baixa: "b-gray" };
const NOME_PROJ = { mogi: "SEMAE Mogi", maracana: "Maracanaú", riopreto: "Rio das Pedras", enap: "ENAP", monitor: "Monitor", modelo: "Modelo" };

export default function Tarefas({ iniciais }) {
  const [tarefas, setTarefas] = useState(iniciais);
  const [filtro, setFiltro] = useState("abertas");

  function alternar(id) {
    fetch("/api/tarefas", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      .then(r => r.json())
      .then(() => setTarefas(ts => ts.map(t => t.id === id ? { ...t, feito: !t.feito } : t)));
  }

  const visiveis = tarefas.filter(t => filtro === "todas" ? true : filtro === "abertas" ? !t.feito : t.feito);

  return (
    <Shell title="Tarefas" subtitle="Marque conforme você executa — eu acompanho">
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["abertas", "Abertas"], ["feitas", "Concluídas"], ["todas", "Todas"]].map(([k, l]) => (
          <button key={k} className={`btn ${filtro === k ? "" : "btn-ghost"}`} onClick={() => setFiltro(k)}>{l}</button>
        ))}
      </div>
      <div className="card">
        {visiveis.length === 0 && <p style={{ color: "var(--muted)" }}>Nenhuma tarefa neste filtro.</p>}
        {visiveis.map(t => (
          <div className={`task ${t.feito ? "done" : ""}`} key={t.id}>
            <div className="chk" onClick={() => alternar(t.id)} role="checkbox" aria-checked={t.feito} tabIndex={0} onKeyDown={e => (e.key === "Enter" || e.key === " ") && alternar(t.id)}>{t.feito ? "✓" : ""}</div>
            <div style={{ flex: 1 }}>
              <div className="t">{t.titulo}</div>
              <div className="d">{t.descricao}</div>
              <div style={{ marginTop: 7, display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className={`badge ${PRIO[t.prioridade]}`}>{t.prioridade}</span>
                <span className="badge b-gray">{NOME_PROJ[t.projeto] || t.projeto}</span>
                <span className="badge b-info">{t.responsavel}</span>
                {t.prazo && <span className="badge b-warn">até {new Date(t.prazo).toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" })}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function getStaticProps() { return { props: { iniciais: store.listarTarefas() } }; }
