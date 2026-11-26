import { useEffect, useState } from "react";
import Shell from "../components/Shell";

export default function Radar() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [dias, setDias] = useState(3);

  function carregar(d = dias) {
    setCarregando(true);
    setErro("");
    fetch(`/api/radar?dias=${d}`)
      .then(r => r.json())
      .then(j => { if (j.erro) setErro(j.erro); else setDados(j); setCarregando(false); })
      .catch(e => { setErro(e.message); setCarregando(false); });
  }
  useEffect(() => { carregar(3); }, []);

  return (
    <Shell title="Radar PNCP" subtitle="Leitura diária filtrada pelo seu produto (SaaS, sistema web, WhatsApp, ouvidoria)">
      <div className="alert alert-ok">
        🤖 Este módulo lê o PNCP automaticamente e só mostra o que tem <strong>alta aderência</strong> ao seu negócio. Itens já homologados e ruído (medicamentos, obras, equipamentos) são descartados.
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Período:</span>
        {[1, 2, 3, 5, 7].map(d => (
          <button key={d} className={`btn ${dias === d ? "" : "btn-ghost"}`} onClick={() => { setDias(d); carregar(d); }}>{d} dia{d > 1 ? "s" : ""}</button>
        ))}
        <button className="btn btn-ghost" onClick={() => carregar()} disabled={carregando}>{carregando ? "Lendo…" : "🔄 Atualizar"}</button>
      </div>

      {erro && <div className="alert alert-warn">{erro}</div>}

      {dados && (
        <>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>
            Última leitura: {new Date(dados.quando).toLocaleString("pt-BR")} · <strong>{dados.total}</strong> oportunidade(s) aderente(s) nos últimos {dados.dias} dia(s)
          </div>
          {dados.itens.length === 0 && (
            <div className="card" style={{ color: "var(--muted)" }}>Nenhuma oportunidade aderente no período. Tente ampliar para 5 ou 7 dias.</div>
          )}
          <div className="grid g2">
            {dados.itens.map((it, i) => (
              <div className="card" key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                  <strong style={{ fontSize: 14 }}>{it.orgao}</strong>
                  <span className="badge b-brand">{it.uf}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: "10px 0" }}>{it.obj}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 12 }}>
                  <span className="badge b-info">R$ {it.valor.toLocaleString("pt-BR")}</span>
                  {it.ate && <span className="badge b-warn">até {new Date(it.ate + "T12:00:00").toLocaleDateString("pt-BR")}</span>}
                  {it.disputa && <span className="badge b-gray">{it.disputa}</span>}
                </div>
                <a href={it.link} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>Abrir edital ↗</a>
              </div>
            ))}
          </div>
        </>
      )}
    </Shell>
  );
}
