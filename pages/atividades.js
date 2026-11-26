import Shell from "../components/Shell";
import store from "../lib/store";

export default function Atividades({ atividades }) {
  return (
    <Shell title="Atividades" subtitle="Histórico do que foi feito por você e por mim">
      <div className="card chatlog">
        {atividades.map(a => (
          <div className={`msg ${a.quem === "você" ? "eu" : ""}`} key={a.id}>
            <div className="av">{a.quem === "você" ? "G" : a.quem === "conjunto" ? "🤝" : "IA"}</div>
            <div className="body">
              <div className="who">{a.quem} · {a.quando}</div>
              {a.texto}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function getStaticProps() { return { props: { atividades: store.listarAtividades() } }; }
