import Link from "next/link";
import Shell from "../components/Shell";
import store from "../lib/store";

const STATUS = {
  proposta_pronta: ["b-brand", "Proposta pronta"],
  aguardando: ["b-info", "Aguardando retorno"],
  analisando: ["b-warn", "Analisando"],
  pendente: ["b-gray", "Pendente"],
  concluido: ["b-ok", "Concluído"],
};
const PRIO = { critica: "b-danger", alta: "b-warn", media: "b-info", baixa: "b-gray" };

export default function Dashboard({ resumo, projetos, tarefas, atividades }) {
  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  return (
    <Shell title="Visão geral" subtitle={hoje} acoes={<Link href="/tarefas" className="btn">+ Nova tarefa</Link>}>
      <div className="alert alert-warn">
        ⏰ <strong>Prazo crítico hoje:</strong> proposta SEMAE Mogi até 08:00 · Rio das Pedras até 08:59 · ENAP até 10:00. Foque na Mogi (R$ 49.000).
      </div>

      <div className="grid g4">
        {[
          ["📁", "Projetos ativos", resumo.ativos, `${resumo.projetos} no total`, "var(--brand-light)", "var(--brand)"],
          ["✅", "Tarefas abertas", resumo.tarefasAbertas, `${resumo.feitas} concluídas`, "#dcfce7", "var(--ok)"],
          ["🚨", "Críticas", resumo.criticas, "exigem atenção hoje", "#fee2e2", "var(--danger)"],
          ["💰", "Valor em jogo", "R$ " + (resumo.valorTotal/1000).toFixed(1) + "k", "soma dos editais", "#e0f2fe", "var(--info)"],
        ].map(([ico, label, num, foot, bg, cor], i) => (
          <div className="card stat" key={i}>
            <div><div className="label">{label}</div><div className="num" style={{ color: cor }}>{num}</div><div className="foot">{foot}</div></div>
            <div className="ico" style={{ background: bg }}>{ico}</div>
          </div>
        ))}
      </div>

      <div className="grid g2" style={{ marginTop: 20 }}>
        <div className="card">
          <h2 className="section-title">📁 Projetos</h2>
          {projetos.map(p => {
            const [cls, txt] = STATUS[p.status] || STATUS.pendente;
            return (
              <Link href={`/projetos/${p.id}`} key={p.id} style={{ display: "block", padding: "13px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.nome}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{p.orgao}</div>
                  </div>
                  <span className={`badge ${cls}`}>{txt}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                  Edital: {p.edital} · Estimado R$ {p.valor.toLocaleString("pt-BR")}{p.oferta ? ` · Oferta R$ ${p.oferta.toLocaleString("pt-BR")}` : ""}
                </div>
                <div className="progress" style={{ marginTop: 8 }}><i style={{ width: p.progresso + "%" }} /></div>
              </Link>
            );
          })}
        </div>

        <div>
          <div className="card">
            <h2 className="section-title">✅ Próximas tarefas</h2>
            {tarefas.filter(t => !t.feito).slice(0, 6).map(t => (
              <div className="task" key={t.id}>
                <span className="chk" style={{ cursor: "default" }} />
                <div>
                  <div className="t">{t.titulo}</div>
                  <div className="d">{t.descricao}</div>
                  <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span className={`badge ${PRIO[t.prioridade]}`}>{t.prioridade}</span>
                    <span className="badge b-gray">{t.responsavel}</span>
                    {t.prazo && <span className="badge b-warn">até {new Date(t.prazo).toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" })}</span>}
                  </div>
                </div>
              </div>
            ))}
            <Link href="/tarefas" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "var(--brand)", fontWeight: 700 }}>Ver todas →</Link>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="section-title">🔄 Últimas atividades</h2>
            {atividades.slice(0, 5).map(a => (
              <div key={a.id} style={{ padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span className={`badge ${a.quem === "você" ? "b-ok" : a.quem === "conjunto" ? "b-info" : "b-brand"}`} style={{ marginRight: 8 }}>{a.quem}</span>
                <span style={{ color: "var(--muted)", fontSize: 11 }}>{a.quando}</span>
                <div style={{ marginTop: 4, lineHeight: 1.5 }}>{a.texto}</div>
              </div>
            ))}
            <Link href="/atividades" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "var(--brand)", fontWeight: 700 }}>Ver todas →</Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function getStaticProps() {
  return { props: { resumo: store.resumo(), projetos: store.listarProjetos(), tarefas: store.listarTarefas(), atividades: store.listarAtividades() } };
}
