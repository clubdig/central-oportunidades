// Armazenamento em memória — Central de Oportunidades (Guilherme + assistente)

const projetos = [
  {
    id: "mogi", nome: "SEMAE Mogi das Cruzes", orgao: "Prefeitura de Mogi das Cruzes/SP",
    edital: "Dispensa 051/2026", pncp: "52561214000130-1-000247/2026",
    valor: 64420.08, oferta: 49000, status: "proposta_pronta", cor: "#4f46e5",
    prazo: "2026-11-26T08:00:00", lances: "2026-11-26T08:30:00",
    site: "https://semae-mogi-site.vercel.app", repo: "https://github.com/clubdig/semae-mogi-site",
    proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-mogi-completa.pdf",
    descricao: "Redesign + CMS + 60 anos + suporte 16h/mês. Sistema já programado e no ar.",
    progresso: 75,
  },
  {
    id: "maracana", nome: "Maracanaú/CE — WhatsApp", orgao: "Prefeitura de Maracanaú/CE",
    edital: "Dispensa 160105/26-DL", pncp: "07605850000162-1-000288/2026",
    valor: 10250, oferta: 10250, status: "aguardando", cor: "#0284c7",
    prazo: "2026-11-26T08:00:00",
    site: "https://whatsapp-pro-4s3i.vercel.app", repo: "https://github.com/clubdig/whatsapp-pro",
    proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-maracana-completa.pdf",
    descricao: "Lote suspenso no BLL — e-mail enviado à Agente aguardando retorno.",
    progresso: 60,
  },
  {
    id: "riopreto", nome: "Câmara Rio das Pedras/SP", orgao: "Câmara Municipal de Rio das Pedras",
    edital: "Dispensa — Lote 1 votação", pncp: "03219351000186/2026/8",
    valor: 19900, oferta: 18000, status: "analisando", cor: "#d97706",
    prazo: "2026-11-26T08:59:00",
    site: "", repo: "", proposta: "",
    descricao: "Sistema de votação de sessões plenárias. POC com 18 requisitos. Decisão até hoje 08:59.",
    progresso: 20,
  },
  {
    id: "enap", nome: "ENAP — OJS", orgao: "Escola Nacional de Administração Pública",
    edital: "Aviso 08/2026", pncp: "00627612000109/2026/216",
    valor: 5444.4, oferta: 5000, status: "analisando", cor: "#7c3aed",
    prazo: "2026-11-26T10:00:00",
    site: "", repo: "", proposta: "",
    descricao: "Hospedagem + migração OJS 24 meses. Ticket baixo, concorrência pequena.",
    progresso: 15,
  },
  {
    id: "monitor", nome: "Monitor PNCP + Telegram", orgao: "Interno",
    edital: "Automação", pncp: "", valor: 0, oferta: 0, status: "pendente", cor: "#059669",
    prazo: null, site: "", repo: "", proposta: "",
    descricao: "Monitor com filtro de alta aderência pronto. Falta configurar bot Telegram (token).",
    progresso: 80,
  },
];

const tarefas = [
  { id: 1, projeto: "mogi", titulo: "Credenciar na BBMNET", descricao: "Custo a cargo do licitante. Fazer PRIMEIRO — pode demorar.", prioridade: "critica", prazo: "2026-11-26T08:00:00", feito: false, responsavel: "você" },
  { id: 2, projeto: "mogi", titulo: "Pedir atestado ao cliente", descricao: "PDF assinado, 1 ano de serviço similar, com CNPJ do cliente.", prioridade: "critica", prazo: "2026-11-26T08:00:00", feito: false, responsavel: "você" },
  { id: 3, projeto: "mogi", titulo: "Emitir certidões", descricao: "CCMEI, Cartão CNPJ, RFB/PGFN, FGTS, CNDT, certidão de falência.", prioridade: "critica", prazo: "2026-11-26T07:00:00", feito: false, responsavel: "você" },
  { id: 4, projeto: "mogi", titulo: "Assinar proposta com carimbo CNPJ", descricao: "Assinatura eletrônica + identificação do CNPJ 65.886.976/0001-59.", prioridade: "alta", prazo: "2026-11-26T07:30:00", feito: false, responsavel: "você" },
  { id: 5, projeto: "mogi", titulo: "Enviar proposta no BBMNET", descricao: "R$ 49.000,00. Não deixar para última hora.", prioridade: "critica", prazo: "2026-11-26T08:00:00", feito: false, responsavel: "você" },
  { id: 6, projeto: "mogi", titulo: "Acompanhar lances + proposta final em 1h", descricao: "08:30–14:30. Proposta final em até 1 hora após comando.", prioridade: "critica", prazo: "2026-11-26T14:30:00", feito: false, responsavel: "você" },
  { id: 7, projeto: "monitor", titulo: "Criar bot Telegram e passar token", descricao: "BotFather → /newbot → token. Eu configuro o envio automático.", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 8, projeto: "maracana", titulo: "Aguardar retorno da Agente (lote suspenso)", descricao: "E-mail enviado. Se liberar, enviar proposta no BLL.", prioridade: "media", prazo: "2026-11-26T08:00:00", feito: false, responsavel: "você" },
  { id: 9, projeto: "riopreto", titulo: "Decidir participação do Lote 1", descricao: "Prazo 08:59. POC em 5 dias úteis se ganhar.", prioridade: "alta", prazo: "2026-11-26T08:59:00", feito: false, responsavel: "conjunto" },
  { id: 10, projeto: "mogi", titulo: "Programar sistema no GitHub/Vercel", descricao: "Site + CMS + 60 anos + APIs. Build e deploy OK.", prioridade: "critica", prazo: "2026-11-25T23:00:00", feito: true, responsavel: "assistente" },
  { id: 11, projeto: "mogi", titulo: "Gerar proposta + anexos em PDF", descricao: "proposta-mogi-completa.pdf (9 páginas, R$ 49 mil).", prioridade: "alta", prazo: "2026-11-26T00:30:00", feito: true, responsavel: "assistente" },
  { id: 12, projeto: "maracana", titulo: "Implantar WhatsApp Pro na Vercel", descricao: "Sistema no ar, login e APIs testados.", prioridade: "alta", prazo: "2026-11-24T18:00:00", feito: true, responsavel: "assistente" },
];

