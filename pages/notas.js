import { useState } from "react";
import Shell from "../components/Shell";
import store from "../lib/store";

export default function Notas({ iniciais }) {
  const [notas, setNotas] = useState(iniciais);
  const [form, setForm] = useState({ titulo: "", texto: "", projeto: "mogi" });

  async function salvar(e) {
    e.preventDefault();
    const r = await fetch("/api/notas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const n = await r.json();
    setNotas(ns => [n, ...ns]);
    setForm({ titulo: "", texto: "", projeto: "mogi" });
  }

  return (
    <Shell title="Notas" subtitle="Decisões, estratégias e lembretes compartilhados">
      <div className="grid" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", alignItems: "start" }}>
        <div className="card">
          <h2 className="section-title">Nova nota</h2>
          <form onSubmit={salvar}>
            <label className="label">Título</label>
            <input className="input" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
            <label className="label">Projeto</label>
            <select className="select" value={form.projeto} onChange={e => setForm({ ...form, projeto: e.target.value })}>
              <option value="mogi">SEMAE Mogi</option><option value="maracana">Maracanaú</option>
              <option value="riopreto">Rio das Pedras</option><option value="enap">ENAP</option>
              <option value="monitor">Monitor PNCP</option><option value="modelo">Modelo de negócio</option>
            </select>
            <label className="label">Texto</label>
            <textarea className="textarea" value={form.texto} onChange={e => setForm({ ...form, texto: e.target.value })} required />
            <button type="submit" className="btn" style={{ marginTop: 14 }}>Salvar nota</button>
          </form>
        </div>
        <div className="card">
          <h2 className="section-title">Notas registradas ({notas.length})</h2>
          {notas.map(n => (
            <div className="note" key={n.id}>
              <h4>{n.titulo}</h4>
              <p>{n.texto}</p>
              <div className="who">{n.quem} · {n.quando}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function getStaticProps() { return { props: { iniciais: store.listarNotas() } }; }
