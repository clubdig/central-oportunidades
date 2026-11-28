// Armazenamento em memória — Central de Oportunidades (Guilherme + assistente)

const projetos = [
  {
    id: "mogi", nome: "SEMAE Mogi das Cruzes", orgao: "Prefeitura de Mogi das Cruzes/SP",
    edital: "Dispensa 051/2026", pncp: "52561214000130-1-000247/2026",
    valor: 64420.08, oferta: 49000, status: "descartado", cor: "#6b7280",
    prazo: "2026-11-30T08:00:00", lances: "2026-11-30T08:30:00",
    site: "https://semae-mogi-site.vercel.app", repo: "https://github.com/clubdig/semae-mogi-site",
    proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-mogi-completa.pdf",
    descricao: "DESCARTADO em 28/11: usa BBMNET (plataforma paga, R$ 129/processo). Decisão do Guilherme: focar somente em meios GRATUITOS (Compras.gov.br). Sistema e proposta prontos caso mude de ideia.",
    progresso: 75,
  },
  {
    id: "maracana", nome: "Maracanaú/CE — WhatsApp", orgao: "Prefeitura de Maracanaú/CE",
    edital: "Dispensa 160105/26-DL", pncp: "07605850000162-1-000288/2026",
    valor: 10250, oferta: 10250, status: "encerrado", cor: "#6b7280",
    prazo: "2026-11-26T08:00:00",
    site: "https://whatsapp-pro-4s3i.vercel.app", repo: "https://github.com/clubdig/whatsapp-pro",
    proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-maracana-completa.pdf",
    descricao: "Prazo encerrado em 26/11 sem homologação visível. Lote esteve suspenso no BLL. Verificar resultado no sistema.",
    progresso: 60,
  },
  {
    id: "riopreto", nome: "Câmara Rio das Pedras/SP", orgao: "Câmara Municipal de Rio das Pedras",
    edital: "Dispensa — Lote 1 votação", pncp: "03219351000186/2026/8",
    valor: 19900, oferta: 18000, status: "encerrado", cor: "#6b7280",
    prazo: "2026-11-26T08:59:00",
    site: "", repo: "", proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-rio-das-pedras.pdf",
    descricao: "Prazo encerrado em 26/11. Proposta PDF pronta (R$ 18.000) — verificar se foi enviada no Compras.gov.br.",
    progresso: 50,
  },
  {
    id: "enap", nome: "ENAP — OJS", orgao: "Escola Nacional de Administração Pública",
    edital: "Aviso 08/2026", pncp: "00627612000109/2026/216",
    valor: 5444.4, oferta: 5000, status: "encerrado", cor: "#6b7280",
    prazo: "2026-11-26T10:00:00",
    site: "", repo: "", proposta: "C:/Users/SMEINFO_GUILHERME/Documents/proposta-enap-ojs.pdf",
    descricao: "Prazo encerrado em 26/11. Proposta PDF pronta (R$ 5.000) — verificar se foi enviada.",
    progresso: 50,
  },
  {
    id: "sicaf", nome: "SICAF / Compras.gov.br", orgao: "Governo Federal",
    edital: "Cadastro de fornecedor", pncp: "", valor: 0, oferta: 0, status: "concluido", cor: "#059669",
    prazo: null, site: "https://www3.comprasnet.gov.br/sicaf-web/index.jsf", repo: "", proposta: "",
    descricao: "CNPJ 65.886.976/0001-59 credenciado no SICAF — Nível I cadastrado, válido até 25/11/2027. MEI, Micro Empresa, CNAEs 5819-1/00 e 82.19-9/99. Já pode participar de pregão/dispensa eletrônica.",
    progresso: 100,
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
  { id: 17, projeto: "mogi", titulo: "Enviar proposta no BBMNET (novo prazo)", descricao: "R$ 49.000,00. Prazo prorrogado para 30/11 às 08:00. Credenciar na BBMNET se ainda não fez.", prioridade: "critica", prazo: "2026-11-30T08:00:00", feito: false, responsavel: "você" },
  { id: 18, projeto: "mogi", titulo: "Pedir atestado ao cliente", descricao: "PDF assinado, 1 ano de serviço similar, com CNPJ do cliente. Modelo pronto: atestado-capacidade-mogi.pdf.", prioridade: "critica", prazo: "2026-11-29T18:00:00", feito: false, responsavel: "você" },
  { id: 19, projeto: "mogi", titulo: "Emitir certidões", descricao: "CCMEI, Cartão CNPJ, RFB/PGFN, FGTS, CNDT, certidão de falência.", prioridade: "alta", prazo: "2026-11-29T18:00:00", feito: false, responsavel: "você" },
  { id: 20, projeto: "mogi", titulo: "Acompanhar lances em 30/11", descricao: "08:30–14:30. Proposta final em até 1 hora após comando.", prioridade: "critica", prazo: "2026-11-30T14:30:00", feito: false, responsavel: "você" },
  { id: 21, projeto: "maracana", titulo: "Verificar resultado Maracanaú", descricao: "Prazo encerrado em 26/11. Checar no BLL se houve homologação.", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 22, projeto: "riopreto", titulo: "Verificar resultado Rio das Pedras", descricao: "Prazo encerrado em 26/11. Checar no Compras.gov.br se a proposta foi enviada e o resultado.", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 23, projeto: "enap", titulo: "Verificar resultado ENAP", descricao: "Prazo encerrado em 26/11. Checar no Compras.gov.br.", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 7, projeto: "monitor", titulo: "Criar bot Telegram e passar token", descricao: "BotFather → /newbot → token. Eu configuro o envio automático.", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 8, projeto: "maracana", titulo: "Aguardar retorno da Agente (lote suspenso)", descricao: "E-mail enviado. Se liberar, enviar proposta no BLL.", prioridade: "media", prazo: "2026-11-26T08:00:00", feito: false, responsavel: "você" },
  { id: 9, projeto: "riopreto", titulo: "Enviar proposta Lote 1 no Compras.gov.br", descricao: "R$ 18.000,00. Proposta PDF pronta. Prazo 08:59. NÃO cotar Lote 2.", prioridade: "critica", prazo: "2026-11-26T08:59:00", feito: false, responsavel: "você" },
  { id: 13, projeto: "sicaf", titulo: "Validar credenciamento no SICAF", descricao: "CNPJ credenciado, Nível I cadastrado, válido até 25/11/2027. Sessão reativada.", prioridade: "critica", prazo: "2026-11-26T02:00:00", feito: true, responsavel: "conjunto" },
  { id: 14, projeto: "enap", titulo: "Enviar proposta ENAP no Compras.gov.br", descricao: "R$ 5.000,00. Proposta PDF pronta. Prazo 10:00.", prioridade: "alta", prazo: "2026-11-26T10:00:00", feito: false, responsavel: "você" },
  { id: 15, projeto: "sicaf", titulo: "Baixar CCMEI no Portal do Empreendedor", descricao: "gov.br/mei → Emissão de Comprovante (CCMEI). Necessário para habilitação.", prioridade: "alta", prazo: "2026-11-26T07:00:00", feito: false, responsavel: "você" },
  { id: 16, projeto: "sicaf", titulo: "Emitir certidão municipal Bayeux/PB", descricao: "WebISS: bayeuxpb.webiss.com.br (requer cadastro/senha).", prioridade: "media", prazo: null, feito: false, responsavel: "você" },
  { id: 10, projeto: "mogi", titulo: "Programar sistema no GitHub/Vercel", descricao: "Site + CMS + 60 anos + APIs. Build e deploy OK.", prioridade: "critica", prazo: "2026-11-25T23:00:00", feito: true, responsavel: "assistente" },
  { id: 11, projeto: "mogi", titulo: "Gerar proposta + anexos em PDF", descricao: "proposta-mogi-completa.pdf (9 páginas, R$ 49 mil).", prioridade: "alta", prazo: "2026-11-26T00:30:00", feito: true, responsavel: "assistente" },
  { id: 12, projeto: "maracana", titulo: "Implantar WhatsApp Pro na Vercel", descricao: "Sistema no ar, login e APIs testados.", prioridade: "alta", prazo: "2026-11-24T18:00:00", feito: true, responsavel: "assistente" },
];

const notas = [
  { id: 12, projeto: "modelo", titulo: "Estratégia confirmada: SOMENTE gratuitos", texto: "Em 28/11 o Guilherme reafirmou: focar apenas em meios gratuitos (Compras.gov.br/SICAF). MOGI descartada por exigir BBMNET (R$ 129). Busca em 1152 disputas abertas encontrou 0 novas oportunidades aderentes e gratuitas. Radar automático criado: roda todo dia 8h (dias úteis) até 31/12.", quem: "conjunto", quando: "28/11" },
  { id: 13, projeto: "modelo", titulo: "Correção: BBMNET ≠ Portal de Compras Públicas", texto: "O edital da MOGI usa BBMNET (bbmnet.com.br), não portaldecompraspublicas.com.br. Eu estava no site errado. De qualquer forma, BBMNET é pago — descartado conforme decisão de só usar gratuitos.", quem: "assistente", quando: "28/11" },
  { id: 10, projeto: "mogi", titulo: "PRAZO PRORROGADO — 30/11", texto: "Confirmado no PNCP em 27/11: prazo da Dispensa 051/2026 passou de 26/11 para 30/11 às 08:00. Ainda sem vencedor (homologado = null). Temos 3 dias extras para credenciar na BBMNET, obter atestado e enviar R$ 49.000.", quem: "assistente", quando: "27/11" },
  { id: 11, projeto: "modelo", titulo: "Resultados de 26/11", texto: "Maracanaú, Rio das Pedras e ENAP tiveram prazo encerrado em 26/11. Verificar no BLL/Compras.gov.br se houve homologação e se as propostas foram enviadas. A Central agora marca esses projetos como encerrados.", quem: "assistente", quando: "27/11" },
  { id: 6, projeto: "sicaf", titulo: "SICAF validado — cadastro já existia", texto: "CNPJ 65.886.976/0001-59 está Credenciado no SICAF, Nível I Cadastrado, válido até 25/11/2027. O problema era sessão expirada. MEI, Micro Empresa, CNAEs 5819-1/00 e 82.19-9/99. Já pode participar de pregão e dispensa eletrônica.", quem: "conjunto", quando: "26/11" },
  { id: 7, projeto: "modelo", titulo: "Compras.gov.br — acesso manual", texto: "O Compras.gov.br bloqueia browser automatizado (hCaptcha). Envio de propostas deve ser no navegador normal do usuário: gov.br/compras → Acesso ao Sistema → Fornecedor → gov.br (ouro).", quem: "assistente", quando: "26/11" },
  { id: 8, projeto: "riopreto", titulo: "Proposta Rio das Pedras pronta", texto: "Lote 1 por R$ 18.000 (teto R$ 19.900). POC com 18 requisitos — sistema próprio atende todos. Não cotar Lote 2 (tela 85). Prazo 08:59, disputa 09:00-15:00.", quem: "assistente", quando: "26/11" },
  { id: 9, projeto: "enap", titulo: "Proposta ENAP pronta", texto: "R$ 5.000 (teto R$ 5.444,40). OJS é software livre — item 'fabricante' do TR é tecnicamente incoerente. Oferecer 4h de treinamento como aula gravada. Prazo 10:00.", quem: "assistente", quando: "26/11" },
  { id: 1, projeto: "mogi", titulo: "Estratégia de preço", texto: "Valor estimado R$ 64.420,08. Oferta R$ 49.000 (24% de desconto). Piso absoluto R$ 40.000; baixar de R$ 100 em R$ 100. O TR não inclui hospedagem (item 9.2) — custo é só mão de obra.", quem: "assistente", quando: "25/11" },
  { id: 2, projeto: "mogi", titulo: "Atenção — proposta final em 1 hora", texto: "Diferente dos outros editais (2h), aqui é 1 hora após o comando. Tenha o dossiê em PDF único pronto.", quem: "assistente", quando: "25/11" },
  { id: 3, projeto: "mogi", titulo: "Correção legal importante", texto: "O limite do art. 75, II não é mais R$ 50 mil: Decreto 12.807/2025 atualizou para R$ 65.492,11. Os R$ 64.420 estão dentro da dispensa.", quem: "assistente", quando: "25/11" },
  { id: 4, projeto: "monitor", titulo: "Padrão das oportunidades", texto: "De 195 oportunidades, quase todas são contratação direta já encerrada ou revenda de software de terceiros. 3 eram viáveis: Mogi, Rio das Pedras e ENAP.", quem: "assistente", quando: "25/11" },
  { id: 5, projeto: "modelo", titulo: "Modelo de negócio definido", texto: "Você encontra o edital, eu programo (Vercel + GitHub), você vende e dá suporte + aulas de uso. Foco em criação de sistemas web em geral.", quem: "conjunto", quando: "25/11" },
];

const atividades = [
  { id: 11, quando: "28/11", quem: "conjunto", texto: "Estratégia realinhada: somente meios gratuitos. MOGI descartada (BBMNET pago). Radar automático diário às 8h criado" },
  { id: 12, quando: "28/11", quem: "assistente", texto: "Varredura de 1152 disputas abertas: 0 novas oportunidades gratuitas aderentes" },
  { id: 10, quando: "27/11 manhã", quem: "assistente", texto: "Atualização diária: MOGI prazo prorrogado para 30/11; demais editais encerrados em 26/11" },
  { id: 9, quando: "26/11 02:30", quem: "assistente", texto: "Gerou propostas PDF: Rio das Pedras (R$ 18 mil) e ENAP (R$ 5 mil)" },
  { id: 8, quando: "26/11 02:15", quem: "conjunto", texto: "SICAF validado: CNPJ credenciado, Nível I cadastrado até 2027" },
  { id: 7, quando: "26/11 01:00", quem: "assistente", texto: "Integrou Radar PNCP na Central (leitura diária filtrada)" },
  { id: 1, quando: "26/11 00:00", quem: "assistente", texto: "Gerou proposta-mogi-completa.pdf (9 pág.) e anexo-prints-semae-mogi.pdf" },
  { id: 2, quando: "25/11 23:50", quem: "assistente", texto: "Deploy do site SEMAE na Vercel concluído — 22 rotas, login testado" },
  { id: 3, quando: "25/11 23:30", quem: "assistente", texto: "Programou site institucional + CMS do SEMAE (GitHub + Vercel)" },
  { id: 4, quando: "25/11 22:00", quem: "assistente", texto: "Analisou 5 oportunidades de criação de sistema; Mogi eleita prioridade 1" },
  { id: 5, quando: "25/11 20:00", quem: "assistente", texto: "Criou scripts de busca e filtro de oportunidades no monitor PNCP" },
  { id: 6, quando: "25/11 18:00", quem: "conjunto", texto: "Definido o modelo de negócio: você vende + eu programo" },
  { id: 7, quando: "24/11 16:00", quem: "assistente", texto: "Corrigiu e publicou WhatsApp Pro (login, APIs, CSS) na Vercel" },
];

let nextId = { tarefa: 24, nota: 14, atividade: 13 };
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
