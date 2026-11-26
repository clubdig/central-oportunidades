// Módulo de leitura diária do PNCP — filtrado por alta aderência ao produto
const BASE = "https://pncp.gov.br/api/consulta/v1";

const ALTA = [
  "whatsapp", "chatbot", "mensageria", "disparo de mensagens", "disparos de mensagens",
  "sms", "saas", "software como serviço", "plataforma web", "sistema web",
  "painel de gestão", "ouvidoria", "e-sic", "esic", "gestão documental",
  "gerenciador de conteúdo", "desenvolvimento de sistema", "desenvolvimento de software",
  "desenvolvimento web", "criação de sistema", "informatização", "modernização",
  "implantação de sistema", "migração de dados", "aplicativo web", "redesign",
  "site institucional", "automação", "api", "integração de sistemas"
];
const RUIDO = [
  "medicamento", "passagem aérea", "hospedagem para", "casa de apoio", "pousada", "hotel",
  "tinta", "ar condicionado", "câmera", "porta", "cadeira", "mesa", "combustível", "gás gpl",
  "parquinho", "brinquedo", "óleo", "lubrificante", "bateria", "extintor", "uniforme",
  "camiseta", "calçado", "óculos", "gêneros alimentícios", "café", "toldo", "tenda", "som",
  "iluminação", "fogos", "natal", "sonorização", "evento", "show", "palestra", "viagem",
  "diária", "refeição", "construção", "obra", "reforma", "engenharia", "pintura", "elétrica",
  "hidráulica", "água", "esgoto", "energia solar", "gerador", "poço", "drenagem", "bomba",
  "impressora", "notebook", "tablet", "telefonia", "laboratório", "exame", "cirurgia",
  "consultas", "vacina", "sangue", "leito", "ambulância", "veículo", "carro", "ônibus",
  "sonda", "vesical", "cateter", "seringa", "agulha", "curativo", "tampa para", "frasco",
  "gaze", "esparadrapo", "luva", "máscara", " descartável",
  "máquina", "equipamento médico", "mobiliário", "armário", "prateleira", "ventilador"
];

async function api(endpoint, params) {
  const url = new URL(BASE + endpoint);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  for (let tent = 0; tent < 5; tent++) {
    try {
      const r = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 Monitor-PNCP", accept: "application/json" },
        signal: AbortSignal.timeout(35000),
      });
      if (r.status === 429) { await new Promise(res => setTimeout(res, 5000)); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      if (tent === 4) throw e;
      await new Promise(res => setTimeout(res, 2000 * (tent + 1)));
    }
  }
}

const analyze = (item) => {
  const t = (item.objetoCompra || "").toLowerCase();
  const aderente = ALTA.some(k => t.includes(k));
  const ruido = RUIDO.some(k => t.includes(k));
  return aderente && !ruido;
};

export async function buscarRadar(dias = 2, paginasMax = 8) {
  const hoje = new Date();
  const fmt = d => d.toISOString().slice(0, 10).replace(/-/g, "");
  const inicio = new Date(hoje.getTime() - dias * 864e5);
  const resultados = [];

  for (let p = 1; p <= paginasMax; p++) {
    try {
      const j = await api("/contratacoes/publicacao", {
        dataInicial: fmt(inicio),
        dataFinal: fmt(hoje),
        codigoModalidadeContratacao: 8,
        pagina: p,
        tamanhoPagina: 50,
      });
      for (const i of (j.data || [])) {
        if (!analyze(i)) continue;
        const enc = i.dataEncerramentoProposta ? new Date(i.dataEncerramentoProposta) : null;
        const homologado = Number(i.valorTotalHomologado || 0);
        if (homologado > 0) continue;
        resultados.push({
          orgao: i.orgaoEntidade?.razaoSocial || "?",
          obj: (i.objetoCompra || "").replace(/\s+/g, " ").slice(0, 220),
          valor: Number(i.valorTotalEstimado || 0),
          ate: enc ? enc.toISOString().slice(0, 10) : null,
          uf: i.unidadeOrgao?.ufSigla || "",
          municipio: i.unidadeOrgao?.municipioNome || "",
          disputa: i.modoDisputaNome || "",
          link: `https://pncp.gov.br/app/editais/${i.orgaoEntidade?.cnpj || ""}/${i.anoCompra || ""}/${i.sequencialCompra || ""}`,
        });
      }
      if (p >= (j.totalPaginas || 1)) break;
    } catch (e) {
      break;
    }
  }
  const uniq = [...new Map(resultados.map(x => [x.link, x])).values()];
  uniq.sort((a, b) => (a.ate || "9").localeCompare(b.ate || "9"));
  return uniq;
}
