import Link from "next/link";
import Shell from "../../components/Shell";
import store from "../../lib/store";

const STATUS = {
  proposta_pronta: ["b-brand", "Proposta pronta"], aguardando: ["b-info", "Aguardando"],
  analisando: ["b-warn", "Analisando"], pendente: ["b-gray", "Pendente"], concluido: ["b-ok", "Concluído"],
};

export default function Projetos({ projetos, resumo }) {
  return (
    <Shell title="Projetos" subtitle="Todos os editais e trabalhos em andamento">
      <div className="grid g2">
        {projetos.map(p => {
          const [cls, txt] = STATUS[p.status] || STATUS.pendente;
          return (
            <div className="card" key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <h2 style={{ fontSize: 17, margin: 0, color: "#1f2937" }}>{p.nome}</h2>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{p.orgao}</div>
                </div>
                <span className={`badge ${cls}`}>{txt}</span>
              </div>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: "14px 0" }}>{p.descricao}</p>
              <div className="grid g2" style={{ gap: 8, fontSize: 12 }}>
                <div><strong>Edital:</strong> {p.edital || "—"}</div>
                <div><strong>Estimado:</strong> R$ {p.valor.toLocaleString("pt-BR")}</div>
                <div><strong>Oferta:</strong> {p.oferta ? "R$ " + p.oferta.toLocaleString("pt-BR") : "—"}</div>
                <div><strong>Prazo:</strong> {p.prazo ? new Date(p.prazo).toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" }) : "—"}</div>
              </div>
              <div className="progress" style={{ marginTop: 14 }}><i style={{ width: p.progresso + "%" }} /></div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5 }}>{p.progresso}% concluído</div>
              <Link href={`/projetos/${p.id}`} className="btn btn-ghost" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>Abrir projeto →</Link>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

export function getStaticProps() {
  return { props: { projetos: store.listarProjetos(), resumo: store.resumo() } };
}