const notas = [
  { id: 1, projeto: "mogi", titulo: "Estratégia de preço", texto: "Valor estimado R$ 64.420,08. Oferta R$ 49.000 (24% de desconto). Piso absoluto R$ 40.000; baixar de R$ 100 em R$ 100. O TR não inclui hospedagem (item 9.2) — custo é só mão de obra.", quem: "assistente", quando: "25/11" },
  { id: 2, projeto: "mogi", titulo: "Atenção — proposta final em 1 hora", texto: "Diferente dos outros editais (2h), aqui é 1 hora após o comando. Tenha o dossiê em PDF único pronto.", quem: "assistente", quando: "25/11" },
  { id: 3, projeto: "mogi", titulo: "Correção legal importante", texto: "O limite do art. 75, II não é mais R$ 50 mil: Decreto 12.807/2025 atualizou para R$ 65.492,11. Os R$ 64.420 estão dentro da dispensa.", quem: "assistente", quando: "25/11" },
  { id: 4, projeto: "monitor", titulo: "Padrão das oportunidades", texto: "De 195 oportunidades, quase todas são contratação direta já encerrada ou revenda de software de terceiros. 3 eram viáveis: Mogi, Rio das Pedras e ENAP.", quem: "assistente", quando: "25/11" },
  { id: 5, projeto: "modelo", titulo: "Modelo de negócio definido", texto: "Você encontra o edital, eu programo (Vercel + GitHub), você vende e dá suporte + aulas de uso. Foco em criação de sistemas web em geral.", quem: "conjunto", quando: "25/11" },
];

const atividades = [
  { id: 1, quando: "26/11 00:00", quem: "assistente", texto: "Gerou proposta-mogi-completa.pdf (9 pág.) e anexo-prints-semae-mogi.pdf" },
  { id: 2, quando: "25/11 23:50", quem: "assistente", texto: "Deploy do site SEMAE na Vercel concluído — 22 rotas, login testado" },
  { id: 3, quando: "25/11 23:30", quem: "assistente", texto: "Programou site institucional + CMS do SEMAE (GitHub + Vercel)" },
  { id: 4, quando: "25/11 22:00", quem: "assistente", texto: "Analisou 5 oportunidades de criação de sistema; Mogi eleita prioridade 1" },
  { id: 5, quando: "25/11 20:00", quem: "assistente", texto: "Criou scripts de busca e filtro de oportunidades no monitor PNCP" },
  { id: 6, quando: "25/11 18:00", quem: "conjunto", texto: "Definido o modelo de negócio: você vende + eu programo" },
  { id: 7, quando: "24/11 16:00", quem: "assistente", texto: "Corrigiu e publicou WhatsApp Pro (login, APIs, CSS) na Vercel" },
];

let nextId = { tarefa: 13, nota: 6, atividade: 8 };
const agora = () => new Date().toISOString();

module.exports = {
  listarProjetos: () => projetos,
  projeto: id => projetos.find(p => p.id === id),
  listarTarefas: () => tarefas.slice().sort((a,b) => {
    const ord = { critica:0, alta:1, media:2, baixa:3 };
    if (a.feito !== b.feito) return a.feito ? 1 : -1;
    return (ord[a.prioridade]||9) - (ord[b.prioridade]||9);
  }),
  alternarTarefa: id => { const t = tarefas.find(x => x.id === Number(id)); if (!t) return null; t.feito = !t.feito; return t; },
  criarTarefa: d => { const t = { ...d, id: nextId.tarefa++, feito: false }; tarefas.push(t); return t; },
  listarNotas: () => notas.slice().reverse(),
  criarNota: d => { const n = { ...d, id: nextId.nota++, quando: new Date().toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit" }) }; notas.push(n); return n; },
  listarAtividades: () => atividades.slice().reverse(),
  registrarAtividade: texto => { const a = { id: nextId.atividade++, quando: new Date().toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" }), quem: "você", texto }; atividades.push(a); return a; },
  resumo: () => ({
    projetos: projetos.length,
    ativos: projetos.filter(p => p.status !== "concluido").length,
    tarefasAbertas: tarefas.filter(t => !t.feito).length,
    criticas: tarefas.filter(t => !t.feito && t.prioridade === "critica").length,
    feitas: tarefas.filter(t => t.feito).length,
    valorTotal: projetos.reduce((s,p) => s + (p.valor||0), 0),
  }),
};
